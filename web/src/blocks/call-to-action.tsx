import React from "react";
import { SanityCallToAction } from "../sanity/models";
import { urlFor } from "../sanity";

type Props = {
	content: SanityCallToAction;
};

const CallToAction: React.FC<Props> = props => {
	const { content } = props;

	return (
		<article>
			<header>
				<h2>{content.title}</h2>
				<h3>{content.headline}</h3>
				<h4>{content.subheadline}</h4>
				<a href={content.button?.url}>{content.button?.text}</a>
			</header>
			{content.image && (
				<img
					src={
						urlFor(content.image)
							.width(400)
							.url() || undefined
					}
				/>
			)}
		</article>
	);
};

export default CallToAction;
