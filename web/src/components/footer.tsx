import React from "react";
import { SanityConfiguration } from "../sanity/models";

type Props = {
	footer: SanityConfiguration["footer"];
};

const Footer: React.FC<Props> = props => {
	const { footer } = props;

	const socialLinks: { name: string; url: string }[] = [];
	if (footer?.facebook)
		socialLinks.push({ name: "Facebook", url: footer.facebook });
	if (footer?.instagram)
		socialLinks.push({ name: "Instagram", url: footer.instagram });
	if (footer?.twitter)
		socialLinks.push({ name: "Twitter", url: footer.twitter });

	return (
		<footer>
			{socialLinks.length > 0 && (
				<ul>
					{socialLinks.map(link => (
						<li key={link.name}>
							<a href={link.url}>{link.name}</a>
						</li>
					))}
				</ul>
			)}
			{footer?.links && footer.links.length > 0 && (
				<ul>
					{footer.links.map(link => (
						<li key={link._key}>
							<a href={link.url}>{link.text}</a>
						</li>
					))}
				</ul>
			)}
		</footer>
	);
};

export default Footer;
