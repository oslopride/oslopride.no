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

const articleBackDrop = () => css`
	margin: 7vw 0;

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
	display: flex;
	justify-content: space-between;

	@media (max-width: 600px) {
		flex-flow: column-reverse wrap;
	}

	padding: 3vw 7vw;

	aside {
		@media (min-width: 600px) {
			width: 50vw;
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
	@media (min-width: 600px) {
		width: 50vw;
	}

	h2 {
		font-size: calc(1rem + 1.7vw);
		margin: 2rem 0;

		@media (min-width: 600px) {
			max-width: 40vw;
		}
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
		<article css={articleBackDrop()}>
			<header css={headerStyle()}>
				<SubHeading>{content.category}</SubHeading>
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
						src={
							urlFor(content.image)
								.width(500)
								.height(400)
								.url() || undefined
						}
					/>
				</aside>
			)}
		</article>
	);
};

export default Advertisement;
