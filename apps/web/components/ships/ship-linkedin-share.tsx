"use client";

import { useUser } from "@clerk/nextjs";

import { LinkedInShare } from "@/components/linkedin-share";
import type { Locale } from "@/lib/i18n";

const copy: Record<Locale, { mine: string; theirs: string }> = {
	en: {
		mine: "I shipped {name} on Crafter Station: {tagline}",
		theirs: "{name} by {owner}, shipped on Crafter Station: {tagline}",
	},
	es: {
		mine: "Lancé {name} en Crafter Station: {tagline}",
		theirs: "{name}, de {owner}, en Crafter Station: {tagline}",
	},
	pt: {
		mine: "Lancei {name} na Crafter Station: {tagline}",
		theirs: "{name}, de {owner}, na Crafter Station: {tagline}",
	},
	zh: {
		mine: "我在 Crafter Station 发布了 {name}：{tagline}",
		theirs: "{owner} 在 Crafter Station 发布的 {name}：{tagline}",
	},
	ja: {
		mine: "Crafter Stationで{name}をリリースしました：{tagline}",
		theirs: "{owner}がCrafter Stationでリリースした{name}：{tagline}",
	},
};

export function ShipLinkedInShare({
	locale,
	slug,
	name,
	tagline,
	ownerHandle,
	ownerName,
	className,
}: {
	locale: Locale;
	slug: string;
	name: string;
	tagline: string;
	ownerHandle: string;
	ownerName: string;
	className?: string;
}) {
	const { user } = useUser();
	const github = user?.externalAccounts.find(
		(account) => account.provider === "github",
	)?.username;
	const mine = Boolean(
		github && github.toLowerCase() === ownerHandle.toLowerCase(),
	);
	const url = `https://crafter.run/${locale}/ships/${slug}`;
	const lead = (mine ? copy[locale].mine : copy[locale].theirs)
		.replace("{name}", name)
		.replace("{owner}", ownerName)
		.replace("{tagline}", tagline);
	return (
		<LinkedInShare
			id={`ship-${slug}-${mine ? "mine" : "theirs"}`}
			locale={locale}
			text={`${lead}\n\n${url}`}
			article={{ url, title: name, description: tagline }}
			className={className}
		/>
	);
}
