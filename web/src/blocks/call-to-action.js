import React from "react";
import styled from "styled-components";
import { urlFor } from "../utils/sanity";

export default function CallToAction({ title, subtitle, image, color }) {
	return (
		<div>
			<pre>{subtitle}</pre>
			<img src={urlFor(image).url()} />
			<pre>{title}</pre>
		</div>
	);
}
