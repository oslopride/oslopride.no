type Languages = "no" | "en";
export type Locale<T> = {
	[L in Languages]: T;
};

export function isEmptyResult(result: object | null): boolean {
	if (result === null) return true;
	return Object.keys(result).length === 0;
}
