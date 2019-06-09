import Link from "@/components/Link";
import React from "react";
import styled from "styled-components";

const DateTitleColors = [
  "#CD424D",
  "#D17A61",
  "#D5A43E",
  "#25A081",
  "#93ADC3",
  "#625887"
];

const FeaturedDates = ({ dates }) => {
  return (
    <>
      <DatesWrapper>
        {dates.map(
          ({ _key: key, date, title, description, subtitle, link }, index) => (
            <DateWrapper href={link} key={key}>
              <DateTime>{date}</DateTime>
              <div>
                <DateTitle
                  color={DateTitleColors[index % DateTitleColors.length]}
                >
                  {title}
                </DateTitle>
                <DateDescription>{description}</DateDescription>
                <DateSubtitle
                  color={DateTitleColors[index % DateTitleColors.length]}
                >
                  {subtitle}
                </DateSubtitle>
              </div>
            </DateWrapper>
          )
        )}
      </DatesWrapper>
      <ProgramLinkWrapper>
        <ProgramLink href="/events">Se hele festivalprogrammet</ProgramLink>
      </ProgramLinkWrapper>
    </>
  );
};

export default FeaturedDates;

const ProgramLinkWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ProgramLink = styled(Link)`
  font-size: 20px;
`;

const DatesWrapper = styled.div`
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const DateWrapper = styled.a`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: initial;
  transition: transform 0.2s ease-in-out;
  padding: 10px;
  margin-bottom: 20px;
  line-height: 1.7;

  :hover,
    :focus {
      transform: scale(1.05);
    }
  }

  @media (min-width: 500px) {
    flex-direction: row;
  }

  @media (min-width: 620px) {
    flex-direction: column;
    :nth-of-type(2n) {
      align-self: flex-end;
    }
  }

  @media (min-width: 800px) {
    flex-direction: row;
  }
`;

const DateTime = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const DateTitle = styled.h2`
  font-size: 40px;
  font-weight: bolder;
  line-height: 1em;
  margin: 0;
  text-transform: uppercase;
  color: ${props => props.color};
`;

const DateDescription = styled.p`
  font-size: 18px;
  margin: 0;
  max-width: 350px;
`;

const DateSubtitle = styled.p`
  font-size: 18px;
  font-weight: 600;
  margin: 0 auto;
  text-transform: uppercase;
  color: ${props => props.color};
`;
