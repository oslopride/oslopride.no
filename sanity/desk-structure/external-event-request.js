import S from "@sanity/desk-tool/structure-builder";
import { MdEvent, MdEventAvailable, MdEventBusy } from "react-icons/md";

export default S.listItem()
	.title("Skeivt Kulturår Events")
	.icon(MdEvent)
	.child(
		S.list()
			.title("Filters")
			.items([
				S.listItem()
					.title("Waiting for approval")
					.icon(MdEvent)
					.child(
						S.documentTypeList("externalEventRequest")
							.title("Events")
							.filter(
								"_type == 'externalEventRequest' && _id in path('drafts.**')"
							)
					),
				S.listItem()
					.title("Accepted")
					.icon(MdEventAvailable)
					.child(
						S.documentTypeList("externalEventRequest")
							.title("Events")
							.filter("approved == true")
					),
				S.listItem()
					.title("Rejected")
					.icon(MdEventBusy)
					.child(
						S.documentTypeList("externalEventRequest")
							.title("Events")
							.filter("approved == false")
					)
			])
	);
