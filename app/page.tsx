"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

export default function Page() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);

  async function generateAds() {
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: "Luxury Travel" }),
    });
    const data = await res.json();
    setAds(data.ads || []);
    setLoading(false);
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-900 p-8">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold mb-4 text-center"
      >
        ✨ AI Ad Generator
      </motion.h1>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Instantly generate 5 high-performing ads for your brand using AI.
      </p>

      <Button onClick={generateAds} size="lg" disabled={loading}>
        {loading ? "Generating..." : "Generate 5 Ads"}
      </Button>

      <div className="grid md:grid-cols-2 gap-4 mt-10 max-w-3xl w-full">
        {ads.map((ad, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="shadow-md border border-gray-100">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 text-lg text-blue-600">
                  Ad {i + 1}
                </h3>
                <p className="text-gray-800">{ad.title}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
