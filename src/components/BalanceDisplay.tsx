"use client";

import { Theme } from "@/types";

interface BalanceDisplayProps {
  balance: number;
  theme: Theme;
  isAccessible?: boolean;
}

export default function BalanceDisplay({ balance, theme, isAccessible }: BalanceDisplayProps) {
  const baseClasses = isAccessible
    ? "text-center py-8 px-6 rounded-2xl border-4 border-yellow-400"
    : "text-center py-6 px-4 rounded-xl backdrop-blur-sm";

  return (
    <div
      className={baseClasses}
      style={{ backgroundColor: theme.cardBg }}
      role="status"
      aria-live="polite"
      aria-label={`Your current balance is ${balance} adventure bucks`}
    >
      <p className={`uppercase tracking-wider mb-2 ${isAccessible ? "text-xl font-bold" : "text-sm opacity-80"}`}>
        Your Balance
      </p>
      <p
        className={`font-bold ${isAccessible ? "text-7xl" : "text-5xl"}`}
        style={{ color: theme.primary }}
      >
        {balance.toLocaleString()}
      </p>
      <p className={`mt-1 ${isAccessible ? "text-2xl font-semibold" : "text-lg opacity-90"}`}>
        Adventure Bucks
      </p>
    </div>
  );
}
