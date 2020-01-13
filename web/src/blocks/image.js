import React from "react";
import { urlFor } from "../utils/sanity";

export default function Image({ image }) {
	return <img src={urlFor(image).url()} />;
}
