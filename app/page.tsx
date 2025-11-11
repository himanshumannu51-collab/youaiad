'use client';
import { useState } from 'react';
import { useChat } from 'ai/react';

export default function Home() {
  const [niche, setNiche] = useState('');
  const { messages, setInput, handleSubmit } = useChat();

  const generate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!niche) return;

    setInput(`
      Elite ad spy for: ${niche}
      1. Spy top 3 winning ads
      2. Break: Hook → Pain → Proof → CTA
      3. Generate 5 better variants
      4. Score ROAS 1–10
      5. Output clean JSON
    `);
    handleSubmit(e);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 font-mono">
      <h1 className="text-4xl mb-8 text-center">AD INTEL</h1>
      
      <form onSubmit={generate} className="max-w-2xl mx-auto mb-8">
        <input
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          placeholder="Niche (e.g., keto gummies)"
          className="w-full p-4 bg-gray-900 border border-green-500 rounded-lg text-lg"
        />
        <button type="submit" className="mt-4 w-full p-4 bg-green-600 hover:bg-green-500 rounded-lg font-bold">
          SPY & GENERATE
        </button>
      </form>

      <div className="max-w-4xl mx-auto space-y-4">
        {messages.map((m) => (
          <div key={m.id} className="p-4 bg-gray-900 rounded-lg border border-gray-700">
            <pre className="whitespace-pre-wrap text-sm">{m.content}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
