import React, { FC } from "react";
import BlockContentToReact from "@sanity/block-content-to-react";
import { urlFor } from "../sanity";
import { SanityPartnerList } from "../sanity/models";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import Link from "../components/link";
import theme from "../utils/theme";

type Props = {
	content: SanityPartnerList;
};

const MainPartnerContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin: 1rem 0;
	align-items: center;

	&:after {
		content: "";
		width: 100%;
		margin: 2rem 3.5rem;
		height: 1px;
		background-color: ${theme.color.text.grey};

		@media (max-width: 599px) {
			margin: 2rem 0;
		}
	}

	img {
		margin: 1rem;
		width: 200px;
		height: 200px;
		object-fit: contain;
		object-position: 50% 50%;
	}
`;

const MainPartnerFlex = styled.div`
	display: flex;
	flex-direction: row;
	margin: 2rem 3.5rem;
	align-items: center;

	@media (max-width: 599px) {
		flex-direction: column;
		align-items: flex-start;
		margin: 1rem 0;
	}
`;

const RegularPartnerContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	margin: -2rem 2.5rem;

	& > div {
		flex-basis: 50%;
	}

	@media (max-width: 599px) {
		margin: 0;
	}

	&:after {
		content: "";
		width: 100%;
		margin: 5rem 0;
		height: 1px;
		background-color: ${theme.color.text.grey};

		@media (max-width: 599px) {
			margin: 2rem 0;
		}
	}
`;

const RegularPartnerFlex = styled.div`
	display: flex;
	flex-direction: column;
	padding: 3rem 1rem;

	@media (max-width: 599px) {
		align-items: flex-start;
		margin: 1rem 0;
		padding: 0;
	}
`;

const ImgWrapMain = styled.div`
	margin: 1rem auto;

	@media (min-width: 600px) {
		margin: 1rem 2rem 1rem 0;
	}

	img {
		width: 200px;
		height: 200px;
		object-fit: contain;
		object-position: 50% 50%;
	}
`;

const ImgWrapRegular = styled.div`
	width: 100%;
	height: 11rem;
	margin-bottom: 1.5rem;

	img {
		display: block;
		margin: 0 auto;
		height: 100%;
		width: auto;
		object-fit: contain;
	}
`;

const ContentWrap = styled.div`
	h2 {
		font-size: 1.75rem;
		margin-top: 1rem;
		margin-bottom: 1.5rem;
	}

	h3 {
		font-size: 0.75rem;
		letter-spacing: 2px;
		text-transform: uppercase;
		color: ${theme.color.main.purple};
	}

	a {
		font-size: 1.1rem;
		font-weight: bold;
		color: ${theme.color.main.purple};
	}
`;

const groupHeader = css`
	font-size: 2rem;
	text-align: center;
	margin-bottom: 3rem;

	@media (min-width: 600px) {
	}
`;

const AlliedWrap = styled.div`
	margin-top: 5rem;
`;

const PartnerList: FC<Props> = ({ content }) => {
	return (
		<>
			<MainPartnerContainer>
				{content
					.filter(p => p.type === "owner")
					.map(partner => (
						<MainPartnerFlex key={partner._id}>
							<ImgWrapMain>
								<img
									src={
										urlFor(partner.image)
											.width(200)
											.url() || undefined
									}
									alt={`${partner.name} logo`}
								/>
							</ImgWrapMain>
							<ContentWrap>
								<h3>Eier og arrangør</h3>
								<h2>{partner.name}</h2>
								<BlockContentToReact blocks={partner.description} />
								{partner.slug && (
									<Link
										link={{
											_type: "internalInternalLink",
											url: `/partner/${partner.slug.current}`,
											text: `Les mer om ${partner.name} »`
										}}
									/>
								)}
							</ContentWrap>
						</MainPartnerFlex>
					))}

				{content
					.filter(p => p.type === "main")
					.map(partner => (
						<MainPartnerFlex key={partner._id}>
							<ImgWrapMain>
								<img
									src={
										urlFor(partner.image)
											.width(200)
											.url() || undefined
									}
									alt={`${partner.name} logo`}
								/>
							</ImgWrapMain>
							<ContentWrap>
								<h3>Hovedpartner</h3>
								<h2>{partner.name}</h2>
								<BlockContentToReact blocks={partner.description} />
								{partner.slug && (
									<Link
										link={{
											_type: "internalInternalLink",
											url: `/partner/${partner.slug.current}`,
											text: `Les mer om ${partner.name} »`
										}}
									/>
								)}
							</ContentWrap>
						</MainPartnerFlex>
					))}
			</MainPartnerContainer>

			<RegularPartnerContainer>
				{content
					.filter(p => p.type === "regular")
					.map(partner => (
						<RegularPartnerFlex key={partner._id}>
							<ImgWrapRegular>
								<img
									src={
										urlFor(partner.image)
											.width(200)
											.url() || undefined
									}
									alt={`${partner.name} logo`}
								/>
							</ImgWrapRegular>
							<ContentWrap>
								<h3>Partner</h3>
								<h2>{partner.name}</h2>
								{partner.slug && (
									<Link
										link={{
											_type: "internalInternalLink",
											url: `/partner/${partner.slug.current}`,
											text: `Les mer om ${partner.name} »`
										}}
									/>
								)}
							</ContentWrap>
						</RegularPartnerFlex>
					))}
			</RegularPartnerContainer>

			<h2 css={groupHeader}>Støttespillere</h2>
			<RegularPartnerContainer>
				{content
					.filter(p => p.type === "supporter")
					.map(partner => (
						<RegularPartnerFlex key={partner._id}>
							<ImgWrapRegular>
								<img
									src={
										urlFor(partner.image)
											.width(200)
											.url() || undefined
									}
									alt={`${partner.name} logo`}
								/>
							</ImgWrapRegular>
						</RegularPartnerFlex>
					))}
			</RegularPartnerContainer>

			{content.filter(p => p.type === "allied").length > 0 && (
				<AlliedWrap>
					<h2 css={groupHeader}>Allierte</h2>
					<MainPartnerContainer>
						{content
							.filter(p => p.type === "allied")
							.map(partner => (
								<img
									key={partner._id}
									src={
										urlFor(partner.image)
											.width(200)
											.url() || undefined
									}
									alt={`${partner.name} logo`}
								/>
							))}
					</MainPartnerContainer>
				</AlliedWrap>
			)}
		</>
	);
};

export default PartnerList;
