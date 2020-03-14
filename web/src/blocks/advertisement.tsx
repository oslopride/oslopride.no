import React from "react";
import { SanityAdvertisement } from "../sanity/models";
import { urlFor } from "../sanity";
import BlockContentToReact from "@sanity/block-content-to-react";
import Link from "../components/link";

type Props = {
	content: SanityAdvertisement;
};

const Advertisement: React.FC<Props> = props => {
	const { content } = props;

	return (
		<article>
			<header>
				<div>{content.category}</div>
				<h2>{content.title}</h2>
				<BlockContentToReact blocks={content.content} />
				<ul>
					{content.links?.map(link => (
						<li key={link._key}>
							<Link link={link} />
						</li>
					))}
				</ul>
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

export default Advertisement;
