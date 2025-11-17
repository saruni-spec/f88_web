import { NextResponse } from "next/server";

export async function POST() {
  try {
    const points = [
      { code: "BAG", name: "BAGGAGE HALL" },
      { code: "BSA", name: "BUSIA" },
      { code: "EIA", name: "ELDORET INTERNATIONAL AIRPORT" },
      { code: "ELK", name: "ELWAK" },
      { code: "EXP", name: "EXPORTS SECTION KILINDINI" },
      { code: "ISB", name: "ISEBANIA" },
      { code: "ISL", name: "ISIOLO AIRPORT" },
      { code: "JKA", name: "JOMO KENYATTA INTERNATIONAL AIRPORT" },
      { code: "KGA", name: "KIUNGA" },
      { code: "KLD", name: "KILINDINI" },
      { code: "KLI", name: "KILIFI" },
      { code: "KOP", name: "KOPANGA" },
      { code: "KSP", name: "KISUMU PIER" },
      { code: "LAU", name: "LAMU" },
      { code: "LBI", name: "LIBOI" },
      { code: "LGO", name: "LOKICHOGIO" },
      { code: "LLA", name: "LUNGA LUNGA" },
      { code: "LTK", name: "LOITOKITOK" },
      { code: "LWA", name: "LWAKHAKHA" },
      { code: "MBY", name: "MUHURU BAY" },
      { code: "MEX", name: "MOMBASA EXPORTS" },
      { code: "MIA", name: "MOI INTERNATIONAL AIRPORT" },
      { code: "MLB", name: "MALABA" },
      { code: "MLD", name: "MALINDI" },
      { code: "MOY", name: "MOYALE" },
      { code: "MRA", name: "MANDERA" },
      { code: "NEX", name: "NAIROBI EXPORTS" },
      { code: "NMA", name: "NAMANGA" },
      { code: "NMO", name: "NYAMTIRO" },
      { code: "OLD", name: "OLD PORT" },
      { code: "SHI", name: "SHIMONI" },
      { code: "SPT", name: "SIO PORT" },
      { code: "SUM", name: "SUAM" },
      { code: "TVT", name: "TAVETA" },
      { code: "USE", name: "USENGE" },
      { code: "VGA", name: "VANGA" },
      { code: "WAP", name: "WILSON AIRPORT" },
      { code: "WJR", name: "WAJIR" },
      { code: "ICD", name: "ICD EMBAKASI" },
    ];
    return NextResponse.json({ points }, { status: 200 });
  } catch (error) {
    console.error("Error during create entity process:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
