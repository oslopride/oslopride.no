// @ts-nocheck

import React from "react";
import * as S from "./styles";
import { useSanityStore } from "../../sanity/store";
import whiteLogo from "../../assets/logo-white.svg";
import { size } from "polished";

const Footer = () => {
	const store = useSanityStore();
	const data = store[0].configuration;

	return (
		<S.StickyFooter>
			<S.Footer>
				<S.Image>
					<img src={whiteLogo} alt="Oslo Pride logo" />
					<h3>{data.date}</h3>
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
					{data.footer.links.map((link, i) => {
						return (
							<a href={link.url} key={i}>
								{link.text}
							</a>
						);
					})}
				</S.Shortcuts>
			</S.Footer>
		</S.StickyFooter>
	);
};

export default Footer;
