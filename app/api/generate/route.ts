// app/api/generate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { kv } from '@vercel/kv';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const FREE_LIMIT = 5; // Free tier: 5 gens/day

export async function POST(req: NextRequest) {
  try {
    const { niche, language = 'english', userId = 'anonymous' } = await req.json();

    if (!niche || niche.trim().length < 2) {
      return NextResponse.json({ error: 'Valid niche required' }, { status: 400 });
    }

    // === RATE LIMITING (Free Tier) ===
    const key = `rate:${userId}`;
    const count = await kv.incr(key);
    if (count === 1) await kv.expire(key, 60 * 60 * 24); // 24h expiry

    if (count > FREE_LIMIT) {
      return NextResponse.json(
        { error: 'Free limit reached. Upgrade to Pro.' },
        { status: 429 }
      );
    }

    // === PROMPT (Same as frontend) ===
    const prompt = language === 'english'
      ? `Niche: "${niche}". Write 10 DTC Facebook ads (max 12 words). Power words, proof, urgency. Score 1-10. Name Variant A-J. Pick winner. JSON only.`
      : `Niche: "${niche}". 10 Hinglish ads (max 100 chars). Urgency, trust, emoji. Score 1-10. Name Ad A-J. Winner. JSON.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    const result = completion.choices[0].message.content;

    // === ANALYTICS (Optional: PostHog later) ===
    console.log(`Generated for ${userId}: ${niche} (${language})`);

    return NextResponse.json({ data: JSON.parse(result!), usage: count });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate ads', details: error.message },
      { status: 500 }
    );
  }
}
