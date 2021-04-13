import React from "react";
import { css } from "@emotion/core";

import { urlFor } from "../sanity";
import { SanityPartner } from "../sanity/models";
import SubHeading from "../components/sub-heading";
import theme from "../utils/theme";

const container = css`
	padding: min(10vw, 100px) 7vw min(10vw, 40px) 7vw;
	margin-top: 135px;
	background-color: ${theme.color.background.lightPurple};

	h3 {
		font-size: 2.34rem;
	}
`;

const logo = css`
	display: block;
	height: 150px;
	width: 150px;
	object-fit: contain;
	object-position: 50% 50%;
`;

const partnerContainer = css`
	display: flex;
	flex-direction: row;
	list-style: none;
	flex-wrap: wrap;
	padding: 0;
	width: 100%;

	li:not(:last-child) {
		margin-right: 1rem;
	}

	justify-content: space-evenly;
	@media (min-width: 600px) {
		justify-content: flex-start;
	}
`;

const partnerItem = css`
	margin-bottom: 1rem;
`;

const groupContainer = css`
	display: flex;
	list-style: none;
	margin: 0;
	padding: 0;
	flex-direction: column;
`;

const groupItem = css`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 30px 0;

	&:not(:last-child) {
		border-bottom: 1px solid ${theme.color.text.grey};
	}

	h4 {
		margin-top: 0;
		text-transform: uppercase;
		font-size: 0.9rem;
		letter-spacing: 0.05rem;
		flex-shrink: 0;
	}

	@media (min-width: 600px) {
		flex-direction: row;
		align-items: center;

		h4 {
			width: 230px;
			margin-bottom: 0;
		}
	}
`;

type PartnerGroupProps = {
	name: string;
	partners: Pick<SanityPartner, "image" | "name" | "url">[];
};

const PartnerGroup: React.FC<PartnerGroupProps> = ({ name, partners }) => (
	<li css={groupItem}>
		<h4>{name}</h4>
		<ul css={partnerContainer}>
			{partners.map(partner => (
				<li css={partnerItem} key={partner.name}>
					<a href={partner.url}>
						<img
							css={logo}
							alt={name}
							src={
								urlFor(partner.image)
									.width(200)
									.url() || undefined
							}
						/>
					</a>
				</li>
			))}
		</ul>
	</li>
);

type PartnerPreviewProps = {
	content: SanityPartner[];
};

const PartnerPreview: React.FC<PartnerPreviewProps> = ({ content }) => {
	return (
		<section css={container}>
			<SubHeading>Våre partnere</SubHeading>
			<ul css={groupContainer}>
				<PartnerGroup
					name="Eier og arrangør"
					partners={content.filter(p => p.type === "owner")}
				/>
				<PartnerGroup
					name="Hovedpartnere"
					partners={content.filter(p => p.type === "main")}
				/>
				<PartnerGroup
					name="Partnere"
					partners={content.filter(p => p.type === "regular")}
				/>
				<PartnerGroup
					name="Støttespillere"
					partners={content.filter(p => p.type === "supporter")}
				/>
			</ul>
		</section>
	);
};

export default PartnerPreview;
