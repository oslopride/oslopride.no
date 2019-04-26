import ReactGA from "react-ga";

const GOOGLE_ANALYTICS_TRACKING_ID = "UA-54270444-1";

const isProd = () => {
  if (typeof window === "undefined") return false;
  const {
    location: { hostname }
  } = window; // eslint-disable-line no-undef
  return hostname === "www.oslopride.no" || hostname === "oslopride.no";
};

export const initializeGoogleAnalytics = () => {
  if (!isProd()) {
    // eslint-disable-next-line no-console
    console.debug("[GOOGLE ANALYTICS] Google Analytics is disabled");
    return;
  }

  ReactGA.initialize(GOOGLE_ANALYTICS_TRACKING_ID);
  ReactGA.set({ anonymizeIp: true });
};

export const logPageView = path => {
  if (!isProd()) {
    // eslint-disable-next-line no-console
    console.debug(`[GOOGLE ANALYTICS] Page View: ${path}`);
    return;
  }
  ReactGA.pageview(path);
};
