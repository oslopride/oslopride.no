import { Page, Configuration, Article, Event, FrontPage } from "./models";
import { Derive } from "overmind";

type State = {
	configuration: Configuration | null;
	isLoadingConfiguration: boolean;

	frontPage: FrontPage | null;
	pages: { [id: string]: Page };
	articles: { [id: string]: Article };
	events: { [id: string]: Event };

	currentPageSlug: string | null;
	isLoadingCurrentPage: boolean;
	currentPage: Derive<State, Page | null>;

	currentArticleSlug: string | null;
	isLoadingCurrentArticle: boolean;
	currentArticle: Derive<State, Article | null>;

	currentEventSlug: string | null;
	isLoadingCurrentEvent: boolean;
	currentEvent: Derive<State, Event | null>;
};

export const state: State = {
	configuration: null,
	isLoadingConfiguration: true,

	frontPage: null,
	pages: {},
	articles: {},
	events: {},

	currentPageSlug: null,
	isLoadingCurrentPage: false,
	currentPage: state =>
		Object.values(state.pages).find(
			page => page.slug === state.currentPageSlug
		) || null,

	currentArticleSlug: null,
	isLoadingCurrentArticle: false,
	currentArticle: () => null,

	currentEventSlug: null,
	isLoadingCurrentEvent: false,
	currentEvent: () => null
};
