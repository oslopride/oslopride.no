import React, { ReactNode } from "react";
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import * as S from "./styles";
import WhiteLogo from "../../assets/logo-white.svg";
import Tilgjengelighet from "../../assets/tilgjengelighetsmerket.svg";
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

const someIcons = css`
	display: inline-flex;
	gap: 0.5em;
	margin: 0;

	a {
		background-color: ${theme.color.background.pink};
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 1.4em;
		width: 1.4em;
		font-size: 0.9em;
		color: ${theme.color.main.purple};
		&:hover,
		&:focus {
			color: ${theme.color.main.purple};
		}
	}
`;

type Props = {};

const Footer: React.FC<Props> = () => {
	const { footer, date } = useConfig();

	const socialLinks: Array<{ name: string; url: string; icon: ReactNode }> = [];

	if (footer?.instagram) {
		socialLinks.push({
			name: "Instagram",
			url: footer.instagram,
			icon: <FaInstagram />
		});
	}
	if (footer?.facebook) {
		socialLinks.push({
			name: "Facebook",
			url: footer.facebook,
			icon: <FaFacebookSquare />
		});
	}

	return (
		<S.StickyFooter>
			<S.Footer>
				<div>
					<S.Image>
						<img src={`${WhiteLogo}`} alt="Oslo Pride logo" />
						<h3>{date}</h3>
						{socialLinks.length > 0 && (
							<ul css={someIcons}>
								{socialLinks.map(link => (
									<li key={link.name}>
										<a href={link.url} aria-label={`${link.name} icon`}>
											{link.icon}
										</a>
									</li>
								))}
							</ul>
						)}
					</S.Image>
					<a href="https://www.tilgjengelighetsmerket.no/">
						<img src={`${Tilgjengelighet}`} alt="Tilgjengelighetsmerket" />
					</a>
				</div>

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
