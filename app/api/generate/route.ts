import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { product, tone, language } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Missing OpenAI API Key in environment" },
        { status: 500 }
      );
    }

    if (!product) {
      return NextResponse.json(
        { error: "Missing product name in request" },
        { status: 400 }
      );
    }

    const prompt = `
You are an expert ad copywriter. Create 3 short, high-performing Facebook ad copies for the product "${product}".
Tone: ${tone}. Language: ${language}.
Each ad must include:
- Headline (max 8 words)
- Body (max 30 words)
- CTA (Call To Action)
Format as:
1️⃣ Headline:
Body:
CTA:
`;

    const openai = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await openai.json();

    if (!openai.ok) {
      console.error("OpenAI error:", data);
      return NextResponse.json(
        { error: data.error?.message || "Failed to generate content" },
        { status: 500 }
      );
    }

    const result = data.choices?.[0]?.message?.content || "No output generated";
    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("Server error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
