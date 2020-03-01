import React from "react";
import { SanityAnnouncement } from "../sanity/models";

type Props = {
	content: SanityAnnouncement;
};

const Announcement: React.FC<Props> = props => {
	const { content } = props;

	let href: string | undefined;

	if (content.link) {
		if (content.link._type === "externalLink") {
			href = content.link.url;
		} else if (content.link.url._type === "frontPage") {
			href = "/";
		} else {
			href = content.link.url.slug.current;
		}
	}

	return (
		<article>
			<header>
				<h2>{content.category}</h2>
				<h3>{content.title}</h3>
			</header>
			{content.link && <a href={href}>{content.link.text}</a>}
		</article>
	);
};

export default Announcement;
