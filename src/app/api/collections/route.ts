import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const collectionsPath = path.join(
  process.cwd(),
  "public/mockData/collections.json"
);

export async function POST(request: Request) {
  try {
    const newCollection = await request.json();
    const fileContent = await fs.readFile(collectionsPath, "utf-8");
    const data = JSON.parse(fileContent);

    data.collections.push(newCollection);

    await fs.writeFile(collectionsPath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving collection:", error);
    return NextResponse.json(
      { error: "Failed to save collection" },
      { status: 500 }
    );
  }
}
