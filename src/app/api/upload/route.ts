import { NextRequest, NextResponse } from "next/server";
import { combine, parseStatsXml } from "itg-stats-merge"
import * as fs from "fs"

export async function GET() {
  return NextResponse.json({ message: "Hello" })
}
export async function POST(req: NextRequest) {

  const formData = await req.formData();
  const itgFile = formData.get("Stats.xml");
  const ecfaFile = formData.get("ECFA-Stats.xml");

  if (!itgFile || !ecfaFile) {
    return NextResponse.json({ message: "Missing itg or ecfa" }, { status: 400 });
  }
  const itg = parseStatsXml(await (itgFile as File).text())
  const ecfa = parseStatsXml(await (ecfaFile as File).text())

  if (!itg || !ecfa) {
    return NextResponse.json({ message: "Error converting itg or ecfa file to object" }, { status: 400 });
  }

  const combinedXml = combine(itg, ecfa)
  const res = new NextResponse(combinedXml,
    {
      headers: { "Content-Type": "application/xml", "Content-Disposition": 'attachment; filename="Stats.xml"' },
      status: 200
    });
  return res;
}
