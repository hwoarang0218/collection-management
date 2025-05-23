import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const collectionsPath = path.join(
  process.cwd(),
  "public/mockData/collections.json"
);

export async function POST(request: Request) {
  try {
    const { oldBrand, newBrand } = await request.json();

    // Read the collections file
    const fileContent = await fs.readFile(collectionsPath, "utf-8");
    const data = JSON.parse(fileContent);

    // Update brand names
    data.collections = data.collections.map((collection: any) => {
      if (collection.brand.toLowerCase() === oldBrand.toLowerCase()) {
        return { ...collection, brand: newBrand };
      }
      return collection;
    });

    // Save updated collections
    await fs.writeFile(collectionsPath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating collections:", error);
    return NextResponse.json(
      { error: "Failed to update collections" },
      { status: 500 }
    );
  }
}
