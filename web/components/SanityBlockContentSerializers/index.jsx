import YouTubeEmbed from "@/components/YouTubeEmbed";
import IFrameEmbed from "@/components/IFrameEmbed";

const serializers = {
  types: {
    youtube: YouTubeEmbed,
    iframe: IFrameEmbed
  }
};

export default serializers;
