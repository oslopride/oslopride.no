import React from "react";

import { SanityLiveEmbed } from "../sanity/models";
import YoutubeEmbed from "../components/sanity-portable-text/youtube-embed";

type Props = {
	content: SanityLiveEmbed;
};

const LiveEmbed = ({ content }: Props) => {
	const { embed } = content;
	if (embed.length === 0) return null;

	const firstEmbed = embed[0];

	switch (firstEmbed._type) {
		case "youtube":
			return <YoutubeEmbed node={{ url: firstEmbed.url }} />;
		default:
			return null;
	}
};

export default LiveEmbed;
