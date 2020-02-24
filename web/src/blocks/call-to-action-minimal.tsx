import React from "react";
import { SanityCallToActionMinimal } from "../sanity/models";

type Props = {
	content: SanityCallToActionMinimal;
};

const CallToActionMinimal: React.FC<Props> = props => {
	const { content } = props;

	return (
		<article>
			<header>
				<h2>{content.title}</h2>
				<h3>{content.headline}</h3>
			</header>
			<a href={content.button?.url}>{content.button?.text}</a>
		</article>
	);
};

export default CallToActionMinimal;
