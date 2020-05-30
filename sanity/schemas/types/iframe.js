import React from "react";

const wrapperStyle = {
	position: "relative",
	paddingBottom: "56.25%",
	height: "0",
	overflow: "hidden"
};

const iframeStyle = {
	position: "absolute",
	top: "0",
	left: "0",
	width: "100%",
	height: "100%"
};

const IFrameEmbedPreview = ({ value }) => {
	if (!value.url) {
		return <div>Missing URL</div>;
	}

	return (
		<div style={wrapperStyle}>
			<iframe
				title="Iframe Preview"
				style={iframeStyle}
				src={value.url}
				frameBorder="0"
				allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
			/>
		</div>
	);
};

export default {
	name: "iframe",
	type: "object",
	title: "IFrame embed",
	fields: [
		{
			name: "url",
			type: "url",
			title: "URL"
		}
	],
	preview: {
		select: {
			url: "url"
		},
		component: IFrameEmbedPreview
	}
};
