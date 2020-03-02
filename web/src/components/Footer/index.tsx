import React from "react";
import { SanityConfiguration } from "../../sanity/models";
import * as S from "./styles";
import WhiteLogo from "../../assets/logo-white.svg";

type Props = {
	footer: SanityConfiguration["footer"];
	date: SanityConfiguration["date"];
};

const Footer: React.FC<Props> = props => {
	const { footer, date } = props;

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
					<a href="https://w2.brreg.no/enhet/sok/detalj.jsp?orgnr=986625860">
						Org.nr: 986 625 860
					</a>
					<a href="tel:91544090">Tlf: 915 44 090</a>
				</S.Info>

				<S.Shortcuts>
					<h3>Snarveier</h3>
					{footer?.links && footer.links.length > 0 && (
						<ul>
							{footer.links.map(link => (
								<li key={link._key}>
									<a href={link.url}>{link.text}</a>
								</li>
							))}
						</ul>
					)}
				</S.Shortcuts>
			</S.Footer>
		</S.StickyFooter>
	);
};

export default Footer;
