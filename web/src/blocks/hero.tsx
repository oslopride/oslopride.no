import React from "react";
import { SanityHero } from "../sanity/models";
import { urlFor } from "../sanity";
import Link from "../components/Link";

type Props = {
	content: SanityHero;
};

const Hero: React.FC<Props> = props => {
	const { content } = props;

	return (
		<article>
			{content.image && (
				<img
					src={
						urlFor(content.image)
							.width(400)
							.url() || undefined
					}
				/>
			)}
			<h2>{content.title}</h2>
			<p>{content.subtitle}</p>
			{content.links && content.links.length > 0 && (
				<ul>
					{content.links.map(link => (
						<li key={link._key}>
							<Link link={link} />
						</li>
					))}
				</ul>
			)}
		</article>
	);
};

export default Hero;
