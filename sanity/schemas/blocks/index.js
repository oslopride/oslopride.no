import advertisement from "./advertisement";
import announcement from "./announcement";
import collapsible from "./collapsible";
import textArea from "./text-area";
import partnerPreview from "./partner-preview";

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
		},
		{
			type: collapsible.name
		},
		{
			type: partnerPreview.name
		}
	]
};
