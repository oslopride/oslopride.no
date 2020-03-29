# oslopride.no

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](code_of_conduct.md)

## Project stucture 🛠

This is a monorepo managed by [yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/). It consists of the following projects:

* [web](https://github.com/oslopride/oslopride.no/tree/master/web): The frontend website (https://www.oslopride.no) written in [TypeScript](https://www.typescriptlang.org) and [React](https://reactjs.org).
* [sanity](https://github.com/oslopride/oslopride.no/tree/master/sanity): A headless CMS (content management system) using [Sanity](https://www.sanity.io).

## Contributing 🤝

**Please familiarize yourself with [our code of conduct](https://www.notion.so/Code-of-Conduct-ca45bbd8081e40498f50969588802d94) before contributing.**

We welcome all contributions 💕 If you have questions or feature requests, don't hesitate to [open an issue](https://github.com/oslopride/oslopride.no/issues/new/choose). If you haven't contributed to this project before, issues marked with [`good first issue`](https://github.com/oslopride/oslopride.no/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) might be a good place to start.

When you have found (or created) an unassigned issue that describes something you want to try solve, add a comment asking if the issue is available and ready to be worked on. We'll try to reply as soon as possible.  
After you've gotten a green light, it's handy to create a draft pull request (PR) as soon as possible. This way you'll have a place to ask questions and get feedback. This also allows others insight to the progress. If your not comfertable with creating a draft PR, you can use the issue as a place for questions and feedback.  
When you're ready for code review, mark the PR ready for review (or create a new PR if you didn't create a draft). Please make the title of your PR as short and consise as possible, as this will be displayed in the changelogs (don't worry too much about it, it can always be changed at a later point).  
Now it's time to prepare for constructive feedback! Always keep in mind that the feedback you'll get from a code review is not ment to insult or judge you in any way. It's just another person with a different point of view that want to help you make your PR as good as possible. When it comes to code, most things are subjective, and it's completly fine to disagree to other peoples opinions. If you disagree whith something, explaining why in a contructive and collaborative way. The goal is to find a good solution together. And always remember, you're disagreeing whith _something_ NOT _someone_.  
Iterate and work on you PR base on the feedback and descussions provided by code reviews until your PR gets approved. When it gets approved, we'll merge it as soon as possible.

Here's a cheat sheet of the contribution steps above:

1. Find (or create) an unassigned issue you want to work on.
2. Ask in the issue if it is available and ready to be worked on.
3. It's encouraged to create a draft PR as early as possible. This way you have a place to ask questins and get feedback. If you don't want to create a draft, that's completly fine. You can use the issue as a place for questions and feedback.
4. When you're ready for code review, mark the PR as ready for review, or create the PR if you didn't create a draft.
5. Try making the title of your PR as short and consise as possible, as it will be displayed in the changelogs.
6. Iterate and work on you PR based on the feedback and descussions provided by code reviews until you PR gets approved.
7. You're done!

## Development Setup 🚀

To setup the project locally you'll need to have [Node.js](https://nodejs.org/en/) and [Yarn v1.x](https://classic.yarnpkg.com) installed globally on your computer.

Install all dependencies:

```
yarn install
```

To run commands within a specific project, prefix the command with the name of the project. For example, to add an additional dependency within [the web project](https://github.com/oslopride/oslopride.no/tree/master/web), run:

```
yarn web install <the package>
```

To start the projects locally, use `yarn <project> dev`, for example:

```
yarn web dev
```

It's strongly recommended to use an editor with integrated support for [prettier](https://prettier.io), like [Visual Studio Code](https://code.visualstudio.com). If you use Visual Studio Code, you can get a list of recommended extensions using the `Show Recommended Extensions` command.
