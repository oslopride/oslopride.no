import React, { FC } from "react";
import useSWR from "swr";
import sanity, { urlFor } from "../sanity";
import { SanityPartnerList } from "../sanity/models";
import styled from "@emotion/styled";

type Props = {
	content: SanityPartnerList;
};

const PartnerList: FC<Props> = ({ content }) => {
	console.log("content", content);
	const refList = content.partnerList.map(ref => ref._ref);
	const { data } = useSWR<SanityPartnerList>(
		`*[_id in ${JSON.stringify(refList)}]`,
		query => sanity.fetch(query)
	);

	console.log("data", data);

	return (
		<Wrapper>
			<h1>{content.title}</h1>
			{data &&
				data.map(el => (
					<FlexBox key={el._id}>
						<ImgWrap>
							<img
								src={
									urlFor(el.image.asset._ref)
										.width(200)
										.url() || undefined
								}
							/>
						</ImgWrap>
						<ContentWrap>
							<h2>{el.name}</h2>
							<span>description</span>
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
	display: flex;
	flex-flow: row wrap;
`;

const ImgWrap = styled.div`
	margin-right: 2rem;
`;

const ContentWrap = styled.div`
	padding-bottom: 2rem;
`;
