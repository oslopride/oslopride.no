import React, { FC } from "react";
import BlockContentToReact from "@sanity/block-content-to-react";
import { urlFor } from "../sanity";
import { DereferencedSanityPartner, SanityPartnerList } from "../sanity/models";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

type Props = {
	content: SanityPartnerList;
};

type PartnerGroupProps = {
	name: string;
	partners: DereferencedSanityPartner[];
};

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
	margin: 1rem 2rem 1rem 0;

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

const PartnerList: FC<Props> = ({ content }) => {
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
		<>
			{Object.values(groupedPartners).map(group => (
				<div key={group.name}>
					<h2 css={groupHeader}>{group.name}</h2>
					{group.partners &&
						group.partners.map(partner => (
							<FlexBox key={partner._id}>
								<ImgWrap>
									<img
										src={
											urlFor(partner.image)
												.width(200)
												.url() || undefined
										}
									/>
								</ImgWrap>
								<ContentWrap>
									<h2>{partner.name}</h2>
									<BlockContentToReact blocks={partner.description} />
								</ContentWrap>
							</FlexBox>
						))}
				</div>
			))}
		</>
	);
};

export default PartnerList;
