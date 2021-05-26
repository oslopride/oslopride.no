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
import BlockContentToReact from "@sanity/block-content-to-react";
import { ReactComponent as FBSocialLink } from "../assets/facebook.svg";
import { ReactComponent as IGSocialLink } from "../assets/insta.svg";
import { ReactComponent as LinkedInSocialLink } from "../assets/linkedin.svg";
import SanityPortableText from "../components/sanity-portable-text";

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
		font-size: 1.75rem;
	}

	h4 {
		font-size: 1.2rem;
	}
`;

const ImgWrap = styled.div`
	img {
		width: 13rem;
		height: 13rem;
		object-fit: contain;
		object-position: 50% 50%;
	}

	@media screen and (max-width: 800px) {
		margin-bottom: 2rem;
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
	  content,
      type,
	  facebookLink,
	  instagramLink,
	  linkedinLink
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
				imageUrl=""
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
				{!(partner.content && partner.content.length > 0) && (
					<div
						css={css`
							display: flex;
							flex-direction: row;
							justify-content: space-between;
							align-items: flex-start;

							h3 {
								margin: 0;
								font-size: 1.75rem;
							}

							@media screen and (max-width: 800px) {
								flex-direction: column-reverse;
								align-items: center;
								margin-top: 0;
							}
						`}
					>
						<div
							css={css`
								display: flex;
								flex-direction: column;
								width: 25rem;
								margin-right: 2rem;

								@media screen and (max-width: 800px) {
									text-align: center;
									margin-right: 0;
									width: auto;
								}
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
				)}
				{partner.content && <SanityPortableText blocks={partner.content} />}
				<div>
					{partner.facebookLink && (
						<a href={partner.facebookLink}>
							<FBSocialLink
								css={css`
									margin-right: 1rem;
								`}
							/>
						</a>
					)}
					{partner.instagramLink && (
						<a href={partner.instagramLink}>
							<IGSocialLink
								css={css`
									margin-right: 1rem;
								`}
							/>
						</a>
					)}
					{partner.linkedinLink && (
						<a href={partner.linkedinLink}>
							<LinkedInSocialLink
								css={css`
									margin-right: 1rem;
								`}
							/>
						</a>
					)}
				</div>
			</div>
		</>
	);
};

export default Partner;
