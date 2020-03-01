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
					{navigation?.map(item => (
						<li key={item.url._id}>
							<RouterLink
								to={
									item.url._type === "frontPage" ? "/" : item.url.slug.current
								}
							>
								{item.text}
							</RouterLink>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
