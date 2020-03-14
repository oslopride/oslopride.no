import advertisement from "./advertisement";
import announcement from "./announcement";
import textArea from "./text-area";
<<<<<<< HEAD
import partnerList from "./partner-list";
=======
import collapsible from "./collapsible";
>>>>>>> master

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
<<<<<<< HEAD
			type: partnerList.name
=======
			type: collapsible.name
>>>>>>> master
		}
	]
};
