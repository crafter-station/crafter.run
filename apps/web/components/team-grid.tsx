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
import { cn } from "@/lib/utils";

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
				<div className="flex flex-wrap gap-2 border-b border-line px-6 py-4 md:px-10">
					{[null, ...teamAreas].map((value) => (
						<button
							key={value ?? "all"}
							type="button"
							onClick={() => setArea(value)}
							aria-pressed={area === value}
							className={cn(
								"rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors",
								area === value
									? "border-foreground bg-foreground text-background"
									: "border-line text-muted-foreground hover:text-foreground",
							)}
						>
							{value ? filters.areas[value] : filters.all}
						</button>
					))}
				</div>
			)}
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
				{visible.map((member, i) => {
					const col = (n: number) => i % n;
					return (
						<Link
							key={member.username}
							href={withLocale(`/team/${member.username}`, locale)}
							className={cn(
								"group relative flex flex-col items-center gap-3 px-4 py-8 text-center transition-colors hover:bg-accent-surface/5",
								col(2) !== 0 && "border-l border-line sm:border-l-0",
								col(3) !== 0 && "sm:border-l sm:border-line lg:border-l-0",
								col(4) !== 0 && "lg:border-l lg:border-line",
								i >= 2 && "border-t border-line sm:border-t-0",
								i >= 3 && "sm:border-t sm:border-line lg:border-t-0",
								i >= 4 && "lg:border-t lg:border-line",
							)}
						>
							<div className="relative size-20 overflow-hidden rounded-full border border-line bg-secondary">
								<Image
									src={member.image}
									alt={member.name}
									fill
									sizes="80px"
									className="object-cover transition-transform duration-300 group-hover:scale-105"
								/>
							</div>
							<div>
								<p className="text-sm font-medium text-foreground">
									{member.name}
								</p>
								<p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
									{member.role}
								</p>
								<p className="mt-1 font-mono text-[10px] tracking-wider text-muted-foreground/70">
									{member.location}
								</p>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
