import React from "react";
import Anchor from "../components/anchor";
import { urlFor } from "../utils/sanity";

export default function Hero({ title, subtitle, links = [], image }) {
	return (
		<div>
			<h1>{title}</h1>

			<h2>{subtitle}</h2>

			<ul>
				{links.map(link => (
					<li key={link._key}>
						<Anchor {...link} />
					</li>
				))}
			</ul>

			<img
				src={urlFor(image)
					.maxWidth(500)
					.url()}
			/>
		</div>
	);
}
