import "server-only";

import { clerkClient } from "@clerk/nextjs/server";

/** Share on LinkedIn (UGC API). Every post starts from an explicit action by the member; nothing here posts on its own. */

export const LINKEDIN_SHARE_SCOPE = "w_member_social";

const API = "https://api.linkedin.com/v2";
const RESTLI = { "X-Restli-Protocol-Version": "2.0.0" };

export type LinkedInVisibility = "PUBLIC" | "CONNECTIONS";

export type LinkedInShare = {
	text: string;
	visibility: LinkedInVisibility;
	article?: { url: string; title?: string; description?: string };
	image?: {
		bytes: ArrayBuffer;
		contentType: string;
		title?: string;
		description?: string;
	};
};

export type LinkedInTokenState =
	| { status: "ok"; token: string }
	| { status: "not_connected" }
	| { status: "missing_scope" };

export class LinkedInError extends Error {
	constructor(
		message: string,
		readonly status: number,
	) {
		super(message);
	}
}

export async function linkedInToken(
	userId: string,
): Promise<LinkedInTokenState> {
	const client = await clerkClient();
	const { data } = await client.users.getUserOauthAccessToken(
		userId,
		"linkedin_oidc",
	);
	const token = data[0];
	if (!token?.token) return { status: "not_connected" };
	if (token.scopes && !token.scopes.includes(LINKEDIN_SHARE_SCOPE))
		return { status: "missing_scope" };
	return { status: "ok", token: token.token };
}

async function call<T>(
	token: string,
	path: string,
	init: RequestInit = {},
): Promise<{ body: T; headers: Headers }> {
	const response = await fetch(
		path.startsWith("http") ? path : `${API}${path}`,
		{
			...init,
			headers: {
				Authorization: `Bearer ${token}`,
				...RESTLI,
				...(init.headers ?? {}),
			},
			cache: "no-store",
		},
	);
	if (!response.ok) {
		const detail = await response.text().catch(() => "");
		throw new LinkedInError(
			`LinkedIn ${response.status}: ${detail.slice(0, 300)}`,
			response.status,
		);
	}
	const text = await response.text();
	return {
		body: (text ? JSON.parse(text) : {}) as T,
		headers: response.headers,
	};
}

/** The member's Person URN, from the OpenID Connect userinfo endpoint. */
export async function linkedInAuthor(token: string) {
	const { body } = await call<{ sub?: string }>(token, "/userinfo");
	if (!body.sub) throw new LinkedInError("LinkedIn userinfo has no sub", 502);
	return `urn:li:person:${body.sub}`;
}

async function uploadImage(
	token: string,
	author: string,
	image: NonNullable<LinkedInShare["image"]>,
) {
	const { body } = await call<{
		value: {
			asset: string;
			uploadMechanism: {
				"com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest": {
					uploadUrl: string;
				};
			};
		};
	}>(token, "/assets?action=registerUpload", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			registerUploadRequest: {
				recipes: ["urn:li:digitalmediaRecipe:feedshare-image"],
				owner: author,
				serviceRelationships: [
					{
						relationshipType: "OWNER",
						identifier: "urn:li:userGeneratedContent",
					},
				],
			},
		}),
	});
	const uploadUrl =
		body.value.uploadMechanism[
			"com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"
		].uploadUrl;
	const upload = await fetch(uploadUrl, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": image.contentType,
		},
		body: image.bytes,
	});
	if (!upload.ok)
		throw new LinkedInError(`LinkedIn upload ${upload.status}`, upload.status);
	return body.value.asset;
}

/** Publishes the post and returns its public URL. */
export async function shareOnLinkedIn(token: string, share: LinkedInShare) {
	const author = await linkedInAuthor(token);
	let category: "NONE" | "ARTICLE" | "IMAGE" = "NONE";
	let media: unknown[] | undefined;
	if (share.image) {
		const asset = await uploadImage(token, author, share.image);
		category = "IMAGE";
		media = [
			{
				status: "READY",
				media: asset,
				...(share.image.title ? { title: { text: share.image.title } } : {}),
				...(share.image.description
					? { description: { text: share.image.description } }
					: {}),
			},
		];
	} else if (share.article) {
		category = "ARTICLE";
		media = [
			{
				status: "READY",
				originalUrl: share.article.url,
				...(share.article.title
					? { title: { text: share.article.title } }
					: {}),
				...(share.article.description
					? { description: { text: share.article.description } }
					: {}),
			},
		];
	}
	const { headers } = await call(token, "/ugcPosts", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			author,
			lifecycleState: "PUBLISHED",
			specificContent: {
				"com.linkedin.ugc.ShareContent": {
					shareCommentary: { text: share.text },
					shareMediaCategory: category,
					...(media ? { media } : {}),
				},
			},
			visibility: {
				"com.linkedin.ugc.MemberNetworkVisibility": share.visibility,
			},
		}),
	});
	const id = headers.get("x-restli-id");
	return id
		? `https://www.linkedin.com/feed/update/${id}/`
		: "https://www.linkedin.com/feed/";
}
