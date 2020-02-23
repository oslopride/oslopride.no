import { Locale } from "./utils";

type Link = {
	id: string;
	title: Locale<string>;
	url: string;
};

type Block = object;

export type Configuration = {
	navigationBar: Link[];
};

export type FrontPage = {
	id: string;
	blocks: Block[];
};

export type Page = {
	id: string;
	slug: string;
	title: Locale<string>;
	blocks: Block[];
};

export type Article = {};

export type Event = {};
