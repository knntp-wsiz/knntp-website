"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { FiArrowRight, FiAward } from "react-icons/fi";
import type { Course, CoursePrice } from "@/lib/courses";

export type CourseCard = Course & {
	summary: string;
	certificateName: string;
	href: string;
	coverAlt: string;
};

type Choice<T extends string> = { value: T; label: string };

type Group<T extends string> = { label: string; choices: Choice<T>[] };

type Labels = {
	filtersLabel: string;
	topic: Group<"all" | "programming" | "ai">;
	price: Group<"all" | CoursePrice>;
	certificate: Group<"all" | "yes" | "no">;
	certificateCost: Group<"all" | "free" | "paid">;
	searchLabel: string;
	searchPlaceholder: string;
	/** Z placeholderami {shown} i {total}. */
	count: string;
	empty: string;
	reset: string;
	details: string;
	groups: Record<CoursePrice, string>;
	badges: {
		certNone: string;
		certFree: string;
		certPaid: string;
		free: string;
		paid: string;
	};
	kinds: Record<Course["kind"], string>;
	/** Z placeholderem {n}. */
	hours: string;
};

type Props = { courses: CourseCard[]; labels: Labels };

type Filters = {
	topic: "all" | "programming" | "ai";
	price: "all" | CoursePrice;
	certificate: "all" | "yes" | "no";
	certificateCost: "all" | "free" | "paid";
};

const INITIAL: Filters = {
	topic: "all",
	price: "all",
	certificate: "all",
	certificateCost: "all",
};

const GROUP_ORDER: CoursePrice[] = ["free", "paid"];

/** Pojedynczy zestaw przycisków filtra (aria-pressed), z legendą. */
function FilterGroup<T extends string>({
	group,
	value,
	onChange,
	disabled = false,
}: {
	group: Group<T>;
	value: T;
	onChange: (value: T) => void;
	disabled?: boolean;
}) {
	return (
		<fieldset className="min-w-0" disabled={disabled}>
			<legend className="font-mono text-sm text-muted">{group.label}</legend>
			<div className="mt-2 flex flex-wrap gap-2">
				{group.choices.map((choice) => {
					const active = value === choice.value;
					return (
						<button
							key={choice.value}
							type="button"
							aria-pressed={active}
							onClick={() => onChange(choice.value)}
							className={
								active
									? "border border-accent bg-accent px-3 py-1.5 text-sm font-semibold text-on-accent transition-colors duration-150 disabled:opacity-40"
									: "border border-line px-3 py-1.5 text-sm font-semibold text-text transition-colors duration-150 hover:border-accent hover:text-accent disabled:opacity-40 disabled:hover:border-line disabled:hover:text-text"
							}
						>
							{choice.label}
						</button>
					);
				})}
			</div>
		</fieldset>
	);
}

function CertificateBadge({
	course,
	labels,
}: {
	course: CourseCard;
	labels: Labels["badges"];
}) {
	if (course.certificate === "none") {
		return <span className="text-muted">{labels.certNone}</span>;
	}
	const free = course.certificate === "free";
	return (
		<span
			className={
				free
					? "inline-flex items-center gap-1.5 border border-accent bg-accent px-2 py-0.5 font-semibold text-on-accent"
					: "inline-flex items-center gap-1.5 border border-accent px-2 py-0.5 font-semibold text-accent"
			}
		>
			<FiAward aria-hidden="true" />
			{free ? labels.certFree : labels.certPaid}
		</span>
	);
}

/** Filtry i siatka kursów. Wszystkie pozycje są w DOM od razu, filtr tylko je ukrywa. */
export default function CourseBrowser({ courses, labels }: Props) {
	const [filters, setFilters] = useState<Filters>(INITIAL);
	const [query, setQuery] = useState("");
	const searchId = useId();

	const set = <K extends keyof Filters>(key: K, value: Filters[K]) =>
		setFilters((prev) => {
			const next = { ...prev, [key]: value };
			// Koszt certyfikatu ma sens tylko dla pozycji z certyfikatem.
			if (key === "certificate" && value === "no") next.certificateCost = "all";
			return next;
		});

	const visible = useMemo(() => {
		const needle = query.trim().toLowerCase();
		return courses.filter((c) => {
			if (filters.topic !== "all" && c.topic !== filters.topic) return false;
			if (filters.price !== "all" && c.price !== filters.price) return false;
			if (filters.certificate === "yes" && c.certificate === "none")
				return false;
			if (filters.certificate === "no" && c.certificate !== "none")
				return false;
			if (
				filters.certificateCost !== "all" &&
				c.certificate !== filters.certificateCost
			)
				return false;
			return (
				needle === "" ||
				`${c.name} ${c.provider} ${c.summary} ${c.certificateName}`
					.toLowerCase()
					.includes(needle)
			);
		});
	}, [courses, filters, query]);

	const filtered =
		query.trim() !== "" || Object.values(filters).some((v) => v !== "all");

	const reset = () => {
		setFilters(INITIAL);
		setQuery("");
	};

	return (
		<div>
			<search
				aria-label={labels.filtersLabel}
				className="grid gap-x-8 gap-y-5 border-y border-line py-6 sm:grid-cols-2 lg:grid-cols-4"
			>
				<FilterGroup
					group={labels.topic}
					value={filters.topic}
					onChange={(v) => set("topic", v)}
				/>
				<FilterGroup
					group={labels.price}
					value={filters.price}
					onChange={(v) => set("price", v)}
				/>
				<FilterGroup
					group={labels.certificate}
					value={filters.certificate}
					onChange={(v) => set("certificate", v)}
				/>
				<FilterGroup
					group={labels.certificateCost}
					value={filters.certificateCost}
					onChange={(v) => set("certificateCost", v)}
					disabled={filters.certificate === "no"}
				/>
				<div className="sm:col-span-2 lg:col-span-4">
					<label
						htmlFor={searchId}
						className="block font-mono text-sm text-muted"
					>
						{labels.searchLabel}
					</label>
					<input
						id={searchId}
						type="search"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder={labels.searchPlaceholder}
						autoComplete="off"
						className="mt-2 w-full max-w-md border-b border-line bg-transparent py-2 text-text placeholder:text-muted focus:border-accent focus:outline-none"
					/>
				</div>
			</search>

			<div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
				<p aria-live="polite" className="font-mono text-sm text-muted tabular">
					{labels.count
						.replace("{shown}", String(visible.length))
						.replace("{total}", String(courses.length))}
				</p>
				{filtered && (
					<button
						type="button"
						onClick={reset}
						className="text-sm font-semibold text-accent hover:text-text"
					>
						{labels.reset}
					</button>
				)}
			</div>

			{visible.length === 0 ? (
				<p className="mt-10 border-t border-line pt-8 text-lg text-text">
					{labels.empty}
				</p>
			) : (
				GROUP_ORDER.map((price) => {
					const group = visible.filter((c) => c.price === price);
					if (group.length === 0) return null;
					return (
						<section key={price} className="mt-12">
							<h2 className="flex items-baseline gap-3 text-4xl font-semibold">
								{labels.groups[price]}
								<span className="font-mono text-base text-muted tabular">
									{group.length}
								</span>
							</h2>
							<ul className="mt-6 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
								{group.map((course) => (
									<li
										key={course.id}
										className="group relative border-t border-line pt-6"
									>
										<Image
											src={course.cover}
											alt={course.coverAlt}
											width={900}
											height={600}
											sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
											unoptimized
											className="aspect-[3/2] w-full object-cover"
										/>
										<p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs">
											<CertificateBadge
												course={course}
												labels={labels.badges}
											/>
											<span className="text-muted">
												{labels.kinds[course.kind]}
												{course.cost ? ` / ${course.cost}` : ""}
												{course.hours
													? ` / ${labels.hours.replace("{n}", String(course.hours).replace(".", ","))}`
													: ""}
											</span>
										</p>
										<h3 className="mt-3 text-2xl font-semibold">
											<Link
												href={course.href}
												className="after:absolute after:inset-0 group-hover:text-accent"
											>
												{course.name}
											</Link>
										</h3>
										<p className="mt-1 font-mono text-xs text-muted">
											{course.provider}
										</p>
										<p className="mt-3 line-clamp-3 text-sm text-text">
											{course.summary}
										</p>
										<span
											aria-hidden="true"
											className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent"
										>
											{labels.details}
											<FiArrowRight />
										</span>
									</li>
								))}
							</ul>
						</section>
					);
				})
			)}
		</div>
	);
}
