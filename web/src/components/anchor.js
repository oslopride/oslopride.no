import React from "react";
import Link from "./link";

export default function Anchor({ _type, text, url }) {
	switch (_type) {
		case "externalLink":
			return (
				<a href={url} target="_blank" rel="noopener noreferrer">
					{text}
				</a>
			);
		case "internalLink":
			return <Link to={`/${url.slug.current || "404"}`}>{text}</Link>;
	}
}
