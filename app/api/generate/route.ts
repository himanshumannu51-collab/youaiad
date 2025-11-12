import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // Mock AI-generated ads
    const ads = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      text: `Ad ${i + 1} - ${prompt || "Default concept"}`,
    }));

    return NextResponse.json({ ads });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
