"use client";

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";

type HeroTypingState = { done: boolean; finish: () => void };

const HeroTypingContext = createContext<HeroTypingState>({
	done: true,
	finish: () => {},
});

/** Łączy pisany tekst hero z elementami, które mają się pojawić dopiero po jego napisaniu. */
export function HeroTypingProvider({ children }: { children: ReactNode }) {
	const [done, setDone] = useState(false);
	const finish = useCallback(() => setDone(true), []);
	const value = useMemo(() => ({ done, finish }), [done, finish]);
	return (
		<HeroTypingContext.Provider value={value}>
			{children}
		</HeroTypingContext.Provider>
	);
}

export const useHeroTyping = () => useContext(HeroTypingContext);

export function HeroReveal({
	children,
	className = "",
}: {
	children: ReactNode;
	className?: string;
}) {
	const { done } = useHeroTyping();
	return (
		<div
			className={`hero-reveal ${className}`}
			data-state={done ? "shown" : "pending"}
		>
			{children}
		</div>
	);
}
