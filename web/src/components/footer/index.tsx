import React from "react";
import * as S from "./styles";
import WhiteLogo from "../../assets/logo-white.svg";
import useConfig from "../../utils/use-config";
import Link from "../link";
import { css } from "@emotion/core";
import theme from "../../utils/theme";

const netlifyLink = css`
	text-align: center;
	margin-bottom: 2rem;

	a {
		color: ${theme.color.background.pink};
	}
`;

type Props = {};

const Footer: React.FC<Props> = () => {
	const { footer, date } = useConfig();

	const socialLinks: { name: string; url: string }[] = [];
	if (footer?.facebook)
		socialLinks.push({ name: "Facebook", url: footer.facebook });
	if (footer?.instagram)
		socialLinks.push({ name: "Instagram", url: footer.instagram });
	if (footer?.twitter)
		socialLinks.push({ name: "Twitter", url: footer.twitter });

	return (
		<S.StickyFooter>
			<S.Footer>
				<S.Image>
					<img src={`${WhiteLogo}`} alt="Oslo Pride logo" />
					<h3>{date}</h3>

					{socialLinks.length > 0 && (
						<ul>
							{socialLinks.map(link => (
								<li key={link.name}>
									<a href={link.url}>{link.name}</a>
								</li>
							))}
						</ul>
					)}
				</S.Image>

				<S.Info>
					<h3>Oslo Pride as</h3>
					<p>c/o Foreningen FRI,</p>
					<p>Mariboes gate 13, 0183 OSLO</p>
					<p>
						Org.nr:{" "}
						<a href="https://w2.brreg.no/enhet/sok/detalj.jsp?orgnr=986625860">
							986 625 860
						</a>
					</p>
					<p>
						Tlf: <a href="tel:91544090">915 44 090</a>
					</p>
				</S.Info>

				<S.Shortcuts>
					<h3>Snarveier</h3>
					{footer?.links && footer.links.length > 0 && (
						<ul>
							{footer.links.map(link => (
								<li key={link._key}>
									<Link link={link} />
								</li>
							))}
						</ul>
					)}
				</S.Shortcuts>
			</S.Footer>
			<div css={netlifyLink}>
				<a href="https://www.netlify.com">
					<img
						src="https://www.netlify.com/img/global/badges/netlify-color-accent.svg"
						alt="Deploys by Netlify"
					/>
				</a>
			</div>
		</S.StickyFooter>
	);
};

export default Footer;
