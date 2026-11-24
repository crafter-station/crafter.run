import Image from "next/image";

import type { Locale } from "@/lib/i18n";

type LinkedInPostProps = {
	href: string;
	name: string;
	headline: string;
	avatar: string;
	date: string;
	text: string;
	media?: string;
	mediaAlt?: string;
	mediaSize?: string;
	video?: boolean | string;
	likes?: number | string;
	comments?: number | string;
	reposts?: number | string;
	locale: Locale;
};

const LABELS: Record<
	Locale,
	{
		view: string;
		reactions: string;
		comments: string;
		reposts: string;
		play: string;
		more: string;
	}
> = {
	es: {
		view: "Ver en LinkedIn",
		reactions: "reacciones",
		comments: "comentarios",
		reposts: "veces compartido",
		play: "Ver el video en LinkedIn",
		more: "ver más",
	},
	en: {
		view: "View on LinkedIn",
		reactions: "reactions",
		comments: "comments",
		reposts: "reposts",
		play: "Watch the video on LinkedIn",
		more: "more",
	},
	pt: {
		view: "Ver no LinkedIn",
		reactions: "reações",
		comments: "comentários",
		reposts: "compartilhamentos",
		play: "Ver o vídeo no LinkedIn",
		more: "ver mais",
	},
	zh: {
		view: "在 LinkedIn 查看",
		reactions: "个回应",
		comments: "条评论",
		reposts: "次转发",
		play: "在 LinkedIn 观看视频",
		more: "更多",
	},
	ja: {
		view: "LinkedInで見る",
		reactions: "件のリアクション",
		comments: "件のコメント",
		reposts: "件のリポスト",
		play: "LinkedInで動画を見る",
		more: "もっと見る",
	},
};

function LinkedInMark() {
	return (
		<svg
			className="linkedin-post-mark"
			viewBox="0 0 24 24"
			aria-hidden="true"
			focusable="false"
		>
			<path
				fill="currentColor"
				d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"
			/>
		</svg>
	);
}

const PREVIEW_CHARS = 180;

function preview(text: string) {
	const shown: string[] = [];
	let used = 0;
	for (const paragraph of text.split(/\n{2,}/)) {
		if (used + paragraph.length <= PREVIEW_CHARS) {
			shown.push(paragraph);
			used += paragraph.length;
			continue;
		}
		const room = PREVIEW_CHARS - used;
		if (room > 40) {
			const cut = paragraph.slice(0, room);
			shown.push(cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:]$/, ""));
		}
		return { shown, truncated: true };
	}
	return { shown, truncated: false };
}

export function LinkedInPost({
	href,
	name,
	headline,
	avatar,
	date,
	text,
	media,
	mediaAlt = "",
	mediaSize = "720x900",
	video,
	likes,
	comments,
	reposts,
	locale,
}: LinkedInPostProps) {
	const t = LABELS[locale] ?? LABELS.en;
	const body = preview(text);
	const isVideo = video === true || video === "" || video === "true";
	const [width, height] = mediaSize.split("x").map(Number);
	const dateLabel = new Intl.DateTimeFormat(locale, {
		year: "numeric",
		month: "short",
		day: "numeric",
		timeZone: "UTC",
	}).format(new Date(date));
	const count = (raw: number | string | undefined, label: string) => {
		const value = raw === undefined || raw === "" ? Number.NaN : Number(raw);
		return Number.isNaN(value) ? null : (
			<span>
				<strong>{new Intl.NumberFormat(locale).format(value)}</strong> {label}
			</span>
		);
	};
	return (
		<figure className="linkedin-post not-prose">
			<header className="linkedin-post-head">
				<a
					href={href}
					className="linkedin-post-author"
					target="_blank"
					rel="noreferrer"
				>
					<Image
						src={avatar}
						alt=""
						width={48}
						height={48}
						className="linkedin-post-avatar"
					/>
					<span className="linkedin-post-who">
						<span className="linkedin-post-name">{name}</span>
						<span className="linkedin-post-headline">{headline}</span>
						<time dateTime={date} className="linkedin-post-date">
							{dateLabel}
						</time>
					</span>
				</a>
				<a
					href={href}
					target="_blank"
					rel="noreferrer"
					aria-label={t.view}
					className="linkedin-post-logo"
				>
					<LinkedInMark />
				</a>
			</header>
			<div className="linkedin-post-text" lang="es">
				{body.shown.map((paragraph, index) => (
					<p key={paragraph.slice(0, 32)}>
						{paragraph}
						{body.truncated && index === body.shown.length - 1 ? (
							<>
								{"… "}
								<a
									href={href}
									target="_blank"
									rel="noreferrer"
									className="linkedin-post-more"
								>
									{t.more}
								</a>
							</>
						) : null}
					</p>
				))}
			</div>
			{media ? (
				<a
					href={href}
					target="_blank"
					rel="noreferrer"
					className="linkedin-post-media"
					aria-label={isVideo ? t.play : t.view}
				>
					<Image
						src={media}
						alt={mediaAlt}
						width={width || 720}
						height={height || 900}
						sizes="(min-width: 768px) 560px, 100vw"
					/>
					{isVideo ? (
						<span className="linkedin-post-play" aria-hidden="true">
							<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
								<path fill="currentColor" d="M8 5.5v13l10.5-6.5L8 5.5Z" />
							</svg>
						</span>
					) : null}
				</a>
			) : null}
			<footer className="linkedin-post-foot">
				<span className="linkedin-post-counts">
					{count(likes, t.reactions)}
					{count(comments, t.comments)}
					{count(reposts, t.reposts)}
				</span>
				<a
					href={href}
					target="_blank"
					rel="noreferrer"
					className="linkedin-post-cta"
				>
					{t.view}
				</a>
			</footer>
		</figure>
	);
}
