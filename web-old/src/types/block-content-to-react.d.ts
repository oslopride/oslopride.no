declare module "@sanity/block-content-to-react" {
	import React from "react";
	import { SanityObjectArray, SanityBlockContent } from "../sanity/models";

	const content: React.FC<{
		blocks: SanityObjectArray<SanityBlockContent>;
		serializers?: {
			types: {
				[key: string]: React.FC | React.Component;
			};
		};
		imageOptions?: {
			[key: string]: string | number;
		};
		dataset?: string;
		projectId?: string;
	}>;

	export default content;
}
