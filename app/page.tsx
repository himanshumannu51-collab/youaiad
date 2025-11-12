"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function Page() {
  const [product, setProduct] = useState("");
  const [tone, setTone] = useState("Bold & Confident");
  const [language, setLanguage] = useState("English");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<any[]>([]);
  const resultRef = useRef<HTMLDivElement | null>(null);

  const generateAd = async () => {
    if (!product.trim()) {
      setError("Please enter a product or headline to generate ads.");
      return;
    }

    setLoading(true);
    setResult("");
    setError("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product, tone, language }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error || "Unknown error from API");
      } else {
        setResult(data.result || "No output returned");
        setHistory((h) => [
          { id: Date.now(), product, tone, language, output: data.result },
          ...h,
        ]);

        // scroll result into view smoothly
        setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
      }
    } catch (err) {
      console.error(err);
      setError("Network error — check console.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // tiny visual feedback could be added
    } catch (err) {
      console.error("copy failed", err);
    }
  };

  const downloadCSV = () => {
    if (!result) return;
    const rows = [['headline','body','cta']];
    // naive parse: split by numbered items or newlines — keep it simple and useful
    const parts = result.split(/\n{1,}/).filter(Boolean);
    parts.forEach((p) => rows.push([p.replace(/"/g, '""')]));

    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${product || 'ad-pack'}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 py-12 px-6">
      <div className="mx-auto max-w-6xl">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">YouAIAd — AI Ad Generator</h1>
            <p className="mt-1 text-sm text-slate-600">Top‑1% design, creator‑first ad packs — English + Hindi, ready for Meta/Shopify.</p>
          </div>

          <nav className="flex items-center gap-4">
            <a className="text-sm font-medium text-slate-700 px-3 py-2 rounded hover:bg-slate-100">Docs</a>
            <a className="text-sm font-medium text-slate-700 px-3 py-2 rounded hover:bg-slate-100">Pricing</a>
            <button className="bg-black text-white text-sm px-4 py-2 rounded">Try Free</button>
          </nav>
        </header>

        <section className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-5">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-white p-6 shadow-lg">
              <label className="block text-xs font-semibold text-slate-600">Product / Headline</label>
              <input value={product} onChange={(e)=>setProduct(e.target.value)} placeholder="e.g. Midnight Leather Jacket — limited drop" className="mt-2 w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-slate-300" />

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600">Tone</label>
                  <select value={tone} onChange={(e)=>setTone(e.target.value)} className="mt-2 w-full border rounded-md p-2">
                    <option>Bold & Confident</option>
                    <option>Friendly & Helpful</option>
                    <option>Emotional & Storytelling</option>
                    <option>Luxury & Exclusive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600">Language</label>
                  <select value={language} onChange={(e)=>setLanguage(e.target.value)} className="mt-2 w-full border rounded-md p-2">
                    <option>English</option>
                    <option>Hindi</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button onClick={generateAd} disabled={loading} className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold p-3 rounded-md shadow hover:opacity-95 disabled:opacity-60">
                  {loading ? 'Generating…' : 'Generate Ad Pack'}
                </button>

                <button onClick={()=>{ setProduct(''); setResult(''); setError(''); }} className="px-4 py-3 border rounded-md">Reset</button>
              </div>

              {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

              <div className="mt-6 text-xs text-slate-500">
                <strong>Pro tip:</strong> Use short product phrases. For higher fidelity visual matches, add a product image in the next release.
              </div>
            </motion.div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <h4 className="text-xs font-semibold text-slate-600">Quick Examples</h4>
                <ul className="mt-3 text-sm text-slate-700 space-y-2">
                  <li className="cursor-pointer" onClick={()=>setProduct('Minimalist Travel Rucksack — 25L')}>Minimalist Travel Rucksack</li>
                  <li className="cursor-pointer" onClick={()=>setProduct('Ayurvedic Glow Face Oil — Natural')}>Ayurvedic Glow Face Oil</li>
                  <li className="cursor-pointer" onClick={()=>setProduct('Midnight Leather Jacket — limited drop')}>Midnight Leather Jacket</li>
                </ul>
              </div>

              <div className="rounded-lg bg-white p-4 shadow-sm">
                <h4 className="text-xs font-semibold text-slate-600">Shortcuts</h4>
                <div className="mt-3 flex flex-col gap-2">
                  <button className="text-left text-sm p-2 rounded border" onClick={()=>{ setTone('Luxury & Exclusive'); setLanguage('English'); }}>Luxury Pack</button>
                  <button className="text-left text-sm p-2 rounded border" onClick={()=>{ setTone('Friendly & Helpful'); setLanguage('Hindi'); }}>India Localized</button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} ref={resultRef} className="rounded-2xl bg-white p-6 shadow-lg min-h-[260px]">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Generated Ad Pack</h3>
                  <p className="text-sm text-slate-500">Ready to copy → paste into Meta Ads Manager or export as CSV.</p>
                </div>

                <div className="flex items-center gap-3">
                  <button onClick={()=>copyToClipboard(result)} disabled={!result} className="px-3 py-2 border rounded text-sm">Copy</button>
                  <button onClick={downloadCSV} disabled={!result} className="px-3 py-2 bg-slate-900 text-white rounded text-sm">Export CSV</button>
                </div>
              </div>

              <div className="mt-4">
                {loading ? (
                  <div className="animate-pulse space-y-3">
                    <div className="h-6 bg-slate-200 rounded" />
                    <div className="h-4 bg-slate-200 rounded w-3/4" />
                    <div className="h-4 bg-slate-200 rounded w-1/2" />
                  </div>
                ) : result ? (
                  <pre className="whitespace-pre-wrap text-sm text-slate-800 bg-slate-50 p-4 rounded">{result}</pre>
                ) : (
                  <div className="text-sm text-slate-500">No ad generated yet — enter a product and click <strong>Generate</strong>.</div>
                )}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-3">
                  <h5 className="text-xs font-semibold text-slate-600">Last Results</h5>
                  <div className="mt-2 space-y-2 max-h-40 overflow-auto">
                    {history.length === 0 && <div className="text-xs text-slate-400">— empty —</div>}
                    {history.map(h => (
                      <div key={h.id} className="text-sm border rounded p-2"> 
                        <div className="font-medium">{h.product}</div>
                        <div className="text-xs text-slate-500">{h.tone} • {h.language}</div>
                        <button className="mt-2 text-xs text-indigo-600" onClick={()=>setResult(h.output)}>Load</button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border p-3">
                  <h5 className="text-xs font-semibold text-slate-600">Design Notes</h5>
                  <ul className="mt-2 text-sm text-slate-600 space-y-2">
                    <li>Mobile-first responsive layout</li>
                    <li>High-contrast CTA colors for clear conversion</li>
                    <li>Localised language toggles (Hindi/English)</li>
                    <li>Export-ready CSV for Meta Ads Manager</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="col-span-3 md:col-span-1 rounded-lg bg-white p-4 shadow-sm">
                <h6 className="text-xs font-semibold text-slate-600">Performance Tips</h6>
                <ol className="mt-2 text-sm text-slate-600 list-decimal ml-5 space-y-2">
                  <li>Run 3 creatives per ad set</li>
                  <li>Use short headlines (≤ 6 words)</li>
                  <li>Test Hindi vs English for regional targeting</li>
                </ol>
              </div>

              <div className="col-span-3 md:col-span-2 rounded-lg bg-white p-4 shadow-sm">
                <h6 className="text-xs font-semibold text-slate-600">Design Inspiration</h6>
                <p className="mt-2 text-sm text-slate-600">Layout and UX were inspired by top‑performing creative SaaS landing experiences — clear hierarchy, modular cards, fast primary actions, and a strong hero that explains value within 2 seconds.</p>
              </div>
            </div>

          </div>
        </section>

        <footer className="mt-12 text-center text-sm text-slate-500">Built with ❤️ — AI tools + human craft. Need route.ts fixes too? Ask and I'll add the perfect serverless file.</footer>
      </div>
    </main>
  );
}
