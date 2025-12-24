"use client";

import { Activity, Theme } from "@/types";

interface ActivityCardProps {
  activity: Activity;
  theme: Theme;
  onRedeem: (activity: Activity) => void;
  isRedeemed: boolean;
  canAfford: boolean;
  isAccessible?: boolean;
}

export default function ActivityCard({
  activity,
  theme,
  onRedeem,
  isRedeemed,
  canAfford,
  isAccessible,
}: ActivityCardProps) {
  const handleClick = () => {
    if (!isRedeemed && canAfford) {
      onRedeem(activity);
    }
  };

  const cardClasses = isAccessible
    ? "p-8 rounded-2xl border-4 transition-all duration-200"
    : "p-5 rounded-xl backdrop-blur-sm transition-all duration-200 hover:scale-[1.02]";

  const buttonClasses = isAccessible
    ? "w-full mt-6 py-5 px-6 rounded-xl text-2xl font-bold transition-all duration-200"
    : "w-full mt-4 py-3 px-4 rounded-lg font-semibold transition-all duration-200";

  return (
    <div
      className={cardClasses}
      style={{
        backgroundColor: theme.cardBg,
        borderColor: isRedeemed ? theme.primary : isAccessible ? theme.accent : "transparent",
        opacity: isRedeemed ? 0.7 : 1,
      }}
      role="article"
      aria-label={`${activity.name}, costs ${activity.cost} adventure bucks. ${activity.description}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className={isAccessible ? "text-5xl" : "text-3xl"} role="img" aria-hidden="true">
              {activity.icon}
            </span>
            <h3 className={`font-bold ${isAccessible ? "text-3xl" : "text-xl"}`}>
              {activity.name}
            </h3>
          </div>
          <p className={`opacity-90 ${isAccessible ? "text-xl leading-relaxed" : "text-sm"}`}>
            {activity.description}
          </p>
        </div>
        <div
          className={`text-right ${isAccessible ? "text-2xl" : "text-lg"} font-bold whitespace-nowrap`}
          style={{ color: theme.primary }}
        >
          {activity.cost} bucks
        </div>
      </div>

      {isRedeemed ? (
        <div
          className={`${buttonClasses} text-center`}
          style={{ backgroundColor: theme.primary, color: theme.background }}
        >
          Redeemed!
        </div>
      ) : (
        <button
          onClick={handleClick}
          disabled={!canAfford}
          className={buttonClasses}
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
