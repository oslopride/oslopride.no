import defaultResolve from "part:@sanity/base/document-badges";

function eventRequestBadge(props) {
	if (!props.published) {
		return {
			label: "pending",
			title: "Event request has not yet been reviewed",
			color: "warning"
		};
	} else if (!props.published.approved) {
		return {
			label: "declined",
			title: "The event has been declined",
			color: "danger"
		};
	} else if (props.published.approved) {
		return {
			label: "approved",
			title: "The event has been approved",
			color: "success"
		};
	}
}

export default function resolveDocumentBadges(props) {
	if (props.type === "externalEventRequest") {
		return [eventRequestBadge];
	}
	return [...defaultResolve(props)];
}
