import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { supabase } from '@/lib/supabase';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

// simple rule-based categorizer
function classify(niche: string) {
  const text = niche.toLowerCase();
  if (text.includes('oil') || text.includes('cream')) return { category: 'beauty', tone: 'trust' };
  if (text.includes('restaurant') || text.includes('food')) return { category: 'restaurant', tone: 'offer' };
  if (text.includes('saree') || text.includes('shirt')) return { category: 'fashion', tone: 'aspirational' };
  return { category: 'general', tone: 'neutral' };
}

export async function POST(req: Request) {
  try {
    const { niche, language } = await req.json();
    if (!niche) return NextResponse.json({ error: 'Missing niche' }, { status: 400 });

    const { category, tone } = classify(niche);

    const prompt =
      language === 'hindi'
        ? `You are India's #1 Facebook Ads Copywriter for local ${category} businesses. Niche: ${niche}. Write in Hinglish, max 100 characters. Add urgency ("Aaj hi", "Stock khatam") and trust ("10K+ logon ne liya"). Output clean JSON: {"variants":["5 ads"],"roas_score":"9/10"}`
        : `You are the world's #1 DTC Facebook Ads Copywriter for ${category}. Niche: ${niche}. Max 12 words. Use power words ("Secret","Proven","Instant") + urgency ("Limited Stock"). Output clean JSON: {"variants":["5 ads"],"roas_score":"9/10"}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
    });

    const raw = completion.choices[0].message?.content ?? '';
    let parsed;
    try { parsed = JSON.parse(raw); } catch { parsed = { variants: [raw], roas_score: 'N/A' }; }

    await supabase.from('requests').insert({
      input_text: niche,
      language,
      category,
      tone,
      prompt_used: prompt,
      model_response_raw: raw,
      parsed_variants: parsed,
    });

    return NextResponse.json(parsed);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
