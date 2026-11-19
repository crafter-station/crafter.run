"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HomeHead } from "@/components/home-head";
import { type Locale, withLocale } from "@/lib/i18n";
import {
	memberAreas,
	type TeamArea,
	type TeamMember,
	teamAreas,
} from "@/lib/team";

function shuffle<T>(items: T[]) {
	const result = [...items];
	for (let i = result.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}
	return result;
}

export function TeamGrid({
	members,
	locale,
	id,
	filters,
	head,
}: {
	members: TeamMember[];
	locale: Locale;
	id?: string;
	filters?: { all: string; areas: Record<TeamArea, string> };
	/** Section header; the filter tabs go in its action slot. */
	head?: { id: string; index: number; label: string; title: string; lede?: string };
}) {
	const [ordered, setOrdered] = useState(members);
	const [area, setArea] = useState<TeamArea | null>(null);

	useEffect(() => {
		setOrdered(shuffle(members));
	}, [members]);

	const visible = area
		? ordered.filter((member) => memberAreas(member).includes(area))
		: ordered;

	const tabs = filters ? (
		<div className="home-tabs" role="group">
			{[null, ...teamAreas].map((value) => (
				<button
					key={value ?? "all"}
					type="button"
					onClick={() => setArea(value)}
					aria-pressed={area === value}
				>
					{value ? filters.areas[value] : filters.all}
				</button>
			))}
		</div>
	) : null;

	return (
		<div id={id}>
			{head ? <HomeHead {...head}>{tabs}</HomeHead> : tabs}
			<div className="home-frame station-tiles team-portraits">
				{visible.map((member, i) => (
					<Link key={member.username} href={withLocale(`/team/${member.username}`, locale)} className="home-portrait">
						<div className="home-portrait-image">
							<div className="home-portrait-cutout" style={{ clipPath: `url(#portrait-crop-${i % 4})` }}>
								<span className="home-portrait-plate" style={{ clipPath: `url(#portrait-shape-${i % 4})` }} aria-hidden="true" />
								<Image src={member.image} alt="" fill sizes="(max-width: 899px) 50vw, 20vw" />
							</div>
						</div>
						<div className="team-portrait-caption">
							<p className="team-portrait-name">{member.name}</p>
							<p className="home-label-sm">{member.role}</p>
							<p className="team-portrait-location">{member.location}</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
