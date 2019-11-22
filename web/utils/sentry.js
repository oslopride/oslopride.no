import * as Sentry from "@sentry/node";

const SANITY_DNS = "https://785a889b53d9402c93bfea0bd999401d@sentry.io/1475905";
const PROD_HOST = "www.oslopride.no";
const isProd = process.env.NODE_ENV === "production";
let initialized = false;

export function initializeSentry() {
  if (!initialized && isProd) {
    // Initialize sentry
    initialized = true;

    const sentryOptions = {
      dsn: SANITY_DNS,
      release: process.env.SENTRY_RELEASE,
      maxBreadcrumbs: 50,
      attachStacktrace: true
    };

    Sentry.init(sentryOptions);

    Sentry.configureScope(scope => {
      scope.setTag("ssr", !process.browser);
    });
  }
}

export default function logError(error, ctx) {
  if (initialized && isProd) {
    Sentry.configureScope(scope => {
      if (error.message) {
        scope.setFingerprint([error.message]);
      }

      if (error.statusCode) {
        scope.setExtra("statusCode", error.statusCode);
      }

      if (ctx) {
        const { req, res, errorInfo, query, pathname } = ctx;

        if (res && res.statusCode) {
          scope.setExtra("statusCode", res.statusCode);
        }

        if (process.browser) {
          scope.setExtra("query", query);
          scope.setExtra("pathname", pathname);
        } else {
          scope.setExtra("url", req.url);
          scope.setExtra("method", req.method);
          scope.setExtra("headers", req.headers);
          scope.setExtra("params", req.params);
          scope.setExtra("query", req.query);
        }
      }
    });
    Sentry.captureException(error);
  } else {
    console.error(error);
  }
}
