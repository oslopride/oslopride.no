import React from "react";
import { Link as RouterLink } from "@reach/router";
import { SanityConfiguration } from "../sanity/models";

type Props = {
	navigation: SanityConfiguration["navigationBar"];
	date: SanityConfiguration["date"];
};

const Header: React.FC<Props> = props => {
	const { navigation, date } = props;

	return (
		<header>
			<h1>Oslo Pride - {date}</h1>
			<nav>
				<ul>
					{navigation.map(item => {
						const id = item._id;
						const slug = item._type === "frontPage" ? "/" : item.slug.current;
						const title = item._type === "frontPage" ? "Hjem" : item.title.no;
						return (
							<li key={id}>
								<RouterLink to={slug}>{title}</RouterLink>
							</li>
						);
					})}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
