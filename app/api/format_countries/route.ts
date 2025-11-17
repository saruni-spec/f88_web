import { NextRequest, NextResponse } from "next/server";

function extractValidCountries(countries: unknown[]): string[] {
  const codes: string[] = [];

  countries.forEach((entry) => {
    // Case 1: already a valid ISO code
    if (typeof entry === "string" && entry.length === 2) {
      codes.push(entry);
      return;
    }

    // Case 2: extract from object
    if (typeof entry === "object" && entry !== null) {
      for (const val of Object.values(entry)) {
        if (typeof val === "string" && val.length === 2) {
          codes.push(val);
          break;
        }
      }
    }
  });

  // return unique only
  return [...new Set(codes)];
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("Received data:", body);

    const validCountries = extractValidCountries(body.countries || []);

    return NextResponse.json(
      { message: "Success", validCountries },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during create entity process:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
