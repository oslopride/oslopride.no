import { foldWebResponse, mapWebResponse } from "@/store/helpers";
import theme from "@/utils/theme";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Footer = ({ footerLinks }) => {
  const links = foldWebResponse(footerLinks, {
    initial: () => <p>Laster...</p>,
    request: () => <p>Laster...</p>,
    error: () => null,
    success: data =>
      data.map(({ name, url }) => (
        <FooterLink key={`${url}_${name}`} href={url}>
          {name}
        </FooterLink>
      ))
  });

  return (
    <Wrapper>
      <Container>
        <LinkWrapper>{links}</LinkWrapper>
        <OrgInfo>
          <OrgHeader>OSLO PRIDE AS</OrgHeader>
          <OrgInfoSection>
            c/o Foreningen FRI, Tollbugata 24 0157 OSLO
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

        <AppStoreLinks>
          <a href="https://apps.apple.com/no/app/oslo-pride/id1466382885?l=nb">
            <AppLogo
              src="/static/app_store_black.svg"
              alt="Last ned i iOS App Store"
            />
          </a>
        </AppStoreLinks>
      </Container>
    </Wrapper>
  );
};

const mapStateToProps = state => ({
  footerLinks: mapWebResponse(state.config, ({ footerLinks }) => footerLinks)
});

export default connect(mapStateToProps)(Footer);

const Wrapper = styled.footer`
  background-color: ${theme.blue};
  color: white;
  width: 100%;
  padding: 20px;
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const AppStoreLinks = styled.div`
  margin-top: 40px;
  text-align: center;
`;

const OrgInfo = styled.div`
  margin-top: 40px;
  text-align: center;
`;

const OrgHeader = styled.h3`
  margin-bottom: 10px;
  font-size: 1rem;
`;

const OrgInfoSection = styled.p`
  margin: 0 0 5px 0;
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 1.1rem;
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

const AppLogo = styled.img`
  display: none;
  width: auto;
  display: inline-block;
`;
