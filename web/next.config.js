const withCSS = require("@zeit/next-css");
const withSourceMaps = require("@zeit/next-source-maps")();
const webpack = require("webpack");

const compose = (...fns) =>
  fns.reduceRight(
    (prevFn, nextFn) => (...args) => nextFn(prevFn(...args)),
    value => value
  );

const nextPlugins = compose(
  withCSS,
  withSourceMaps
);

module.exports = nextPlugins({
  target: "serverless",
  // Taken from:
  // https://github.com/zeit/next.js/blob/7e7f2c0a6df2cf6a48fa4b34beb1d5befe13fa54/examples/with-sentry/next.config.js
  webpack: (config, { isServer, buildId }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.SENTRY_RELEASE": JSON.stringify(buildId)
      })
    );

    if (!isServer) {
      config.resolve.alias["@sentry/node"] = "@sentry/browser";
    }

    return config;
  }
});
