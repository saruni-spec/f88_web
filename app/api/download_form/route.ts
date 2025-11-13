import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Request body:", body);

    // Fetch the remote PDF
    const response = await fetch(
      "https://kratest.pesaflow.com/api/customs/passenger-declaration/F88-20251113OPAL/download-form",
      { method: "GET" }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch PDF: ${response.status}`);
    }

    // const pdfBuffer = Buffer.from(await response.arrayBuffer());

    // // Generate a filename (e.g., using ref_no or timestamp)
    // const fileName = `declaration-${Date.now()}.pdf`;

    // // Save it in the Next.js public directory
    // const filePath = path.join(process.cwd(), "public", fileName);
    // await writeFile(filePath, pdfBuffer);

    // // Construct public URL (works on both local and production)
    // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || req.nextUrl.origin;
    // const publicUrl = `${baseUrl}/${fileName}`;

    const publicUrl =
      "https://c26b5f15d948.ngrok-free.app/declaration-1763027921761.pdf";

    return NextResponse.json({ message: "Success", url: publicUrl });
  } catch (error) {
    console.error("Error saving PDF:", error);
    return NextResponse.json(
      { message: "Failed to save PDF", error: String(error) },
      { status: 500 }
    );
  }
}
