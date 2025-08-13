"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Key, ShoppingCart } from "lucide-react";

export default function Page() {
  const [apiKey, setApiKey] = useState("");
  const [purchased, setPurchased] = useState(false);

  const handlePurchase = () => {
    // Simulate payment success
    setPurchased(true);
  };

  const handleGenerateKey = () => {
    const newKey = "API-" + Math.random().toString(36).substring(2, 15);
    setApiKey(newKey);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Get Your API Key
          </h1>
          <p className="text-gray-600 mb-8">
            Purchase an API key to unlock full access to our powerful data
            services. Once purchased, you can generate and manage your API key
            instantly.
          </p>

          {!purchased ? (
            <Button
              onClick={handlePurchase}
              className="flex items-center gap-2 px-6 py-3 text-lg"
            >
              <ShoppingCart size={20} /> Buy Now
            </Button>
          ) : (
            <>
              <Button
                onClick={handleGenerateKey}
                className="flex items-center gap-2 px-6 py-3 text-lg mb-4"
              >
                <Key size={20} /> Generate API Key
              </Button>
              {apiKey && (
                <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm border">
                  {apiKey}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
