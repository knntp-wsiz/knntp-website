import { notFound } from "next/navigation";

/** Każdy nieznany adres kończy w not-found z layoutem strony. */
export default function CatchAll() {
	notFound();
}
