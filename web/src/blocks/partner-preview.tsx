import React from "react";
import { css } from "@emotion/core";

import { urlFor } from "../sanity";
import { SanityPartner, Locale } from "../sanity/models";
import SubHeading from "../components/sub-heading";
import theme from "../utils/theme";

const container = css`
	padding: min(10vw, 100px) 7vw;
	margin-top: 135px;
	background-color: ${theme.color.background.lightPurple};

	h3 {
		font-size: 2.34rem;
	}
`;

const logo = css`
	max-height: 120px;
	max-width: 220px;
`;

const partnerContainer = css`
	display: flex;
	flex-direction: row;
	list-style: none;
	flex-wrap: wrap;
	padding: 0;

	li:not(:last-child) {
		margin-right: 40px;
	}
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

export type DereferencedSanityPartner = Omit<SanityPartner, "type"> & {
	type: { name: Locale<string>; ordinal: number };
};

type PartnerGroupProps = {
	name: string;
	partners: Pick<SanityPartner, "image" | "name" | "url">[];
};

const PartnerGroup: React.FC<PartnerGroupProps> = ({ name, partners }) => (
	<li css={groupItem}>
		<h4>{name}</h4>
		<ul css={partnerContainer}>
			{partners.map(partner => (
				<li key={partner.name}>
					<a
						href={partner.url}
						css={css`
							text-align: center;
						`}
					>
						<img
							css={logo}
							src={
								urlFor(partner.image)
									.width(300)
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
	content: DereferencedSanityPartner[];
};

const PartnerPreview: React.FC<PartnerPreviewProps> = ({ content }) => {
	const groupedPartners = content.reduce<Record<number, PartnerGroupProps>>(
		(groups, partner) => {
			const existingGroup = groups[partner.type.ordinal];
			if (existingGroup) {
				existingGroup.partners.push(partner);
			} else {
				groups[partner.type.ordinal] = {
					name: partner.type.name.no,
					partners: [partner]
				};
			}
			return groups;
		},
		{}
	);

	return (
		<section css={container}>
			<SubHeading line="left">Støtte og sponsor</SubHeading>
			<h3>Våre partnere</h3>
			<ul css={groupContainer}>
				{Object.values(groupedPartners).map(group => (
					<PartnerGroup
						key={group.name}
						name={group.name}
						partners={group.partners}
					/>
				))}
			</ul>
		</section>
	);
};

export default PartnerPreview;
