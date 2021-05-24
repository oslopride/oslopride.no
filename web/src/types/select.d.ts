declare module "react-select" {
	import React from "react";

	type option = {
		value: string;
		label: string;
		[s: string]: any;
	};

	const content: React.FC<{
		onChange: any;
		options: option[];
		placeholder?: string;
		isMulti?: boolean;
	}>;

	export default content;
}
