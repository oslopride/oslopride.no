import React from "react";
import { SanityAnnouncement } from "../sanity/models";
import Link from "../components/link";

type Props = {
	content: SanityAnnouncement;
};

const Announcement: React.FC<Props> = props => {
	const { content } = props;

	return (
		<article>
			<header>
				<h2>{content.category}</h2>
				<h3>{content.title}</h3>
			</header>
			{content.link && <Link link={content.link} />}
		</article>
	);
};

export default Announcement;
