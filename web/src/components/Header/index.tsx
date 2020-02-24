// @ts-nocheck

import React from "react";
import * as S from "./styles";
import whiteLogo from "../../assets/logo-white.svg";
import { useSanityStore } from "../../sanity/store";
import Navigation from "../Navigation";

const Header = () => {
	const store = useSanityStore();
	const data = store[0].configuration;

	return (
		<S.Header>
			<img src={whiteLogo} alt="Oslo Pride logo"></img>

			<div>
				<p className="date">{data.date}</p>
				<Navigation />
			</div>
		</S.Header>
	);
};

export default Header;
