"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { Person, Activity, Theme, Redemption } from "@/types";
import BalanceDisplay from "@/components/BalanceDisplay";
import ActivityCard from "@/components/ActivityCard";
import RedemptionConfirm from "@/components/RedemptionConfirm";
import { useAudioFeedback } from "@/components/accessible/AudioFeedback";

interface PageData {
  person: Person;
  theme: Theme;
  redemptions: Redemption[];
}

export default function AdventurePage() {
  const params = useParams();
  const slug = params.slug as string;

  const [pageData, setPageData] = useState<PageData | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const audio = useAudioFeedback();

  const isAccessible = pageData?.theme?.isAccessible ?? false;

  // Fetch person data and activities
  useEffect(() => {
    async function fetchData() {
      try {
        const [personRes, activitiesRes] = await Promise.all([
          fetch(`/api/person/${slug}`),
          fetch("/api/activities"),
        ]);

        if (!personRes.ok) {
          if (personRes.status === 404) {
            setError("Hmm, we couldn't find your adventure page. Check your QR code and try again!");
          } else {
            throw new Error("Failed to load page");
          }
          return;
        }

        const personData = await personRes.json();
        const activitiesData = await activitiesRes.json();

        setPageData(personData);
        setActivities(activitiesData.activities || []);
      } catch (err) {
        setError("Something went wrong. Please try again!");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  // Announce welcome for accessible users
  useEffect(() => {
    if (isAccessible && pageData && activities.length > 0 && audioEnabled) {
      audio.announceWelcome(pageData.person.name, pageData.person.balance, activities.length);
    }
  }, [isAccessible, pageData, activities, audioEnabled, audio]);

  const handleEnableAudio = useCallback(() => {
    setAudioEnabled(true);
    audio.playSound("success");
  }, [audio]);

  const handleRedeem = useCallback((activity: Activity) => {
    if (isAccessible) {
      audio.playSound("click");
      audio.announceActivity(activity.name, activity.cost, activity.description);
    }
    setSelectedActivity(activity);
  }, [isAccessible, audio]);

  const handleConfirmRedeem = useCallback(async () => {
    if (!selectedActivity || !pageData) return;

    setIsRedeeming(true);

    try {
      const res = await fetch("/api/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personId: pageData.person.id,
          activityId: selectedActivity.id,
          currentBalance: pageData.person.balance,
          activityCost: selectedActivity.cost,
        }),
      });

      const data = await res.json();

      if (data.success) {
        // Update local state
        setPageData((prev) =>
          prev
            ? {
                ...prev,
                person: { ...prev.person, balance: data.newBalance },
                redemptions: [
                  ...prev.redemptions,
                  {
                    id: `temp-${Date.now()}`,
                    personId: prev.person.id,
                    activityId: selectedActivity.id,
                    redeemedAt: new Date().toISOString(),
                  },
                ],
              }
            : null
        );

        if (isAccessible) {
          audio.announceRedemption(selectedActivity.name, data.newBalance);
        }

        setSelectedActivity(null);
      } else {
        if (isAccessible) {
          audio.playSound("error");
          audio.speak("Sorry, something went wrong. Please try again.");
        }
      }
    } catch (err) {
      console.error("Redemption error:", err);
      if (isAccessible) {
        audio.playSound("error");
      }
    } finally {
      setIsRedeeming(false);
    }
  }, [selectedActivity, pageData, isAccessible, audio]);

  const handleCancelRedeem = useCallback(() => {
    if (isAccessible) {
      audio.playSound("click");
    }
    setSelectedActivity(null);
  }, [isAccessible, audio]);

  const isActivityRedeemed = useCallback(
    (activityId: string) => {
      return pageData?.redemptions.some((r) => r.activityId === activityId) ?? false;
    },
    [pageData]
  );

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🎁</div>
          <p className="text-xl text-white">Loading your adventures...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-white mb-2">Oops!</h1>
          <p className="text-gray-300">{error || "Something went wrong"}</p>
        </div>
      </div>
    );
  }

  const { person, theme } = pageData;

  return (
    <main
      className="min-h-screen py-8 px-4"
      style={{
        background: theme.backgroundGradient,
        color: theme.textColor,
        fontFamily: theme.fontFamily,
      }}
    >
      {/* Audio enable button for accessible version */}
      {isAccessible && !audioEnabled && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="text-center max-w-md">
            <h1 className="text-4xl font-bold mb-6" style={{ color: theme.primary }}>
              Hey Ezra!
            </h1>
            <p className="text-2xl mb-8 leading-relaxed">
              Tap the button below to enable audio. This page will read everything out loud for you!
            </p>
            <button
              onClick={handleEnableAudio}
              className="w-full py-8 px-6 rounded-2xl text-3xl font-bold border-4"
              style={{
                backgroundColor: theme.primary,
                color: theme.background,
                borderColor: theme.accent,
              }}
              aria-label="Enable audio and start exploring"
            >
              🔊 Enable Audio
            </button>
          </div>
        </div>
      )}

      <div className={`max-w-2xl mx-auto ${isAccessible ? "space-y-8" : "space-y-6"}`}>
        {/* Header */}
        <header className="text-center">
          <div className={`mb-2 ${isAccessible ? "text-7xl" : "text-5xl"}`} role="img" aria-hidden="true">
            {theme.icon}
          </div>
          <h1
            className={`font-bold mb-2 ${isAccessible ? "text-5xl" : "text-3xl"}`}
            style={{ color: theme.primary }}
          >
            {theme.welcomeMessage}
          </h1>
          <p className={`opacity-80 ${isAccessible ? "text-2xl" : "text-lg"}`}>
            Uncle Mark&apos;s Adventure Bucks
          </p>
        </header>

        {/* Balance */}
        <BalanceDisplay balance={person.balance} theme={theme} isAccessible={isAccessible} />

        {/* Activities */}
        <section aria-labelledby="activities-heading">
          <h2
            id="activities-heading"
            className={`font-bold mb-4 ${isAccessible ? "text-3xl" : "text-xl"}`}
          >
            Available Adventures
          </h2>

          {activities.length === 0 ? (
            <div
              className={`text-center p-8 rounded-xl ${isAccessible ? "text-2xl" : ""}`}
              style={{ backgroundColor: theme.cardBg }}
            >
              <p className="text-4xl mb-4">🎄</p>
              <p className="font-semibold mb-2">Adventures Coming Soon!</p>
              <p className="opacity-80">
                Uncle Mark is planning some awesome activities. Check back after Christmas!
              </p>
            </div>
          ) : (
            <div className={`space-y-4 ${isAccessible ? "space-y-6" : ""}`}>
              {activities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  theme={theme}
                  onRedeem={handleRedeem}
                  isRedeemed={isActivityRedeemed(activity.id)}
                  canAfford={person.balance >= activity.cost}
                  isAccessible={isAccessible}
                />
              ))}
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className={`text-center opacity-60 pt-8 ${isAccessible ? "text-xl" : "text-sm"}`}>
          <p>Made with ❤️ by Uncle Mark</p>
          <p className="mt-1">Merry Christmas 2025!</p>
        </footer>
      </div>

      {/* Redemption confirmation modal */}
      {selectedActivity && (
        <RedemptionConfirm
          activity={selectedActivity}
          theme={theme}
          currentBalance={person.balance}
          onConfirm={handleConfirmRedeem}
          onCancel={handleCancelRedeem}
          isLoading={isRedeeming}
          isAccessible={isAccessible}
        />
      )}
    </main>
  );
}
