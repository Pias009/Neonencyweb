"use client";

import Image from "next/image";

const caseStudies = [
  {
    title: "Flashcoin.info (Awareness)",
    problem:
      "The Flashcoin community lacked a central hub to share updates, increase trust, and combat scam activity.",
    solution:
      "We launched Flashcoin.info, a user-friendly website focused on education, alerts, and official content. Built with SEO and trust in mind.",
    impact:
      "Increased awareness by 300%, reduced misinformation, and boosted community credibility through a professional, transparent platform.",
    image: "/images/flashcoin.png",
  },
  {
    title: "RimsoBattery.com (eCommerce Growth)",
    problem:
      "Rimso Battery faced low online sales and lacked digital visibility despite strong offline performance.",
    solution:
      "We developed a full eCommerce site with real-time stock, custom battery filtering, and conversion-focused design. Paired with targeted digital marketing.",
    impact:
      "Online orders increased by 420%, mobile traffic doubled, and the brand became a leading battery seller in Bangladesh’s digital space.",
    image: "/images/rimso.png",
  },
  {
    title: "BinGi App (Real Problem, Beta Solution)",
    problem:
      "Users struggle with slow, expensive, or scam-prone currency exchanges in the digital asset space.",
    solution:
      "We created BinGi, a secure and lightning-fast exchange app offering USD, crypto, and Flashcoin transactions — built with modern Web3 + Web2 architecture.",
    impact:
      "Early beta testers report 98% faster exchanges and improved trust. BinGi is now in MVP stage with planned launch in 2025.",
    image: "/images/bingi.png",
  },
];

export default function  Case() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
          Case Studies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
            >
              <div className="relative w-full h-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-blue-600 mb-3">
                  {item.title}
                </h3>
                <p className="text-sm font-semibold text-red-500 mb-1">
                  Problem
                </p>
                <p className="text-gray-600 text-sm mb-3">{item.problem}</p>
                <p className="text-sm font-semibold text-green-600 mb-1">
                  Solution
                </p>
                <p className="text-gray-600 text-sm mb-3">{item.solution}</p>
                <p className="text-sm font-semibold text-indigo-600 mb-1">
                  Impact
                </p>
                <p className="text-gray-600 text-sm">{item.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
