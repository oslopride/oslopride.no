import React from "react";
import { Link } from "gatsby";
import logo from "../assets/logo.svg";
import Navigation from "./navigation";

export default function Layout({ children, locale }) {
	const baseUrl = locale === "no" ? "/" : `/${locale}/`;

	return (
		<>
			<header>
				<Link to={baseUrl}>
					<img width="100px" src={logo} alt="Oslo Pride logo" />
				</Link>
				<Navigation locale={locale} />
			</header>
			{children}
			<footer>OSLO PRIDE</footer>
		</>
	);
}
