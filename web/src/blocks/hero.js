import React from "react";
import Anchor from "../components/anchor";
import { urlFor } from "../utils/sanity";

export default function Hero({ title, subtitle, links, image }) {
	return (
		<div>
			<h1>{title}</h1>

			{subtitle && <h2>{subtitle}</h2>}

			{links && links.lenght > 0 && (
				<ul>
					{links.map(link => (
						<li key={link._key}>
							<Anchor {...link} />
						</li>
					))}
				</ul>
			)}

			{image && (
				<img
					src={urlFor(image)
						.maxWidth(500)
						.url()}
				/>
			)}
		</div>
	);
}
