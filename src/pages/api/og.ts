import { NextApiRequest, NextApiResponse } from "next";
import ogs from "open-graph-scraper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const { result } = await ogs({ url });
    res.status(200).json({
      title: result.ogTitle,
      description: result.ogDescription,
      image: result.ogImage?.[0]?.url,
      url: result.ogUrl,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Open Graph data" });
  }
}
