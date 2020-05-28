import React, { useMemo } from "react";
import { css } from "@emotion/core";

import { urlFor } from "../sanity";
import { SanityPartnerPreview, SanityPartner, Locale } from "../sanity/models";
import SubHeading from "../components/sub-heading";

const container = css`
	padding: 0;
	display: flex;
	flex-wrap: wrap;
	@media (max-width: 600px) {
		justify-content: space-between;
	}
`;

const logo = css`
	margin-bottom: 1.3em;
	max-height: 150px;
	max-width: 300px;
	@media (min-width: 600px) {
		max-height: 125px;
		max-width: 250px;
	}
`;

const partnerItem = css`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin: 1em;
	@media (min-width: 600px) {
		margin: 2em;
	}
`;

const partnerType = css`
	font-size: 0.9rem;
	text-transform: uppercase;
	text-align: center;
	font-weight: 400;
`;

export type DereferencedSanityPartner = Omit<SanityPartner, "type"> & {
	type: { name: Locale<string>; ordinal: number };
};

type PartnerGroupProps = {
	name: string;
	partners: Pick<SanityPartner, "image" | "name" | "url">[];
};

const PartnerGroup: React.FC<PartnerGroupProps> = ({ name, partners }) => (
	<ul>
		{partners.map(partner => (
			<li key={partner.name} css={partnerItem}>
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
				<span css={partnerType}>{partner.name}</span>
			</li>
		))}
	</ul>
);

type PartnerPreviewProps = {
	content: DereferencedSanityPartner[];
};

const PartnerPreview: React.FC<PartnerPreviewProps> = ({ content }) => {
	console.log(content);
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

	console.log(groupedPartners);

	return (
		<section>
			<SubHeading line="left">Støtte og sponsor</SubHeading>
			<h3>Våre partnere</h3>
			<ul css={container}>
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
