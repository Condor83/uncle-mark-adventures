"use client";

import { useEffect, useState } from "react";
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
  const [isVisible, setIsVisible] = useState(false);
  const newBalance = currentBalance - activity.cost;

  useEffect(() => {
    // Trigger animation after mount
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  const handleCancel = () => {
    setIsVisible(false);
    setTimeout(onCancel, 200);
  };

  if (isAccessible) {
    return (
      <div
        className="fixed inset-0 bg-black/90 flex items-center justify-center p-6 z-50"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
      >
        <div
          className="max-w-lg w-full rounded-3xl p-10 border-4"
          style={{
            backgroundColor: theme.cardBg,
            borderColor: theme.primary,
            boxShadow: `0 0 60px ${theme.glowColor}`,
          }}
        >
          <h2
            id="confirm-title"
            className="text-4xl font-bold text-center mb-6"
            style={{ color: theme.primary }}
          >
            Confirm Adventure
          </h2>

          <div className="text-center mb-8">
            <div className="text-7xl mb-4">{activity.icon}</div>
            <p className="text-3xl font-bold text-white mb-2">{activity.name}</p>
            <p className="text-xl text-white/80">{activity.description}</p>
          </div>

          <div
            className="py-6 px-6 rounded-2xl mb-8 text-center"
            style={{ backgroundColor: theme.background }}
          >
            <p className="text-2xl text-white/80 mb-2">
              Cost: <strong style={{ color: theme.primary }}>{activity.cost} bucks</strong>
            </p>
            <p className="text-2xl text-white/80">
              New Balance: <strong style={{ color: theme.accent }}>{newBalance} bucks</strong>
            </p>
          </div>

          <p className="text-2xl text-center mb-8 text-white/90">
            Ready to lock in this adventure with Uncle Mark?
          </p>

          <div className="space-y-4">
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="w-full py-6 px-6 rounded-2xl text-2xl font-bold transition-all"
              style={{
                backgroundColor: theme.primary,
                color: theme.background,
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              {isLoading ? "Redeeming..." : "Yes, Let's Do It!"}
            </button>
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="w-full py-6 px-6 rounded-2xl text-2xl font-bold border-2 transition-all"
              style={{
                backgroundColor: "transparent",
                borderColor: theme.accent,
                color: theme.accent,
              }}
            >
              Wait, Not Yet
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center p-4 z-50 transition-all duration-300 ${
        isVisible ? "bg-black/80 backdrop-blur-sm" : "bg-black/0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      onClick={handleCancel}
    >
      <div
        className={`max-w-md w-full rounded-2xl overflow-hidden transition-all duration-300 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        style={{
          backgroundColor: theme.cardBg,
          boxShadow: `0 0 80px ${theme.glowColor}`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated header glow */}
        <div
          className="h-1 w-full"
          style={{
            background: `linear-gradient(90deg, ${theme.primary}, ${theme.accent}, ${theme.primary})`,
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s infinite',
          }}
        />

        <div className="p-6">
          {/* Icon with glow */}
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <div
                className="absolute inset-0 blur-2xl opacity-40"
                style={{ backgroundColor: theme.primary }}
              />
              <span className="relative text-6xl block">{activity.icon}</span>
            </div>
          </div>

          {/* Title */}
          <h2
            id="confirm-title"
            className="text-2xl font-bold text-center mb-2"
            style={{ fontFamily: theme.displayFont, color: theme.primary }}
          >
            {activity.name}
          </h2>
          <p
            className="text-center text-sm opacity-70 mb-6"
            style={{ fontFamily: theme.fontFamily }}
          >
            {activity.description}
          </p>

          {/* Cost breakdown */}
          <div
            className="rounded-xl p-4 mb-6"
            style={{ backgroundColor: `${theme.background}80` }}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="opacity-70">Cost</span>
              <span className="font-bold" style={{ color: theme.primary }}>
                -{activity.cost} bucks
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-white/10">
              <span className="opacity-70">New Balance</span>
              <span
                className="font-bold text-lg"
                style={{ fontFamily: theme.displayFont, color: theme.accent }}
              >
                {newBalance.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Confirmation text */}
          <p className="text-center text-sm opacity-80 mb-6">
            Ready to lock in this adventure with Uncle Mark?
          </p>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02]"
              style={{
                backgroundColor: "transparent",
                border: `2px solid ${theme.accent}40`,
                color: theme.textColor,
              }}
            >
              Not Yet
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] relative overflow-hidden"
              style={{
                backgroundColor: theme.primary,
                color: theme.background,
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span
                    className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                    style={{ animation: 'spin 1s linear infinite' }}
                  />
                  Redeeming...
                </span>
              ) : (
                <>
                  <span className="mr-1">✓</span>
                  Let&apos;s Do It!
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
