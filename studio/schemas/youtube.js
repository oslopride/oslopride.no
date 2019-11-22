import React from "react";
import getYouTubeID from "get-youtube-id";

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

const YouTubePreview = ({ value }) => {
  const id = getYouTubeID(value.url);
  const url = `https://www.youtube.com/embed/${id}`;
  if (!id) {
    return <div>Missing YouTube URL</div>;
  }

  return (
    <div style={wrapperStyle}>
      <iframe
        title="YouTube Preview"
        style={iframeStyle}
        src={url}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
};

export default {
  name: "youtube",
  type: "object",
  title: "YouTube Embed",
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
    component: YouTubePreview
  }
};
