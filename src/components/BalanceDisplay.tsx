"use client";

import { useEffect, useState } from "react";
import { Theme } from "@/types";

interface BalanceDisplayProps {
  balance: number;
  theme: Theme;
  isAccessible?: boolean;
}

export default function BalanceDisplay({ balance, theme, isAccessible }: BalanceDisplayProps) {
  const [displayBalance, setDisplayBalance] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Animate the balance counting up on mount
  useEffect(() => {
    if (hasAnimated) {
      setDisplayBalance(balance);
      return;
    }

    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * balance);

      setDisplayBalance(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setHasAnimated(true);
      }
    };

    requestAnimationFrame(animate);
  }, [balance, hasAnimated]);

  if (isAccessible) {
    return (
      <div
        className="text-center py-10 px-8 rounded-3xl border-4 border-yellow-400 relative overflow-hidden"
        style={{
          backgroundColor: theme.cardBg,
          boxShadow: `0 0 60px ${theme.glowColor}`,
        }}
        role="status"
        aria-live="polite"
        aria-label={`Your current balance is ${balance} adventure bucks`}
      >
        <p className="text-2xl font-bold uppercase tracking-widest mb-4 text-yellow-400">
          Your Balance
        </p>
        <p className="text-8xl font-black balance-number" style={{ color: theme.primary }}>
          {displayBalance.toLocaleString()}
        </p>
        <p className="text-3xl font-semibold mt-4 text-white">
          Adventure Bucks
        </p>
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden rounded-2xl glass animate-fade-in-up"
      style={{
        backgroundColor: theme.cardBg,
        animationDelay: '0.2s',
        opacity: 0,
        animationFillMode: 'forwards',
      }}
    >
      {/* Animated glow border */}
      <div
        className="absolute inset-0 rounded-2xl opacity-50"
        style={{
          background: `linear-gradient(90deg, transparent, ${theme.primary}, transparent)`,
          backgroundSize: '200% 100%',
          animation: 'shimmer 3s infinite',
        }}
      />

      {/* Inner content */}
      <div
        className="relative m-[1px] rounded-2xl py-8 px-6"
        style={{ backgroundColor: theme.cardBg }}
      >
        {/* Decorative corner accents */}
        <div
          className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 rounded-tl-lg opacity-40"
          style={{ borderColor: theme.primary }}
        />
        <div
          className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 rounded-tr-lg opacity-40"
          style={{ borderColor: theme.primary }}
        />
        <div
          className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 rounded-bl-lg opacity-40"
          style={{ borderColor: theme.primary }}
        />
        <div
          className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 rounded-br-lg opacity-40"
          style={{ borderColor: theme.primary }}
        />

        <div className="text-center relative z-10">
          <p
            className="uppercase tracking-[0.3em] text-xs mb-3 opacity-70"
            style={{ fontFamily: theme.fontFamily }}
          >
            Your Balance
          </p>

          <div className="relative inline-block">
            {/* Glow effect behind number */}
            <div
              className="absolute inset-0 blur-2xl opacity-30"
              style={{ backgroundColor: theme.primary }}
            />
            <p
              className="relative text-6xl md:text-7xl font-black balance-number"
              style={{
                color: theme.primary,
                fontFamily: theme.displayFont,
                textShadow: `0 0 40px ${theme.glowColor}`,
              }}
            >
              {displayBalance.toLocaleString()}
            </p>
          </div>

          <p
            className="text-lg mt-3 opacity-90 tracking-wide"
            style={{ fontFamily: theme.fontFamily }}
          >
            Adventure Bucks
          </p>
        </div>

        {/* Floating sparkles */}
        <div
          className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full animate-pulse"
          style={{ backgroundColor: theme.accent, animationDelay: '0s' }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ backgroundColor: theme.primary, animationDelay: '0.5s' }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-1 h-1 rounded-full animate-pulse"
          style={{ backgroundColor: theme.accent, animationDelay: '1s' }}
        />
      </div>
    </div>
  );
}
