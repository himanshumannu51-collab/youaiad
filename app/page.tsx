'use client';

import { useState } from 'react';
import { Globe, IndianRupee, Copy, Sparkles, Zap, CheckCircle } from 'lucide-react';

export default function Home() {
  const [niche, setNiche] = useState('');
  const [language, setLanguage] = useState<'hindi' | 'english'>('hindi');
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Generate ads by calling your backend API
  const generate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!niche) return;

    setIsLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche, language }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error('Error generating ads:', err);
      alert('Something went wrong while generating ads.');
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Copy single ad
  const copyAd = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  // ✅ Copy all ads
  const copyAll = () => {
    if (!result?.variants) return;
    const allText = result.variants.join('\n\n');
    navigator.clipboard.writeText(allText);
    alert('All 5 ads copied!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-green-400 via-yellow-400 to-blue-500 bg-clip-text text-transparent">
            AD INTEL
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-medium">
            {language === 'hindi' ? '5 सेकंड में Facebook Ads' : '5-Second Global Ads'}
          </p>
          <div className="flex justify-center gap-4 mt-4 flex-wrap">
            <span className="flex items-center gap-1 text-sm text-green-400">
              <CheckCircle size={16} /> 10K+ Ads Generated
            </span>
            <span className="flex items-center gap-1 text-sm text-yellow-400">
              <Zap size={16} /> ₹10L+ ROAS
            </span>
          </div>
        </div>

        {/* LANGUAGE TOGGLE */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setLanguage('hindi')}
            className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 ${
              language === 'hindi'
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/50'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            <IndianRupee size={20} /> Hindi (70%)
          </button>
          <button
            onClick={() => setLanguage('english')}
            className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 ${
              language === 'english'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/50'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            <Globe size={20} /> English (30%)
          </button>
        </div>

        {/* INPUT FORM */}
        <form onSubmit={generate} className="max-w-3xl mx-auto mb-12">
          <div className="relative">
            <input
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder={
                language === 'hindi'
                  ? 'प्रोडक्ट डालें (जैसे: साड़ी, हेयर ऑयल)'
                  : 'Enter product (e.g., keto gummies, skincare)'
              }
              className="w-full p-6 pr-16 text-xl bg-gray-800 border-2 border-gray-700 rounded-2xl focus:border-green-500 focus:outline-none transition-all placeholder-gray-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !niche}
              className="absolute right-2 top-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading
                ? 'Generating...'
                : language === 'hindi'
                ? '5 ADS बनाएं'
                : 'GENERATE 5 ADS'}
            </button>
          </div>
        </form>

        {/* OUTPUT SECTION */}
        <div className="max-w-5xl mx-auto space-y-6">
          {isLoading && (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-24 bg-gray-800 rounded-2xl animate-pulse"
                />
              ))}
            </div>
          )}

          {result?.variants?.length > 0 && (
            <div className="space-y-4">
              {result.variants.map((ad: string, i: number) => (
                <div
                  key={i}
                  className="group p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl border border-gray-700 hover:border-green-500 transition-all shadow-lg"
                >
                  <div className="flex justify-between items-start gap-4">
                    <p className="text-lg font-medium flex-1 leading-relaxed">
                      {ad}
                    </p>
                    <button
                      onClick={() => copyAd(ad)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-3 bg-green-600 hover:bg-green-500 rounded-xl shadow-md"
                    >
                      <Copy size={20} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Copy All + ROAS */}
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={copyAll}
                  className="px-6 py-3 bg-green-600 hover:bg-green-500 rounded-full font-bold text-lg shadow-md transition-all"
                >
                  Copy All 5 Ads
                </button>

                {result.roas_score && (
                  <span className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 text-black font-bold rounded-full text-lg shadow-lg">
                    <Sparkles size={20} /> ROAS: {result.roas_score}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="mt-16 text-center text-gray-400">
          <p className="text-sm">
            Built by a night-shift warrior in India | Used by 50+ Shopify stores
            worldwide
          </p>
        </div>
      </div>
    </div>
  );
}
