import React, { useState } from "react";
import { useDocumentOperation } from "@sanity/react-hooks";

export function approveExternalEventEditRequestAction(props) {
	const { patch } = useDocumentOperation(props.id, props.type);
	const [dialogOpen, setDialogOpen] = React.useState(false);
	const [, setIsApproved] = useState(false);

	if (props.type === "externalEventRequest") {
		return {
			label: "Godkjenn",
			onHandle: () => {
				setDialogOpen(true);
			},
			dialog: dialogOpen && {
				type: "confirm",
				onCancel: () => {
					setDialogOpen(false);
				},
				onConfirm: () => {
					setIsApproved(true);
					patch.execute([{ set: { approved: true } }]);
					props.onComplete();
				},
				message: "Vil du godkjenne denne forespørselen?"
			}
		};
	}
}
