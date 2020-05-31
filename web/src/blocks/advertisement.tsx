import React from "react";
import { css } from "@emotion/core";
import { SanityAdvertisement } from "../sanity/models";
import { urlFor } from "../sanity";
import BlockContentToReact from "@sanity/block-content-to-react";
import { LinkButton } from "../components/link";
import SubHeading from "../components/sub-heading";
import theme from "../utils/theme";

type Props = {
	content: SanityAdvertisement;
};

const advertisementStyle = () => css`
	margin: 7vw 0;
	padding: 4vw 7vw;
	display: flex;
	justify-content: space-between;
	flex-flow: row no-wrap;
	@media (max-width: 599px) {
		flex-flow: column-reverse wrap;
	}
	background: linear-gradient(
		0deg,
		${theme.color.background.pink} 80%,
		#fff 20%
	);
	@media (min-width: 600px) {
		background: linear-gradient(
			90deg,
			${theme.color.background.pink} 70%,
			#fff 30%
		);
	}

	aside {
		@media (min-width: 600px) {
			width: 50vw;
		}
		@media (min-width: 1200px) {
			max-height: 600px;
		}
		img {
			width: 100%;
			height: 100%;
			overflow: hidden;
			object-fit: cover;
		}
	}
`;

const headerStyle = () => css`
	margin: 4vw 0;
	padding: 1rem 0 0 0;
	@media (min-width: 600px) {
		padding: 0 10vw 0 0;
		width: 50vw;
	}

	h2 {
		font-size: 2.34rem;
		line-height: 2.9rem;
		margin: 1.5rem 0;
	}

	p {
		font-size: 1rem;
		margin: 0;
	}

	ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		margin: 1rem 0;
		padding: 0;

		@media (min-width: 600px) {
			flex-direction: row;

			li:not(:first-of-type) {
				margin-left: 1rem;
			}
		}

		li {
			display: inherit;
			margin-top: 1rem;
		}
	}
`;

const Advertisement: React.FC<Props> = props => {
	const { content } = props;

	return (
		<article css={advertisementStyle()}>
			<header css={headerStyle()}>
				<SubHeading line="left">{content.category}</SubHeading>
				<h2>{content.title}</h2>
				<BlockContentToReact blocks={content.content} />
				<ul>
					{content.links?.map((link, idx) => (
						<li key={link._key}>
							<LinkButton
								link={link}
								color={idx === 0 ? "pink" : "blue"}
								css={css`
									width: 100%;
								`}
							/>
						</li>
					))}
				</ul>
			</header>
			{content.image && (
				<aside>
					<img
						alt={content.title}
						src={
							urlFor(content.image)
								.width(1024)
								.height(768)
								.url() || undefined
						}
					/>
				</aside>
			)}
		</article>
	);
};

export default Advertisement;
