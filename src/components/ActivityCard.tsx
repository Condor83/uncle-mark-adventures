"use client";

import { useState } from "react";
import { Activity, Theme } from "@/types";

interface ActivityCardProps {
  activity: Activity;
  theme: Theme;
  onRedeem: (activity: Activity) => void;
  isRedeemed: boolean;
  canAfford: boolean;
  isAccessible?: boolean;
  index?: number;
}

export default function ActivityCard({
  activity,
  theme,
  onRedeem,
  isRedeemed,
  canAfford,
  isAccessible,
  index = 0,
}: ActivityCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (!isRedeemed && canAfford) {
      onRedeem(activity);
    }
  };

  if (isAccessible) {
    return (
      <div
        className="p-8 rounded-3xl border-4 transition-all duration-200 relative overflow-hidden"
        style={{
          backgroundColor: theme.cardBg,
          borderColor: isRedeemed ? theme.primary : theme.accent,
          opacity: isRedeemed ? 0.7 : 1,
          boxShadow: `0 0 30px ${theme.glowColor}`,
        }}
        role="article"
        aria-label={`${activity.name}, costs ${activity.cost} adventure bucks. ${activity.description}`}
      >
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-3">
              <span className="text-6xl" role="img" aria-hidden="true">
                {activity.icon}
              </span>
              <h3 className="text-4xl font-bold text-white">
                {activity.name}
              </h3>
            </div>
            <p className="text-2xl leading-relaxed text-white/90">
              {activity.description}
            </p>
          </div>
          <div
            className="text-3xl font-black whitespace-nowrap px-4 py-2 rounded-xl"
            style={{ backgroundColor: theme.primary, color: theme.background }}
          >
            {activity.cost}
          </div>
        </div>

        {isRedeemed ? (
          <div
            className="w-full mt-6 py-6 px-6 rounded-2xl text-3xl font-bold text-center"
            style={{ backgroundColor: theme.primary, color: theme.background }}
          >
            ✓ Redeemed!
          </div>
        ) : (
          <button
            onClick={handleClick}
            disabled={!canAfford}
            className="w-full mt-6 py-6 px-6 rounded-2xl text-3xl font-bold transition-all duration-200"
            style={{
              backgroundColor: canAfford ? theme.primary : "#4b5563",
              color: canAfford ? theme.background : "#9ca3af",
              cursor: canAfford ? "pointer" : "not-allowed",
            }}
            aria-label={`Redeem ${activity.name} for ${activity.cost} adventure bucks`}
            aria-disabled={!canAfford}
          >
            {canAfford ? "Redeem This Adventure" : "Not Enough Bucks"}
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className="relative group animate-fade-in-up"
      style={{
        animationDelay: `${0.3 + index * 0.1}s`,
        opacity: 0,
        animationFillMode: 'forwards',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card glow on hover */}
      <div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
        style={{ backgroundColor: theme.glowColor }}
      />

      <div
        className="relative overflow-hidden rounded-2xl glass transition-all duration-300"
        style={{
          backgroundColor: theme.cardBg,
          transform: isHovered && !isRedeemed ? 'translateY(-4px)' : 'none',
          boxShadow: isHovered && !isRedeemed
            ? `0 20px 40px ${theme.glowColor}`
            : `0 4px 20px rgba(0,0,0,0.3)`,
          opacity: isRedeemed ? 0.6 : 1,
        }}
        role="article"
        aria-label={`${activity.name}, costs ${activity.cost} adventure bucks. ${activity.description}`}
      >
        {/* Shimmer effect on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${theme.primary}10 50%, transparent 100%)`,
            backgroundSize: '200% 100%',
            animation: isHovered ? 'shimmer 1.5s infinite' : 'none',
          }}
        />

        {/* Redeemed overlay */}
        {isRedeemed && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div
              className="px-6 py-2 rounded-full text-lg font-bold tracking-wider uppercase rotate-[-5deg]"
              style={{
                backgroundColor: theme.primary,
                color: theme.background,
                boxShadow: `0 0 30px ${theme.glowColor}`,
              }}
            >
              ✓ Redeemed
            </div>
          </div>
        )}

        <div className="relative p-6">
          {/* Header row */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-4 flex-1">
              {/* Icon with glow */}
              <div className="relative">
                <div
                  className="absolute inset-0 blur-lg opacity-50"
                  style={{ backgroundColor: theme.primary }}
                />
                <span
                  className="relative text-4xl block p-2"
                  role="img"
                  aria-hidden="true"
                >
                  {activity.icon}
                </span>
              </div>

              <h3
                className="text-xl font-bold leading-tight"
                style={{ fontFamily: theme.displayFont }}
              >
                {activity.name}
              </h3>
            </div>

            {/* Cost badge */}
            <div
              className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-bold"
              style={{
                backgroundColor: `${theme.primary}20`,
                color: theme.primary,
                border: `1px solid ${theme.primary}40`,
              }}
            >
              <span className="text-lg">{activity.cost}</span>
              <span className="text-xs ml-1 opacity-70">bucks</span>
            </div>
          </div>

          {/* Description */}
          <p
            className="text-sm opacity-80 mb-5 leading-relaxed"
            style={{ fontFamily: theme.fontFamily }}
          >
            {activity.description}
          </p>

          {/* Action button */}
          {!isRedeemed && (
            <button
              onClick={handleClick}
              disabled={!canAfford}
              className="w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 relative overflow-hidden group/btn"
              style={{
                backgroundColor: canAfford ? theme.primary : '#374151',
                color: canAfford ? theme.background : '#9ca3af',
                cursor: canAfford ? 'pointer' : 'not-allowed',
              }}
              aria-label={`Redeem ${activity.name} for ${activity.cost} adventure bucks`}
              aria-disabled={!canAfford}
            >
              {/* Button hover effect */}
              {canAfford && (
                <div
                  className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${theme.accent}30, transparent)`,
                  }}
                />
              )}
              <span className="relative">
                {canAfford ? (
                  <>
                    <span className="mr-2">→</span>
                    Redeem Adventure
                  </>
                ) : (
                  'Not Enough Bucks'
                )}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
