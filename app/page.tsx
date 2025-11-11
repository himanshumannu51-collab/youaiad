'use client';
import { useState, useEffect } from 'react';
import { useChat } from 'ai/react';
import { Globe, IndianRupee, Copy, Sparkles, Zap, CheckCircle, Crown, Image as ImageIcon, FileText, RotateCw, Globe2, Languages, ArrowLeft, Star, Users, DollarSign } from 'lucide-react';

export default function Home() {
  const [niche, setNiche] = useState('');
  const [language, setLanguage] = useState<'hindi' | 'english'>('english'); // Default: English (80%)
  const [showOutput, setShowOutput] = useState(false);
  const { messages, setInput, handleSubmit, isLoading } = useChat();

  // Persist niche
  useEffect(() => {
    const savedNiche = localStorage.getItem('adintel_niche');
    if (savedNiche) setNiche(savedNiche);
  }, []);

  useEffect(() => {
    if (niche) localStorage.setItem('adintel_niche', niche);
  }, [niche]);

  // Simulate IP for Hindi (20% chance for demo; replace with real geolocation)
  useEffect(() => {
    if (Math.random() < 0.2) setLanguage('hindi');
  }, []);

  // Language toggle
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'english' ? 'hindi' : 'english'));
    localStorage.setItem('adintel_language', language === 'english' ? 'hindi' : 'english');
  };

  // Updated prompt for 10 variants + ROAS + winner
  const generate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!niche) return;
    const prompt = language === 'english'
      ? `Niche: "${niche}". You are DTC Facebook Ads God. Write 10 UNIQUE American English ads (max 12 words each). Rules: Power words (Secret, Proven, Instant), proof (10K+ sold), urgency (Limited, 24h). End with CTA (Tap to claim). Score each 1-10 for ROAS: +2 power words, +2 urgency, +2 proof, +2 CTA, +1 emoji, +1 <90 chars. Name: Variant A, B, etc. Pick winner by highest score. Output ONLY clean JSON: { "variants": ["Variant A: text..."], "scores": [8,9,...], "average_roas": "8.6/10", "winner": "Variant D" }`
      : `Niche: "${niche}". India's #1 Facebook Ads Copywriter for local shops. Write 10 UNIQUE Hinglish ads (max 100 chars). Urgency ("Aaj hi", "Stock khatam"), trust ("10K+ log", "5⭐"). Emoji + CTA ("Order karo"). Score 1-10 (same logic). Name: Ad A, B, etc. Winner highest. JSON: { "variants": ["Ad A: text..."], "scores": [...], "average_roas": "8.6/10", "winner": "Ad D" }`;
    setInput(prompt);
    handleSubmit(e);
    setShowOutput(true);
  };

  // Hero text
  const heroTitle = language === 'english' ? 'AI Ads That Print Money' : 'AI Ads जो पैसा छापते हैं';
  const heroSubtitle = language === 'english' ? 'Type your product → Get 10 Meta-ready ads + ROAS winner in 5 seconds.' : 'प्रोडक्ट डालें → 10 तैयार ads + ROAS विजेता 5 सेकंड में।';
  const inputPlaceholder = language === 'english' ? 'Enter product (e.g., keto gummies for busy moms)' : 'प्रोडक्ट डालें (जैसे: केटो गमीज व्यस्त मॉम्स के लिए)';
  const generateButtonText = language === 'english' ? 'GENERATE 10 ADS' : '10 ADS बनाएं';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-gray-800 px-4 py-3">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-black bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            AD INTEL
          </h1>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all"
          >
            <Globe2 size={16} />
            {language === 'english' ? 'हिंदी' : 'English'}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {heroTitle}
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {heroSubtitle}
          </p>
          <div className="flex justify-center gap-8 mb-8 text-sm text-gray-400 flex-wrap">
            <span className="flex items-center gap-1"><Zap size={16} /> 47,821 Ads Generated</span>
            <span className="flex items-center gap-1"><DollarSign size={16} /> $2.1M ROAS Tracked</span>
            <span className="flex items-center gap-1"><Users size={16} /> 200+ Shopify Stores</span>
          </div>
          <form onSubmit={generate} className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder={inputPlaceholder}
                className="w-full p-6 pr-40 text-xl bg-gray-800 border-2 border-gray-700 rounded-2xl focus:border-indigo-500 focus:outline-none transition-all placeholder-gray-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !niche}
                className="absolute right-2 top-2 px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  generateButtonText
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Output Section (Conditional) */}
      {showOutput && (
        <section className="px-4 pb-12">
          <div className="container mx-auto">
            {/* Sticky Back Bar */}
            <div className="sticky top-20 bg-black/80 backdrop-blur-md border-b border-gray-800 p-4 mb-6 rounded-t-2xl">
              <div className="flex items-center gap-4">
                <ArrowLeft size={20} className="cursor-pointer" onClick={() => setShowOutput(false)} />
                <span className="font-bold">{niche}</span>
                <button
                  onClick={generate}
                  disabled={isLoading}
                  className="ml-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold disabled:opacity-50"
                >
                  <RotateCw size={16} className="inline mr-2" /> Generate Again
                </button>
              </div>
            </div>

            {/* Messages/Output */}
            <div className="space-y-6">
              {messages.map((m, idx) => {
                try {
                  const data = JSON.parse(m.content);
                  const isHindi = language === 'hindi';
                  const labelPrefix = isHindi ? 'Ad ' : 'Variant ';

                  return (
                    <div key={idx} className="space-y-6">
                      {/* Winner Badge */}
                      {data.winner && (
                        <div className="text-center">
                          <span className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-full text-lg shadow-lg">
                            <Crown size={20} /> WINNER: {data.winner}
                          </span>
                        </div>
                      )}

                      {/* Variants Grid */}
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data.variants?.slice(0, 10).map((ad: string, i: number) => {
                          const score = data.scores?.[i] || 0;
                          const label = ad.split(':')[0].replace(labelPrefix, '');
                          const text = ad.split(': ').slice(1).join(': ');
                          const isWinner = data.winner?.includes(labelPrefix + String.fromCharCode(65 + i));

                          return (
                            <div
                              key={i}
                              className={`group p-5 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border-2 transition-all shadow-lg ${
                                isWinner
                                  ? 'border-yellow-500 shadow-yellow-500/20'
                                  : 'border-gray-700 hover:border-indigo-500'
                              }`}
                            >
                              <div className="flex justify-between items-start mb-3">
                                <span className="text-sm font-bold text-gray-400">
                                  {labelPrefix + String.fromCharCode(65 + i)}
                                </span>
                                <span
                                  className={`text-sm font-bold px-2 py-1 rounded-full ${
                                    score >= 9
                                      ? 'bg-green-500 text-white'
                                      : score >= 7
                                      ? 'bg-yellow-500 text-black'
                                      : 'bg-red-500 text-white'
                                  }`}
                                >
                                  {score}/10
                                </span>
                              </div>
                              <p className="text-lg font-medium leading-snug mb-4">{text}</p>
                              {/* Placeholder Thumbnail */}
                              <div className="w-full h-32 bg-gray-700 rounded-lg flex items-center justify-center mb-3 group-hover:bg-gray-600 transition-all">
                                <ImageIcon size={24} className="text-gray-500" />
                                <span className="text-xs text-gray-500 ml-2">AI Thumbnail</span>
                              </div>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(text);
                                  alert('Copied to clipboard!');
                                }}
                                className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold opacity-0 group-hover:opacity-100 transition-all"
                              >
                                <Copy size={16} className="inline mr-2" /> Copy
                              </button>
                            </div>
                          );
                        })}
                      </div>

                      {/* Average ROAS */}
                      <div className="text-center">
                        <span className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full text-lg shadow-lg">
                          <Zap size={20} /> Avg ROAS: {data.average_roas}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button
                          onClick={() => {
                            const texts = data.variants?.map((v: string) => v.split(': ').slice(1).join(': ')).join('\n\n') || '';
                            navigator.clipboard.writeText(texts);
                            alert('All 10 ads copied!');
                          }}
                          className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all"
                        >
                          <Copy size={16} className="inline mr-2" /> Copy All 10 Ads
                        </button>
                        <button className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold">
                          <FileText size={16} className="inline mr-2" /> Export CSV
                        </button>
                        <button className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold">
                          <RotateCw size={16} className="inline mr-2" /> Remix Mode
                        </button>
                      </div>
                    </div>
                  );
                } catch (error) {
                  return (
                    <div key={idx} className="p-6 bg-red-900 rounded-2xl text-red-200">
                      Error parsing ads. Try generating again.
                    </div>
                  );
                }
              })}
            </div>

            {/* Loading Skeleton */}
            {isLoading && (
              <div className="space-y-4">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="h-64 bg-gray-800 rounded-2xl animate-pulse"></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Features Section */}
      {!showOutput && (
        <section className="px-4 py-16">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why AD INTEL?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gray-800 rounded-2xl">
                <Zap size={48} className="mx-auto mb-4 text-indigo-500" />
                <h3 className="text-xl font-bold mb-2">5-Second Ads</h3>
                <p className="text-gray-400">Instant generation, zero delay.</p>
              </div>
              <div className="text-center p-6 bg-gray-800 rounded-2xl">
                <Sparkles size={48} className="mx-auto mb-4 text-yellow-500" />
                <h3 className="text-xl font-bold mb-2">ROAS Predictor</h3>
                <p className="text-gray-400">Scores & picks winners upfront.</p>
              </div>
              <div className="text-center p-6 bg-gray-800 rounded-2xl">
                <ImageIcon size={48} className="mx-auto mb-4 text-green-500" />
                <h3 className="text-xl font-bold mb-2">AI Thumbnails</h3>
                <p className="text-gray-400">Visuals ready to run.</p>
              </div>
              <div className="text-center p-6 bg-gray-800 rounded-2xl">
                <RotateCw size={48} className="mx-auto mb-4 text-purple-500" />
                <h3 className="text-xl font-bold mb-2">Remix Mode</h3>
                <p className="text-gray-400">Steal competitor magic legally.</p>
              </div>
              <div className="text-center p-6 bg-gray-800 rounded-2xl">
                <FileText size={48} className="mx-auto mb-4 text-blue-500" />
                <h3 className="text-xl font-bold mb-2">History + CSV</h3>
                <p className="text-gray-400">Save & export for agencies.</p>
              </div>
              <div className="text-center p-6 bg-gray-800 rounded-2xl">
                <Languages size={48} className="mx-auto mb-4 text-emerald-500" />
                <h3 className="text-xl font-bold mb-2">English + Hindi</h3>
                <p className="text-gray-400">Global & India optimized.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Pricing Section */}
      {!showOutput && (
        <section className="px-4 py-16 bg-gray-800/50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Start Free. Upgrade When You Scale.</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {/* Free */}
              <div className="p-6 rounded-2xl border-2 border-gray-700 text-center">
                <h3 className="text-2xl font-bold mb-4">FREE</h3>
                <p className="text-3xl font-black text-gray-400 mb-6">$0</p>
                <ul className="space-y-2 mb-6 text-gray-400">
                  <li>5 ads/day</li>
                  <li>Text only</li>
                  <li>Basic ROAS</li>
                </ul>
                <button className="w-full py-3 bg-transparent border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white rounded-xl font-bold transition-all">
                  Get Started Free
                </button>
              </div>
              {/* Pro Global */}
              <div className="p-6 rounded-2xl border-2 border-indigo-500 text-center relative">
                <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-bold">Most Popular</span>
                <h3 className="text-2xl font-bold mb-4">PRO (Global)</h3>
                <p className="text-3xl font-black mb-6">$49/mo</p>
                <ul className="space-y-2 mb-6 text-white">
                  <li>Unlimited ads</li>
                  <li>Visuals + Remix</li>
                  <li>CSV + History</li>
                  <li>Agency Mode</li>
                </ul>
                <button className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-bold transition-all shadow-lg">
                  Start 7-Day Trial
                </button>
              </div>
              {/* Pro India */}
              <div className="p-6 rounded-2xl border-2 border-emerald-500 text-center md:col-span-3 lg:col-span-1">
                <h3 className="text-2xl font-bold mb-4">PRO (India)</h3>
                <p className="text-3xl font-black mb-6">₹999/mo</p>
                <ul className="space-y-2 mb-6 text-white">
                  <li>Same as Global</li>
                  <li>UPI Support</li>
                </ul>
                <button className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold transition-all shadow-lg">
                  शुरू करें (Start)
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {!showOutput && (
        <section className="px-4 py-16">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">What Users Say</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="p-6 bg-gray-800 rounded-2xl">
                <p className="text-gray-300 mb-4">"Turned $500 spend into $2,300 in 3 days. AD INTEL is magic."</p>
                <div className="flex items-center gap-2">
                  <Star fill="currentColor" className="text-yellow-500" size={16} />
                  <span className="font-bold">Sarah K., Keto Brand (USA)</span>
                </div>
              </div>
              <div className="p-6 bg-gray-800 rounded-2xl">
                <p className="text-gray-300 mb-4">"हमारी दुकान का ROAS 2x हो गया। हिंदी ads कमाल के हैं!"</p>
                <div className="flex items-center gap-2">
                  <Star fill="currentColor" className="text-yellow-500" size={16} />
                  <span className="font-bold">Rajesh S., Delhi Agency</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="px-4 py-12 border-t border-gray-800">
        <div className="container mx-auto text-center text-gray-400">
          <p className="mb-4">AD INTEL © 2025 | Built in India 🇮🇳</p>
          <div className="flex justify-center gap-6 mb-4">
            <a href="#" className="hover:text-indigo-500">Product Hunt</a>
            <a href="#" className="hover:text-indigo-500">Twitter/X</a>
            <a href="https://github.com/himanshumannu51-collab/youaiad" className="hover:text-indigo-500">GitHub</a>
          </div>
          <p>For agencies: agency@adintel.ai</p>
        </div>
      </footer>
    </div>
  );
}
