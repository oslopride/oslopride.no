import { AsyncAction } from "overmind";

export const initialize: AsyncAction = async ({ actions }) => {
	await actions.getConfiguration();
};

export const getFrontPage: AsyncAction = async ({ state, effects }) => {
	const frontPage = await effects.api.getFrontPage();
	if (frontPage !== null) {
		state.frontPage = {
			id: frontPage._id,
			blocks: frontPage.blocks
		};
	}
};

export const setCurrentPage: AsyncAction<string> = async (
	{ state, effects },
	slug
) => {
	state.currentPageSlug = slug;
	if (!Object.values(state.pages).some(page => page.slug === slug)) {
		// We need to fetch the page
		state.isLoadingCurrentPage = true;
		const page = await effects.api.getPageBySlug(slug);
		if (page === null) {
			// render 404
			state.isLoadingCurrentPage = false;
			return;
		}
		state.pages[page._id] = {
			id: page._id,
			slug: page.slug.current,
			title: page.title,
			blocks: page.blocks
		};
		state.isLoadingCurrentPage = false;
	}
};

export const getConfiguration: AsyncAction = async ({ state, effects }) => {
	state.isLoadingConfiguration = true;

	const configuration = await effects.api.getConfiguration();

	if (configuration !== null) {
		state.configuration = {
			navigationBar: configuration.navigationBar.map(item => {
				if (item._type === "frontPage") {
					return { id: item._id, title: { en: "Home", no: "Hjem" }, url: "/" };
				}
				return { id: item._id, title: item.title, url: item.slug.current };
			})
		};
		configuration.navigationBar.forEach(page => {
			if (page._type === "page") {
				state.pages[page._id] = {
					id: page._id,
					slug: page.slug.current,
					title: page.title,
					blocks: page.blocks
				};
			}
		});
	}

	state.isLoadingConfiguration = false;
};
