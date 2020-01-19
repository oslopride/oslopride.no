const defaultLanguage = "no";
const extraLanguages = ["en"];

function createLocalePage(page, createPage) {
	const { context, ...rest } = page;

	// Default languages
	createPage({
		...rest,
		context: {
			...context,
			locale: defaultLanguage
		}
	});

	// Extra languages
	extraLanguages.forEach(language => {
		const { path, context, ...rest } = page;
		createPage({
			...rest,
			path: `/${language}${path}`,
			context: {
				...context,
				locale: language
			}
		});
	});
}

exports.createPages = async function({ graphql, actions, reporter }) {
	const { createPage } = actions;

	const result = await graphql(`
		query AllSanityPagesQuery {
			allSanityPage {
				nodes {
					id
					slug {
						current
					}
				}
			}
		}
	`);

	if (result.errors) {
		throw result.errors;
	}

	const pages = result.data.allSanityPage.nodes || [];

	pages.forEach(page => {
		createLocalePage(
			{
				path: `/${page.slug.current}`,
				component: require.resolve("./src/templates/page-template"),
				context: {
					id: page.id
				}
			},
			createPage
		);
	});
};

exports.onCreatePage = ({ page, actions }) => {
	const { createPage, deletePage } = actions;
	deletePage(page);
	createLocalePage(page, createPage);
};
