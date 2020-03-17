import advertisement from "./advertisement";
import announcement from "./announcement";
import textArea from "./text-area";
import partnerList from "./partner-list";
import collapsible from "./collapsible";
import partnerPreview from "./partner-preview";
import quote from "./quote";

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
			type: partnerList.name
		},
		{
			type: collapsible.name
		},
		{
			type: partnerPreview.name
		},
		{
			type: quote.name
		}
	]
};
