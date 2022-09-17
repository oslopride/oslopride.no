import ReactGA from "react-ga";

const GOOGLE_ANALYTICS_TRACKING_ID = "UA-54270444-1";

export function isProd() {
	if (typeof window === "undefined") return false;
	const {
		location: { hostname }
	} = window; // eslint-disable-line no-undef
	return ["oslopride.no", "www.oslopride.no", "beta.oslopride.no"].includes(
		hostname
	);
}

export function initializeGoogleAnalytics() {
	if (!isProd()) {
		// eslint-disable-next-line no-console
		console.debug("[GOOGLE ANALYTICS] Google Analytics is disabled");
		return;
	}

	ReactGA.initialize(GOOGLE_ANALYTICS_TRACKING_ID);
	ReactGA.set({ anonymizeIp: true });
}

export function logPageView(path?: string) {
	const pathToLog = path || window.location.pathname + window.location.search;
	if (!isProd()) {
		// eslint-disable-next-line no-console
		console.debug(`[GOOGLE ANALYTICS] Page View: ${pathToLog}`);
		return;
	}
	ReactGA.pageview(pathToLog);
}
