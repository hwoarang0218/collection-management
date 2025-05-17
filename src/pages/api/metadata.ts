import { NextApiRequest, NextApiResponse } from "next";
import ogs from "open-graph-scraper";

interface MetadataResponse {
  title?: string;
  description?: string;
  image?: string;
  url: string;
  siteName?: string;
  type?: string;
  author?: string;
  publisher?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    section?: string;
    tags?: string[];
  };
  video?: string;
  audio?: string;
  locale?: string;
  determiner?: string;
  favicon?: string;
}

async function generateMetadata(url: string): Promise<MetadataResponse> {
  try {
    const { result } = await ogs({ url });

    return {
      title:
        result.ogTitle ||
        result.twitterTitle ||
        result.dcTitle ||
        result.dcTitle,
      description:
        result.ogDescription ||
        result.twitterDescription ||
        result.dcDescription,
      image: result.ogImage?.[0]?.url || result.twitterImage?.[0]?.url,
      url: result.requestUrl || url,
      siteName: result.ogSiteName,
      type: result.ogType,
      author: result.articleAuthor || result.author,
      publisher: result.articlePublisher,
      article: {
        publishedTime: result.articlePublishedTime,
        modifiedTime: result.articleModifiedTime,
        section: result.articleSection,
        tags:
          typeof result.articleTag === "string"
            ? [result.articleTag]
            : result.articleTag,
      },
      video: result.ogVideo?.[0]?.url || result.twitterPlayer?.[0]?.url,
      audio: result.ogAudio || undefined,
      locale: result.ogLocale,
      determiner: result.ogDeterminer,
      favicon: result.favicon,
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return { url };
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const metadata = await generateMetadata(url as string);
    res.status(200).json(metadata);
  } catch (error) {
    console.error("Metadata error:", error);
    res.status(500).json({ error: "Failed to fetch metadata" });
  }
}
