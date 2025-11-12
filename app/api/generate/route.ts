import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export async function POST(req: Request) {
  console.log("✅ /api/generate route called");

  try {
    const { product } = await req.json();

    if (!product) {
      return NextResponse.json({ error: "Product name is required" }, { status: 400 });
    }

    const prompt = `Generate 5 short, persuasive Facebook ads for a DTC product called "${product}". 
Each ad should be <20 words and end with a clear CTA. Return as JSON with a key called "ads".`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const text = completion.choices[0]?.message?.content ?? "{}";
    const data = JSON.parse(text);
    const ads = data.ads || [];

    const { error } = await supabase.from("requests").insert({
      input_text: product,
      model_response_raw: JSON.stringify(data),
      parsed_variants: ads,
      created_at: new Date(),
    });

    if (error) console.error("❌ Supabase insert error:", error);
    else console.log("✅ Supabase insert success");

    return NextResponse.json({ ads });
  } catch (err: any) {
    console.error("❌ Error generating ads:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
