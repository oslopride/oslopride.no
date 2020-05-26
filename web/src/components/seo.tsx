import React from "react";
import { Helmet } from "react-helmet";

type OpenGraphProps = {
	title: string;
	description: string;
	url: string;
	locale: "nb_NO" | "en_US";
	image: {
		url: string;
		alt: string;
	};
} & (
	| {
			type: "website";
	  }
	| {
			type: "article";
			publishedAt: string;
			modifiedAt: string;
	  }
);

type Props = {
	openGraph: OpenGraphProps;
};

const Seo: React.FC<Props> = props => {
	return (
		<Helmet>
			<title>Oslo Pride | {props.openGraph.title}</title>
			<link rel="canonical" href="http://www.oslopride.no" />
			<meta name="description" content={props.openGraph.description} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta property="og:locale" content={props.openGraph.locale} />
			<meta
				property="og:title"
				content={`Oslo Pride | ${props.openGraph.title}`}
			/>
			<meta property="og:description" content={props.openGraph.description} />
			<meta property="og:url" content={props.openGraph.url} />
			<meta property="og:site_name" content="Oslo Pride" />
			<meta property="og:image" content={props.openGraph.image.url} />
			<meta property="og:image:alt" content={props.openGraph.image.alt} />
			<meta property="og:type" content={props.openGraph.type} />
			{props.openGraph.type === "article" && (
				<>
					<meta
						property="og:article:published_time"
						content={props.openGraph.publishedAt}
					/>
					<meta
						property="og:article:modified_time"
						content={props.openGraph.modifiedAt}
					/>
				</>
			)}
		</Helmet>
	);
};

export default Seo;
