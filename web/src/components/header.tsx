import React from "react";
import { SanityConfiguration } from "../sanity/models";
import Link from "./link";

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
						<li key={item._key}>
							<Link link={item} />
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
