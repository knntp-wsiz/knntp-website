/** Intro hero (pisanie tekstu + fala siatki) odtwarzamy tylko do pierwszego pełnego obejrzenia. */
export const INTRO_KEY = "knntp:intro-seen";

export function hasSeenIntro(): boolean {
	try {
		return window.localStorage.getItem(INTRO_KEY) === "1";
	} catch {
		return false;
	}
}

export function markIntroSeen() {
	try {
		window.localStorage.setItem(INTRO_KEY, "1");
	} catch {}
	document.documentElement.dataset.intro = "seen";
}

export function resetIntro() {
	try {
		window.localStorage.removeItem(INTRO_KEY);
	} catch {}
	delete document.documentElement.dataset.intro;
}

/** Wykonywany w <head> przed pierwszym renderem, żeby nie było mignięcia ukrytego tekstu. */
export const INTRO_BOOT_SCRIPT = `try{if(localStorage.getItem(${JSON.stringify(INTRO_KEY)})==="1")document.documentElement.dataset.intro="seen"}catch(e){}`;
