# oslopride.no

This is a monorepo of both the website (frontend) and CMS (backend) used on [oslopride.no](www.oslopride.no). It uses [yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/).

## Development

Install all dependencies using `yarn install`. To run commands within the different packages (`/sanity` and `/web`) prefix the yarn command with the package you want to target. For example: to run `yarn add react` inside the web package, use `yarn web add react`. You can also `cd` into the package, and use yarn regurarly (without the prefix).

**Remember that data within sanity studio always is live data. Publishing changes on a sanity studio running locally will be visible and affect everyone else using the same dataset.**

## Contributing

1. Find or create an issue describing the task. If you don't create an issue yourself, please choose an issue with the `priority` label if one is available.
2. Assign yourself to the issue. If the issue already has an assignee, please confim with them that it's ok that you take over the issue.
3. Create a branch for your pull request.
4. As soon as you have commited anything (preferably as soon as possible), push it and create a draft pull requst. If the issue belonged to a project, add your pull request to the same project (but not milestone).
5. Continue to work on your branch, and push often.
6. When you are finnished and ready for review, remove the draft status of your pull request, and request review from one or two people. It's nice to ping them on slack also, as github isn't the best on notifications.
7. When your pull request is approved, merge it whenever you are ready.

🏳️‍🌈
