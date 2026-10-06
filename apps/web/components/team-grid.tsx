"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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
}: {
	members: TeamMember[];
	locale: Locale;
	id?: string;
	filters?: { all: string; areas: Record<TeamArea, string> };
}) {
	const [ordered, setOrdered] = useState(members);
	const [area, setArea] = useState<TeamArea | null>(null);

	useEffect(() => {
		setOrdered(shuffle(members));
	}, [members]);

	const visible = area
		? ordered.filter((member) => memberAreas(member).includes(area))
		: ordered;

	return (
		<div id={id}>
			{filters && (
				<div className="station-team-filters">
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
			)}
			<div className="station-team-grid">
				{visible.map((member) => (
					<Link key={member.username} href={withLocale(`/team/${member.username}`, locale)} className="station-person">
						<div className="station-person-portrait">
							<Image src={member.image} alt="" fill sizes="(max-width: 399px) 100vw, (max-width: 767px) 50vw, 25vw" />
						</div>
						<p className="station-person-name">{member.name}</p>
						<p className="station-person-role">{member.role}</p>
						<p className="station-person-location">{member.location}</p>
					</Link>
				))}
			</div>
		</div>
	);
}
