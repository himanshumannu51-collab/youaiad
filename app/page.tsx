'use client';
import { useState } from 'react';

export default function HomePage() {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  return (
    <main className="bg-bg-light text-text-dark min-h-screen font-inter">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto py-28 px-6">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Type your product → Get 5 high-ROAS ads instantly.
        </h1>
        <p className="text-lg text-text-muted mb-8">
          AI-powered ad copy generator built for DTC founders. Trust-first. Growth-driven.
        </p>
        <button className="bg-primary hover:bg-[#005FCC] text-white px-6 py-3 rounded-2xl font-semibold shadow-sm transition">
          Generate 5 Ads Now
        </button>
      </section>

      {/* Proof / Metrics Section */}
      <section className="max-w-4xl mx-auto py-12 px-6 grid md:grid-cols-3 gap-6 text-center">
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-3xl font-bold text-primary mb-2">10K+</h3>
          <p className="text-text-muted">Ads Generated</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-3xl font-bold text-primary mb-2">₹10L+</h3>
          <p className="text-text-muted">Total ROAS Delivered</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-3xl font-bold text-primary mb-2">500+</h3>
          <p className="text-text-muted">DTC Brands Onboarded</p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-5xl mx-auto py-24 px-6 text-center">
        <h2 className="text-4xl font-semibold mb-10">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h3 className="text-xl font-semibold mb-3">1️⃣ Enter Product</h3>
            <p className="text-text-muted">Type your product name and category in Hinglish or English.</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h3 className="text-xl font-semibold mb-3">2️⃣ Generate 5 Ads + ROAS</h3>
            <p className="text-text-muted">Our AI creates 5 unique Facebook & Instagram ads with predicted ROAS.</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h3 className="text-xl font-semibold mb-3">3️⃣ Copy → Run → Profit</h3>
            <p className="text-text-muted">Copy your best ad, launch instantly, and track higher profits.</p>
          </div>
        </div>
      </section>

      {/* Pricing Section with Toggle */}
      <section className="max-w-4xl mx-auto py-24 px-6 text-center">
        <h2 className="text-4xl font-semibold mb-8">Simple Pricing</h2>

        {/* Currency Toggle */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span
            onClick={() => setCurrency('INR')}
            className={`cursor-pointer ${
              currency === 'INR' ? 'text-primary font-semibold' : 'text-text-muted'
            }`}
          >
            ₹ INR
          </span>
          <div
            className="cursor-pointer"
            onClick={() => setCurrency(currency === 'INR' ? 'USD' : 'INR')}
          >
            <span className="inline-block w-10 h-6 bg-gray-200 rounded-full relative">
              <span
                className={`block w-5 h-5 bg-white rounded-full shadow-sm transform transition ${
                  currency === 'USD' ? 'translate-x-4' : 'translate-x-0'
                }`}
              ></span>
            </span>
          </div>
          <span
            onClick={() => setCurrency('USD')}
            className={`cursor-pointer ${
              currency === 'USD' ? 'text-primary font-semibold' : 'text-text-muted'
            }`}
          >
            $ USD
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 hover:shadow-md transition">
            <h3 className="text-2xl font-semibold mb-4">
              Pro Plan ({currency === 'INR' ? '₹499 / mo' : '$99 / mo'})
            </h3>
            <ul className="text-left list-disc ml-5 text-text-muted mb-6 space-y-1">
              <li>Unlimited products</li>
              <li>5 ads per product</li>
              <li>ROAS AI scoring system</li>
              <li>Priority support</li>
              <li>Access to learning brain</li>
            </ul>
            <button className="bg-primary hover:bg-[#005FCC] text-white px-6 py-3 rounded-2xl font-semibold shadow-sm transition">
              Start for {currency === 'INR' ? '₹499' : '$99'}
            </button>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 hover:shadow-md transition">
            <h3 className="text-2xl font-semibold mb-4">Free Trial</h3>
            <ul className="text-left list-disc ml-5 text-text-muted mb-6 space-y-1">
              <li>1 product input</li>
              <li>5 AI-generated ads</li>
              <li>Basic ROAS insight</li>
            </ul>
            <button className="border border-primary text-primary px-6 py-3 rounded-2xl font-semibold hover:bg-secondary transition">
              Try Free
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-12 text-text-muted border-t border-gray-200 mt-20">
        <p className="text-sm">
          © 2025 YouAI Ad Tool. Built with ❤️ for DTC founders. Powered by trust × AI × growth.
        </p>
      </footer>
    </main>
  );
}
