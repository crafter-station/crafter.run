import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

import { LinkedInError, linkedInToken, shareOnLinkedIn } from "@/lib/linkedin";

const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

const schema = z.object({
	text: z.string().trim().min(1).max(3000),
	visibility: z.enum(["PUBLIC", "CONNECTIONS"]),
	article: z
		.object({
			url: z
				.url()
				.refine((value) => value.startsWith("https://"), "https only"),
			title: z.string().max(200).optional(),
			description: z.string().max(300).optional(),
		})
		.optional(),
	image: z
		.object({
			// Same-origin paths only, so this route cannot be used to fetch arbitrary URLs.
			path: z.string().regex(/^\/(?!\/)[^\s]*$/),
			title: z.string().max(200).optional(),
			description: z.string().max(300).optional(),
		})
		.optional(),
});

/** Publishes a post the signed-in member wrote and confirmed in the share dialog. */
export async function POST(request: Request) {
	const identity = await auth();
	if (!identity.isAuthenticated || !identity.userId)
		return Response.json({ error: "signed_out" }, { status: 401 });

	const parsed = schema.safeParse(await request.json().catch(() => null));
	if (!parsed.success)
		return Response.json(
			{ error: "invalid", issues: parsed.error.issues },
			{ status: 400 },
		);
	const input = parsed.data;

	const state = await linkedInToken(identity.userId);
	if (state.status !== "ok")
		return Response.json({ error: state.status }, { status: 409 });

	let image:
		| {
				bytes: ArrayBuffer;
				contentType: string;
				title?: string;
				description?: string;
		  }
		| undefined;
	if (input.image) {
		const source = await fetch(new URL(input.image.path, request.url), {
			cache: "no-store",
		});
		const contentType = source.headers.get("content-type") ?? "";
		if (!source.ok || !contentType.startsWith("image/"))
			return Response.json({ error: "image_unavailable" }, { status: 422 });
		const bytes = await source.arrayBuffer();
		if (bytes.byteLength > MAX_IMAGE_BYTES)
			return Response.json({ error: "image_too_large" }, { status: 422 });
		image = {
			bytes,
			contentType,
			title: input.image.title,
			description: input.image.description,
		};
	}

	try {
		const url = await shareOnLinkedIn(state.token, {
			text: input.text,
			visibility: input.visibility,
			article: input.article,
			image,
		});
		return Response.json({ url }, { headers: { "Cache-Control": "no-store" } });
	} catch (error) {
		if (error instanceof LinkedInError && error.status === 401)
			return Response.json({ error: "missing_scope" }, { status: 409 });
		if (error instanceof LinkedInError && error.status === 429)
			return Response.json({ error: "rate_limited" }, { status: 429 });
		console.error("linkedin share failed", error);
		return Response.json({ error: "linkedin_failed" }, { status: 502 });
	}
}
