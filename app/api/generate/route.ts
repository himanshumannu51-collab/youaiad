'use client';
import { useState } from 'react';

export default function HomePage() {
  const [product, setProduct] = useState('');
  const [ads, setAds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateAds = async () => {
    setError('');
    if (!product) {
      setError('Please enter a product name first.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Something went wrong.');
        setLoading(false);
        return;
      }

      const data = await res.json();
      setAds(data.ads || []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-bg-light text-text-dark min-h-screen font-inter">
      <section className="text-center max-w-3xl mx-auto py-28 px-6">
        <h1 className="text-5xl font-bold mb-6">Type your product → Get 5 high-ROAS ads instantly</h1>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <input
            type="text"
            placeholder="e.g. Organic Coffee"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="border border-gray-200 rounded-2xl px-5 py-3 bg-white shadow-sm w-full sm:w-96"
          />
          <button
            onClick={generateAds}
            disabled={loading}
            className="bg-primary hover:bg-[#005FCC] text-white px-6 py-3 rounded-2xl font-semibold shadow-sm transition disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate 5 Ads'}
          </button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {ads.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-6 max-w-2xl mx-auto text-left">
            {ads.map((ad, i) => (
              <p key={i} className="mb-3">• {ad}</p>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
