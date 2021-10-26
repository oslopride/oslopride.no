import defaultResolve from "part:@sanity/base/document-actions";
import { approveExternalEventEditRequestAction } from "./workflow/approveExternalEventRequestAction";
import { declineExternalEventEditRequestAction } from "./workflow/declineExternalEventRequestAction";

export default function resolveDocumentActions(props) {
	if (props.type === "externalEventRequest") {
		return [
			approveExternalEventEditRequestAction,
			declineExternalEventEditRequestAction
		];
	}

	return [...defaultResolve(props)];
}
