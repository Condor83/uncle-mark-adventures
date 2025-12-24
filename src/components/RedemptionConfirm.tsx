"use client";

import { Activity, Theme } from "@/types";

interface RedemptionConfirmProps {
  activity: Activity;
  theme: Theme;
  currentBalance: number;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
  isAccessible?: boolean;
}

export default function RedemptionConfirm({
  activity,
  theme,
  currentBalance,
  onConfirm,
  onCancel,
  isLoading,
  isAccessible,
}: RedemptionConfirmProps) {
  const newBalance = currentBalance - activity.cost;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <div
        className={`max-w-md w-full rounded-2xl ${isAccessible ? "p-10 border-4" : "p-6"}`}
        style={{
          backgroundColor: theme.cardBg,
          borderColor: isAccessible ? theme.primary : "transparent"
        }}
      >
        <h2
          id="confirm-title"
          className={`font-bold text-center mb-4 ${isAccessible ? "text-4xl" : "text-2xl"}`}
          style={{ color: theme.primary }}
        >
          Confirm Redemption
        </h2>

        <div className={`text-center mb-6 ${isAccessible ? "text-2xl" : ""}`}>
          <p className="mb-4">
            <span className="text-4xl mb-2 block" role="img" aria-hidden="true">{activity.icon}</span>
            <span className="font-semibold">{activity.name}</span>
          </p>

          <div className={`py-4 px-4 rounded-lg mb-4 ${isAccessible ? "text-xl" : ""}`} style={{ backgroundColor: theme.background }}>
            <p className="opacity-80">Cost: <strong style={{ color: theme.primary }}>{activity.cost} bucks</strong></p>
            <p className="opacity-80 mt-1">
              New Balance: <strong style={{ color: theme.accent }}>{newBalance} bucks</strong>
            </p>
          </div>

          <p className={`opacity-90 ${isAccessible ? "text-xl" : "text-sm"}`}>
            Ready to lock in this adventure with Uncle Mark?
          </p>
        </div>

        <div className={`flex gap-4 ${isAccessible ? "flex-col" : ""}`}>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              isAccessible ? "text-xl py-5" : ""
            }`}
            style={{
              backgroundColor: "transparent",
              border: `2px solid ${theme.accent}`,
              color: theme.accent
            }}
          >
            Wait, Not Yet
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              isAccessible ? "text-xl py-5" : ""
            }`}
            style={{
              backgroundColor: theme.primary,
              color: theme.background,
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? "Redeeming..." : "Yes, Let's Do It!"}
          </button>
        </div>
      </div>
    </div>
  );
}
