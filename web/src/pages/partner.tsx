import React from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { RouteComponentProps } from "@reach/router";
import useSWR from "swr";
import { SanityPartner, SanityFrontPage } from "../sanity/models";
import Loading from "../components/loading";
import NotFound from "./not-found";
import Error from "./error";
import Hero from "../components/hero";
import theme from "../utils/theme";
import { urlFor } from "../sanity";
import { ClientError, ServerError } from "@sanity/client";
import FeaturedArticles from "../blocks/featured-articles";
import BlockContentToReact from "@sanity/block-content-to-react";

type Props = { slug?: string } & RouteComponentProps;

const hero = css`
	text-align: center;

	h2 {
		margin: 0 0 2rem 0;
	}

	p {
		margin: 0;
	}
`;

const body = css`
	display: block;
	margin: 100px auto;
	width: 90vw;
	max-width: 900px;

	p {
		a {
			color: ${theme.color.main.pink};
		}
	}

	h3 {
		margin: 0;
		font-size: 1.75rem;
	}
`;

const ImgWrap = styled.div`
	img {
		width: 13rem;
		height: 13rem;
		object-fit: contain;
		object-position: 50% 50%;
	}
`;

const Partner: React.FC<Props> = props => {
	const { data: partner, error } = useSWR<SanityPartner>(
		`*[_type == "partner" && type !="Supporter" && slug.current == "${props.slug}"] {
      _id,
      image,
      name,
      url,
      description,
      type,
    }[0]`
	);

	const { data } = useSWR<SanityFrontPage, ClientError | ServerError>(
		`*[_id in ["global_frontPage", "drafts.global_frontPage"]] | order(_updatedAt desc) [0]
		{
		featuredArticles[]->{image, slug, title, _createdAt},
		}`
	);
	if (error) return <Error error={JSON.stringify(error)} />;
	if (partner === undefined || data === undefined) return <Loading />;
	if (partner === null || data === null) return <NotFound />;

	const getPartnerLabel = (partnerType: string) => {
		switch (partnerType) {
			case "main":
				return "Hovedpartner";
			case "owner":
				return "Eier og arrangør";
			case "regular":
				return "Partner";
			default:
				return "";
		}
	};

	return (
		<>
			<Hero
				color={[theme.color.main.purple]}
				imageUrl={
					urlFor(partner.image)
						.width(window.innerWidth)
						.url() || ""
				}
				css={hero}
				centerContent
				displayScrollButton
			>
				<p
					css={css`
						color: #f7acb3;
						text-transform: uppercase;
						font-weight: bold;
						letter-spacing: 0.15rem;
					`}
				>
					{getPartnerLabel(partner.type)}
				</p>
				<h2>{partner.name}</h2>
			</Hero>
			<div css={body}>
				<div
					css={css`
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						align-items: flex-start;
						margin: 10rem 1rem;
					`}
				>
					<div
						css={css`
							display: flex;
							flex-direction: column;
							width: 25rem;
						`}
					>
						<h2
							css={css`
								margin: 0;
							`}
						>
							{partner.name}
						</h2>
						<BlockContentToReact blocks={partner.description} />
					</div>
					<ImgWrap>
						<img
							src={
								urlFor(partner.image)
									.width(window.innerWidth)
									.url() || ""
							}
							alt=""
						/>
					</ImgWrap>
				</div>

				{data.featuredArticles && (
					<FeaturedArticles content={data.featuredArticles} />
				)}
			</div>
		</>
	);
};

export default Partner;
