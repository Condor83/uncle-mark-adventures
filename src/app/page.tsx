"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Add a subtle snow animation effect
    const createSnowflake = () => {
      const snowflake = document.createElement("div");
      snowflake.innerHTML = "❄";
      snowflake.className = "snowflake";
      snowflake.style.left = Math.random() * 100 + "vw";
      snowflake.style.animationDuration = Math.random() * 3 + 2 + "s";
      snowflake.style.opacity = String(Math.random() * 0.6 + 0.4);
      snowflake.style.fontSize = Math.random() * 10 + 10 + "px";
      document.body.appendChild(snowflake);

      setTimeout(() => snowflake.remove(), 5000);
    };

    const interval = setInterval(createSnowflake, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-900 via-red-800 to-green-900 p-4">
      <style jsx global>{`
        .snowflake {
          position: fixed;
          top: -20px;
          z-index: 1000;
          pointer-events: none;
          animation: fall linear forwards;
        }
        @keyframes fall {
          to {
            transform: translateY(105vh) rotate(360deg);
          }
        }
      `}</style>

      <div className="text-center max-w-md relative z-10">
        <div className="text-8xl mb-6 animate-bounce">🎁</div>
        <h1 className="text-4xl font-bold text-white mb-4">
          Uncle Mark&apos;s Adventure Bucks
        </h1>
        <p className="text-xl text-red-100 mb-8">
          Scan your QR code to access your personalized adventure page!
        </p>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <p className="text-white/90">
            Each family member has a unique page with:
          </p>
          <ul className="text-left text-white/80 mt-4 space-y-2">
            <li className="flex items-center gap-2">
              <span>💰</span> Your adventure buck balance
            </li>
            <li className="flex items-center gap-2">
              <span>🎯</span> Activities to choose from
            </li>
            <li className="flex items-center gap-2">
              <span>✨</span> A design just for you
            </li>
          </ul>
        </div>

        <p className="mt-8 text-green-200 text-lg">
          🎄 Merry Christmas! 🎄
        </p>
      </div>
    </main>
  );
}
