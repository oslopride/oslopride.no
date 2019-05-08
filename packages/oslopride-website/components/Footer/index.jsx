import theme from "@/utils/theme";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Footer = () => (
  <Wrapper>
    <Container>
      <LinkWrapper>
        <Link href="/about" passHref>
          <FooterLink>om oss</FooterLink>
        </Link>
        <Link href="/contact" passHref>
          <FooterLink>kontakt</FooterLink>
        </Link>
        <FooterLink href="https://www.facebook.com/oslopride/">
          facebook
        </FooterLink>
        <FooterLink href="https://www.instagram.com/oslopride/">
          instagram
        </FooterLink>
        <Link href="/p/press" passHref>
          <FooterLink>for pressen</FooterLink>
        </Link>
        <Link href="/press-releases" passHref>
          <FooterLink>pressemeldinger</FooterLink>
        </Link>
        <Link href="/p/cookie-policy" passHref>
          <FooterLink>cookie policy</FooterLink>
        </Link>
      </LinkWrapper>
      <OrgInfo>
        <h3>OSLO PRIDE AS</h3>
        <OrgInfoSection>
          c/o Foreningen FRI
          <br />
          Tollbugata 24
          <br />
          0157 OSLO
        </OrgInfoSection>
        <OrgInfoSection>
          <TlfOrgNrLink href="tel:915 44 090">Tlf: 915 44 090</TlfOrgNrLink>
        </OrgInfoSection>
        <OrgInfoSection>
          <TlfOrgNrLink href="https://w2.brreg.no/enhet/sok/detalj.jsp?orgnr=986625860">
            Org.nr: 986 625 860
          </TlfOrgNrLink>
        </OrgInfoSection>
      </OrgInfo>
    </Container>
  </Wrapper>
);

export default Footer;

const Wrapper = styled.footer`
  background-color: ${theme.blue};
  color: white;
  width: 100%;
`;

const Container = styled.div`
  max-width: 1000px;
  min-height: 310px;
  margin: 0 auto 20px auto;
  display: flex;
  flex-direction: column;
`;

const OrgInfo = styled.div`
  margin: 20px 20px 0 20px;
  flex-grow: 1;
  text-align: right;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const OrgInfoSection = styled.p`
  margin-top: 0;
`;

const LinkWrapper = styled.div`
  margin: 20px 20px 0 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const FooterLink = styled.a`
  color: inherit;
  text-decoration: none;
  margin-top: 10px;

  :not(:last-child) {
    margin-right: 5px;

    ::after {
      content: " ●";
    }
  }

  :hover,
  :focus {
    text-decoration: underline;
  }
`;

const TlfOrgNrLink = styled.a`
  color: inherit;
  text-decoration: none;

  :hover,
  :focus {
    text-decoration: underline;
  }
`;
