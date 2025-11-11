'use client';
import { useState } from 'react';
import { useChat } from 'ai/react';
import { Globe, IndianRupee, Copy, Sparkles, Zap, CheckCircle } from 'lucide-react';

export default function Home() {
  const [niche, setNiche] = useState('');
  const [language, setLanguage] = useState<'hindi' | 'english'>('hindi');
  const { messages, setInput, handleSubmit, isLoading } = useChat();

  const generate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!niche) return;

    const prompt = language === 'hindi'
      ? `India's #1 Facebook Ads Copywriter. Niche: ${niche}. Hinglish. Max 100 chars. Urgency + trust. JSON: { variants: [], roas_score: "" }`
      : `Global DTC Ads Expert. Niche: ${niche}. Perfect English. Max 12 words. Power words + proof. JSON: { variants: [], roas_score: "" }`;

    setInput(prompt);
    handleSubmit(e);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-green-400 via-yellow-400 to-blue-500 bg-clip-text text-transparent">
              AD INTEL
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-medium">
              {language === 'hindi' ? '🇮🇳 5 सेकंड में Facebook Ads' : '🌍 5-Second Global Ads'}
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <span className="flex items-center gap-1 text-sm text-green-400">
                <CheckCircle size={16} /> 10K+ Ads Generated
              </span>
              <span className="flex items-center gap-1 text-sm text-yellow-400">
                <Zap size={16} /> ₹10L+ ROAS
              </span>
            </div>
          </div>

          {/* Language Toggle */}
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

          {/* Input Form */}
          <form onSubmit={generate} className="max-w-3xl mx-auto mb-12">
            <div className="relative">
              <input
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder={language === 'hindi' ? 'प्रोडक्ट डालें (जैसे: साड़ी, हेयर ऑयल)' : 'Enter product (e.g., keto gummies, skincare)'}
                className="w-full p-6 pr-16 text-xl bg-gray-800 border-2 border-gray-700 rounded-2xl focus:border-green-500 focus:outline-none transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !niche}
                className="absolute right-2 top-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50"
              >
                {isLoading ? 'Generating...' : language === 'hindi' ? '5 ADS बनाएं' : 'GENERATE 5 ADS'}
              </button>
            </div>
          </form>

          {/* Output */}
          <div className="max-w-5xl mx-auto space-y-6">
            {messages.map((m, idx) => {
              try {
                const data = JSON.parse(m.content);
                return (
                  <div key={idx} className="space-y-4">
                    {data.variants?.map((ad: string, i: number) => (
                      <div
                        key={i}
                        className="group p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl border border-gray-700 hover:border-green-500 transition-all"
                      >
                        <div className="flex justify-between items-start gap-4">
                          <p className="text-lg font-medium flex-1">{ad}</p>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(ad);
                              alert('Copied!');
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-3 bg-green-600 hover:bg-green-500 rounded-xl"
                          >
                            <Copy size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                    {data.roas_score && (
                      <div className="text-right">
                        <span className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 text-black font-bold rounded-full text-lg">
                          <Sparkles size={20} /> ROAS: {data.roas_score}
                        </span>
                      </div>
                    )}
                  </div>
                );
              } catch {
                return null;
              }
            })}
          </div>

          {/* Trust Bar */}
          <div className="mt-16 text-center text-gray-400">
            <p className="text-sm">
              Built by a night-shift warrior in India 🇮🇳 | Used by 50+ Shopify stores 🌍
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
