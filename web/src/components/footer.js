import React from "react";
import { usePageContext } from "../hooks/page-context";

export default function Footer() {
	const {
		configuration: { footer }
	} = usePageContext();

	console.log(footer);
	return (
		<>
			<footer>Footer</footer>
		</>
	);
}
