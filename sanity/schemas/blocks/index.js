import advertisement from "./advertisement";
import announcement from "./announcement";
import textArea from "./text-area";

export default {
	title: "Blocks",
	name: "blocks",
	type: "array",
	of: [
		{
			type: textArea.name
		},
		{
			type: announcement.name
		},
		{
			type: advertisement.name
		}
	]
};
