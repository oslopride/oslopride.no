# oslopride.no

This is a monorepo of both the website (frontend) and CMS (backend) used on [oslopride.no](www.oslopride.no). It uses [yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/).

## Development

Install all dependencies using `yarn install`. To run commands within the different packages (`/sanity` and `/web`) prefix the yarn command with the package you want to target. For example: to run `yarn add react` inside the web package, use `yarn web add react`. You can also `cd` into the package, and use yarn regurarly (without the prefix).

**Remember that data within sanity studio always is live data. Publishing changes on a sanity studio running locally will be visible and affect everyone else using the same dataset.**

Contribute by submitting a pull request. If the pull request solves a tracked github issue, please reffer to the issue within the pull request's description. Please use a descriptive title for your pull request.

🏳️‍🌈
