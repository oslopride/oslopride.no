// @ts-nocheck

import React, { useState } from "react";
import { useSanityStore } from "../../sanity/store";
import * as S from "./styles";
import { Link } from "@reach/router";

const Navigation = () => {
	const [navigationVisible, showNavigation] = useState(false);
	const toggleNavigation = () => showNavigation(current => !current);
	const closeNavigation = () => showNavigation(false);
	const store = useSanityStore();
	const data = store[0].configuration;
	// TODO: get this from sanity store
	const locale = "no";

	const links = data.navigationBar.map(page => (
		<S.NavigationItem key={page.slug.current} onClick={closeNavigation}>
			<Link to={`${page.slug.current}`} aria-label={page.title[locale]}>
				{page.title[locale]}
			</Link>
		</S.NavigationItem>
	));

	return (
		<>
			<S.NavigationToggleButton onClick={toggleNavigation}>
				Menu
			</S.NavigationToggleButton>
			<S.Navigation visible={navigationVisible}>
				<S.NavigationToggleButton onClick={toggleNavigation}>
					Close
				</S.NavigationToggleButton>
				<S.NavigationList>{links}</S.NavigationList>
			</S.Navigation>
		</>
	);
};

export default Navigation;
