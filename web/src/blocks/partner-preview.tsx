import React, { useMemo } from "react";
import { css } from "@emotion/core";
import useSWR from "swr";

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

type DereferencedSanityPartner = SanityPartner & { type: Locale<string> };

type Props = {
	content: SanityPartnerPreview;
};

const PartnerPreview: React.FC<Props> = ({
	content: { partners, heading, subHeading }
}) => {
	const refList = partners.map(ref => ref._ref);
	const { data } = useSWR<DereferencedSanityPartner[]>(
		`*[_id in ${JSON.stringify(refList)}]{..., "type": type->name}`
	);

	// sanity query does not return documents in same order as reference array
	const orderedPartners = useMemo(() => {
		return data ? refList.map(ref => data.find(doc => doc._id === ref)) : [];
	}, [data]);

	return (
		<section>
			<SubHeading line="left">{heading}</SubHeading>
			<h3>{subHeading}</h3>
			<ul css={container}>
				{orderedPartners.map(
					partner =>
						partner && (
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
								<span css={partnerType}>{partner.type.no}</span>
							</li>
						)
				)}
			</ul>
		</section>
	);
};

export default PartnerPreview;
