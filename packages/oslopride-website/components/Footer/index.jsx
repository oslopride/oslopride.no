import theme from "@/utils/theme";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Footer = () => (
  <Wrapper>
    <Container>
      <LinkWrapper>
        <div>
          <Link href="/about" passHref>
            <FooterLinks>
              <h3>OM OSS</h3>
            </FooterLinks>
          </Link>
          <Link href="/contact" passHref>
            <FooterLinks>Kontakt</FooterLinks>
          </Link>
          <Link href="/partners" passHref>
            <FooterLinks>Partnere</FooterLinks>
          </Link>
        </div>
        <div>
          <FooterLinks href="https://www.facebook.com/oslopride/">
            <h3>FØLG OSS</h3>
          </FooterLinks>
          <FooterLinks href="https://www.facebook.com/oslopride/">
            Facebook
          </FooterLinks>
          <FooterLinks href="https://www.instagram.com/oslopride/">
            Instagram
          </FooterLinks>
        </div>
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
  flex-wrap: wrap;
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
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const FooterLinks = styled.a`
  color: inherit;
  text-decoration: none;
  display: flex;

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
