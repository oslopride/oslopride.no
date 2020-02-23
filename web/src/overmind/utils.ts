type Languages = "no" | "en";

export type Locale<T> = {
	[L in Languages]: T;
};
