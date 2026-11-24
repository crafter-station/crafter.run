"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";

import type { Locale } from "@/lib/i18n";
import { linkedInShareCopy } from "@/lib/linkedin-share-copy";

const SCOPE = "w_member_social";
const PENDING = "linkedin-share-pending";
const MAX = 3000;

type Visibility = "PUBLIC" | "CONNECTIONS";

export type LinkedInShareProps = {
	/** Stable id for this share target, used to restore the draft after connecting LinkedIn. */
	id: string;
	locale: Locale;
	text: string;
	article?: { url: string; title?: string; description?: string };
	image?: { path: string; alt: string; title?: string; description?: string };
	className?: string;
	label?: string;
};

type Phase =
	| { kind: "edit" }
	| { kind: "posting" }
	| { kind: "done"; url: string }
	| { kind: "error"; message: string };

export function LinkedInShare({
	id,
	locale,
	text,
	article,
	image,
	className,
	label,
}: LinkedInShareProps) {
	const t = linkedInShareCopy[locale];
	const { isLoaded, isSignedIn, user } = useUser();
	const dialog = useRef<HTMLDialogElement>(null);
	const [draft, setDraft] = useState(text);
	const [visibility, setVisibility] = useState<Visibility>("PUBLIC");
	const [phase, setPhase] = useState<Phase>({ kind: "edit" });

	const account = user?.externalAccounts.find(
		(item) => item.provider === "linkedin_oidc",
	);
	const canPost = Boolean(
		account?.approvedScopes?.split(/[\s,]+/).includes(SCOPE),
	);

	useEffect(() => {
		const saved = sessionStorage.getItem(PENDING);
		if (!saved) return;
		try {
			const pending = JSON.parse(saved) as {
				id: string;
				draft: string;
				visibility: Visibility;
			};
			if (pending.id !== id) return;
			sessionStorage.removeItem(PENDING);
			setDraft(pending.draft);
			setVisibility(pending.visibility);
			dialog.current?.showModal();
		} catch {
			sessionStorage.removeItem(PENDING);
		}
	}, [id]);

	function open() {
		setPhase({ kind: "edit" });
		dialog.current?.showModal();
	}

	async function connect() {
		if (!user) return;
		sessionStorage.setItem(PENDING, JSON.stringify({ id, draft, visibility }));
		const redirectUrl = window.location.href;
		const next = account
			? await account.reauthorize({ additionalScopes: [SCOPE], redirectUrl })
			: await user.createExternalAccount({
					strategy: "oauth_linkedin_oidc",
					additionalScopes: [SCOPE],
					redirectUrl,
				});
		const target = next.verification?.externalVerificationRedirectURL;
		if (target) window.location.href = target.toString();
	}

	async function publish() {
		setPhase({ kind: "posting" });
		const response = await fetch("/api/linkedin/share", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				text: draft,
				visibility,
				article,
				image: image
					? {
							path: image.path,
							title: image.title,
							description: image.description,
						}
					: undefined,
			}),
		}).catch(() => null);
		const body = (await response?.json().catch(() => null)) as {
			url?: string;
			error?: string;
		} | null;
		if (response?.ok && body?.url)
			return setPhase({ kind: "done", url: body.url });
		if (body?.error === "not_connected" || body?.error === "missing_scope")
			return connect();
		const key = body?.error as keyof typeof t.errors | undefined;
		setPhase({
			kind: "error",
			message: (key && t.errors[key]) || t.errors.generic,
		});
	}

	const signInHref = `/${locale}/sign-in?redirect_url=${encodeURIComponent(typeof window === "undefined" ? "" : window.location.href)}`;

	return (
		<>
			<button type="button" className={className} onClick={open}>
				{label ?? t.open}
			</button>
			<dialog
				ref={dialog}
				className="li-share"
				aria-label={t.title}
				onClick={(event) => {
					if (event.target === event.currentTarget) dialog.current?.close();
				}}
				onKeyDown={() => undefined}
			>
				<div className="li-share-card">
					<header className="li-share-head">
						<span className="li-share-mark" aria-hidden="true">
							in
						</span>
						<h2>{t.title}</h2>
						<button
							type="button"
							className="li-share-x"
							onClick={() => dialog.current?.close()}
							aria-label={t.close}
						>
							✕
						</button>
					</header>

					{!isLoaded ? null : !isSignedIn ? (
						<div className="li-share-gate">
							<p>{t.signInHint}</p>
							<a className="li-share-primary" href={signInHref}>
								{t.signIn}
							</a>
						</div>
					) : phase.kind === "done" ? (
						<div className="li-share-gate">
							<p>{t.done}</p>
							<a
								className="li-share-primary"
								href={phase.url}
								target="_blank"
								rel="noopener noreferrer"
							>
								{t.view} ↗
							</a>
						</div>
					) : (
						<>
							<label className="li-share-text">
								<span className="sr-only">{t.title}</span>
								<textarea
									value={draft}
									maxLength={MAX}
									rows={6}
									onChange={(event) => setDraft(event.target.value)}
								/>
								<span className="li-share-count">
									{draft.length} / {MAX}
								</span>
							</label>
							{image ? (
								// biome-ignore lint/performance/noImgElement: images are unoptimized site-wide
								<img
									className="li-share-image"
									src={image.path}
									alt={image.alt}
								/>
							) : article ? (
								<div className="li-share-article">
									<strong>{article.title ?? article.url}</strong>
									<span>{new URL(article.url).host}</span>
								</div>
							) : null}
							<fieldset className="li-share-visibility">
								<legend>{t.visibility}</legend>
								<label>
									<input
										type="radio"
										name={`${id}-visibility`}
										checked={visibility === "PUBLIC"}
										onChange={() => setVisibility("PUBLIC")}
									/>
									{t.public}
								</label>
								<label>
									<input
										type="radio"
										name={`${id}-visibility`}
										checked={visibility === "CONNECTIONS"}
										onChange={() => setVisibility("CONNECTIONS")}
									/>
									{t.connections}
								</label>
							</fieldset>
							<p className="li-share-hint">
								{canPost ? t.hint : t.connectHint}
							</p>
							{phase.kind === "error" ? (
								<p className="li-share-error" role="alert">
									{phase.message}
								</p>
							) : null}
							<footer className="li-share-actions">
								<button
									type="button"
									className="li-share-secondary"
									onClick={() => dialog.current?.close()}
								>
									{t.cancel}
								</button>
								{canPost ? (
									<button
										type="button"
										className="li-share-primary"
										disabled={phase.kind === "posting" || !draft.trim()}
										onClick={publish}
									>
										{phase.kind === "posting" ? t.publishing : t.publish}
									</button>
								) : (
									<button
										type="button"
										className="li-share-primary"
										onClick={connect}
									>
										{account ? t.reconnect : t.connect}
									</button>
								)}
							</footer>
						</>
					)}
				</div>
			</dialog>
		</>
	);
}
