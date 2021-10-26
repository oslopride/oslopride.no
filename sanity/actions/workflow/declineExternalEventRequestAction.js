import { useState } from "react";
import { useDocumentOperation } from "@sanity/react-hooks";

export function declineExternalEventEditRequestAction(props) {
	const { patch } = useDocumentOperation(props.id, props.type);
	const [dialogOpen, setDialogOpen] = useState(false);

	if (props.type === "externalEventRequest") {
		return {
			label: "Avslå",
			onHandle: () => {
				setDialogOpen(true);
			},
			dialog: dialogOpen && {
				type: "confirm",
				onCancel: () => {
					setDialogOpen(false);
				},
				onConfirm: () => {
					patch.execute([{ set: { approved: false } }]);
					props.onComplete();
				},
				message: "Vil du angre/avslå denne forespørselen?"
			}
		};
	}
}
