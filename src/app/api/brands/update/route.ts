import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { brand, details } = body;

    const dataFilePath = path.join(
      process.cwd(),
      "public",
      "mockData",
      "brands.json"
    );

    // Read existing data
    let brandsData: { brands: { name: string; [key: string]: any }[] } = {
      brands: [],
    };
    try {
      const fileContent = await fs.readFile(dataFilePath, "utf8");
      brandsData = JSON.parse(fileContent);
    } catch (error) {
      // File doesn't exist yet, will create it
    }

    // Update or add brand
    const brandIndex = brandsData.brands.findIndex(
      (b: any) => b.name.toLowerCase() === brand.toLowerCase()
    );
    if (brandIndex >= 0) {
      brandsData.brands[brandIndex] = details;
    } else {
      brandsData.brands.push(details);
    }

    // Write back to file
    await fs.writeFile(dataFilePath, JSON.stringify(brandsData, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving brand details:", error);
    return NextResponse.json(
      { error: "Failed to save brand details" },
      { status: 500 }
    );
  }
}
