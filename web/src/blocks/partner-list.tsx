import React, { FC } from "react";
import BlockContentToReact from "@sanity/block-content-to-react";
import { urlFor } from "../sanity";
import { SanityPartnerList } from "../sanity/models";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

type Props = {
	content: SanityPartnerList;
};

const PartnerFlexBox = css`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	margin: 2rem 0;
	align-items: center;

	img {
		margin: 1rem;
		width: 200px;
		height: 200px;
		object-fit: contain;
		object-position: 50% 50%;
	}
`;

const FlexBox = styled.div`
	display: flex;
	flex-direction: row;
	margin: 2rem 0;
	align-items: center;
	@media (max-width: 599px) {
		flex-direction: column;
		align-items: flex-start;
		margin: 1rem 0;
	}
`;

const ImgWrap = styled.div`
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

const ContentWrap = styled.div`
	padding-bottom: 2rem;
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
			<div>
				<h2 css={groupHeader}>Eier og arrangør</h2>
				<div css={PartnerFlexBox}>
					{content
						.filter(p => p.type === "owner")
						.map(partner => (
							<FlexBox key={partner._id}>
								<ImgWrap>
									<img
										src={
											urlFor(partner.image)
												.width(200)
												.url() || undefined
										}
										alt={`${partner.name} logo`}
									/>
								</ImgWrap>
								<ContentWrap>
									<h2>{partner.name}</h2>
									<BlockContentToReact blocks={partner.description} />
								</ContentWrap>
							</FlexBox>
						))}
				</div>
			</div>
			<div>
				<h2 css={groupHeader}>Hovedpartnere</h2>
				<div css={PartnerFlexBox}>
					{content
						.filter(p => p.type === "main")
						.map(partner => (
							<FlexBox key={partner._id}>
								<ImgWrap>
									<img
										src={
											urlFor(partner.image)
												.width(200)
												.url() || undefined
										}
										alt={`${partner.name} logo`}
									/>
								</ImgWrap>
								<ContentWrap>
									<h2>{partner.name}</h2>
									<BlockContentToReact blocks={partner.description} />
								</ContentWrap>
							</FlexBox>
						))}
				</div>
			</div>
			<div>
				<h2 css={groupHeader}>Partnere</h2>
				<div css={PartnerFlexBox}>
					{content
						.filter(p => p.type === "regular")
						.map(partner => (
							<FlexBox key={partner._id}>
								<ImgWrap>
									<img
										src={
											urlFor(partner.image)
												.width(200)
												.url() || undefined
										}
										alt={`${partner.name} logo`}
									/>
								</ImgWrap>
								<ContentWrap>
									<h2>{partner.name}</h2>
									<BlockContentToReact blocks={partner.description} />
								</ContentWrap>
							</FlexBox>
						))}
				</div>
			</div>
			<div>
				<h2 css={groupHeader}>Støttespillere</h2>
				<div css={PartnerFlexBox}>
					{content
						.filter(p => p.type === "supporter")
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
				</div>
			</div>
			<AlliedWrap>
				<h2 css={groupHeader}>Allierte</h2>
				<div css={PartnerFlexBox}>
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
				</div>
			</AlliedWrap>
		</>
	);
};

export default PartnerList;
