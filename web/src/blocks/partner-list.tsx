import React, { FC } from "react";
import useSWR from "swr";
import BlockContentToReact from "@sanity/block-content-to-react";
import sanity, { urlFor } from "../sanity";
import { SanityPartner, SanityPartnerList } from "../sanity/models";
import styled from "@emotion/styled";

type Props = {
	content: SanityPartnerList;
};

const PartnerList: FC<Props> = ({ content }) => {
	const refList = content.partnerList.map(ref => ref._ref);
	const { data } = useSWR<SanityPartner[]>(
		`*[_id in ${JSON.stringify(refList)}]`,
		query => sanity.fetch(query)
	);

	return (
		<Wrapper>
			<h1>{content.title}</h1>
			{data &&
				data.map(partner => (
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
		</Wrapper>
	);
};

export default PartnerList;

const Wrapper = styled.div`
	max-width: 900px;
	margin: 0 auto;
	padding: 15px;
	h1 {
		font-size: 32px;
		margin-bottom: 4rem;
	}
	h2 {
		margin-bottom: 10px;
	}
`;

const FlexBox = styled.div`
	@media (max-width: 425px) {
		display: flex;
		flex-direction: column;
	}
`;

const ImgWrap = styled.div`
	margin-right: 2rem;
`;

const ContentWrap = styled.div`
	padding-bottom: 2rem;
`;
