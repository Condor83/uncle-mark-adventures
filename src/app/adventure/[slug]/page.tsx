"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { Person, Activity, Theme, Redemption, Photo } from "@/types";
import BalanceDisplay from "@/components/BalanceDisplay";
import ActivityCard from "@/components/ActivityCard";
import RedemptionConfirm from "@/components/RedemptionConfirm";
import { ThemeBackground } from "@/components/ThemeBackgrounds";
import PhotoGallery from "@/components/PhotoGallery";
import AdventureRequestForm from "@/components/AdventureRequestForm";
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
  const [photos, setPhotos] = useState<Photo[]>([]);
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
        // First fetch person data
        const personRes = await fetch(`/api/person/${slug}`);

        if (!personRes.ok) {
          if (personRes.status === 404) {
            setError("Hmm, we couldn't find your adventure page. Check your QR code and try again!");
          } else {
            throw new Error("Failed to load page");
          }
          return;
        }

        const personData = await personRes.json();

        // Then fetch activities filtered for this person
        const activitiesRes = await fetch(`/api/activities?person=${encodeURIComponent(personData.person.name)}`);
        const activitiesData = await activitiesRes.json();

        // Fetch photos for this person
        const photosRes = await fetch(`/api/photos?person=${encodeURIComponent(personData.person.name)}`);
        const photosData = await photosRes.json();

        setPageData(personData);
        setActivities(activitiesData.activities || []);
        setPhotos(photosData.photos || []);
      } catch (err) {
        setError("Something went wrong. Please try again!");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  // Announce welcome and activities for accessible users
  useEffect(() => {
    if (isAccessible && pageData && activities.length > 0 && audioEnabled) {
      audio.announceWelcome(
        pageData.person.name,
        pageData.person.balance,
        activities.length,
        pageData.theme.personalMessage
      );
      // Announce all activities after the welcome (with a small delay)
      setTimeout(() => {
        audio.announceAllActivities(activities, (cost) => pageData.person.balance >= cost);
      }, 500);
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-20 h-20 border-4 border-white/20 rounded-full" />
            <div
              className="absolute inset-0 w-20 h-20 border-4 border-t-white rounded-full"
              style={{ animation: 'spin 1s linear infinite' }}
            />
          </div>
          <p className="text-xl text-white mt-6 animate-pulse">Loading your adventures...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black p-4">
        <div className="text-center max-w-md">
          <div className="text-7xl mb-6">😕</div>
          <h1 className="text-3xl font-bold text-white mb-4">Oops!</h1>
          <p className="text-gray-400 text-lg">{error || "Something went wrong"}</p>
        </div>
      </div>
    );
  }

  const { person, theme } = pageData;

  return (
    <main
      className="min-h-screen relative overflow-hidden"
      style={{
        background: theme.backgroundGradient,
        color: theme.textColor,
        fontFamily: theme.fontFamily,
      }}
    >
      {/* Grain overlay for texture */}
      <div className="fixed inset-0 pointer-events-none grain" />

      {/* Theme-specific animated background */}
      <ThemeBackground themeId={theme.themeId} />

      {/* Audio enable button for accessible version */}
      {isAccessible && !audioEnabled && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4">
          <div className="text-center max-w-md animate-scale-in">
            <div
              className="w-32 h-32 mx-auto mb-8 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: theme.primary,
                boxShadow: `0 0 80px ${theme.glowColor}`,
              }}
            >
              <span className="text-6xl">🔊</span>
            </div>
            <h1 className="text-5xl font-bold mb-6" style={{ color: theme.primary }}>
              Hey Ezra!
            </h1>
            <p className="text-2xl mb-10 leading-relaxed text-white/90">
              Tap the button below to enable audio. This page will read everything out loud for you!
            </p>
            <button
              onClick={handleEnableAudio}
              className="w-full py-8 px-6 rounded-2xl text-3xl font-bold border-4 transition-transform hover:scale-105"
              style={{
                backgroundColor: theme.primary,
                color: theme.background,
                borderColor: theme.accent,
                boxShadow: `0 0 40px ${theme.glowColor}`,
              }}
              aria-label="Enable audio and start exploring"
            >
              Enable Audio & Start
            </button>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className={`relative z-10 py-10 px-4 ${isAccessible ? "py-12 px-6" : ""}`}>
        <div className={`max-w-2xl mx-auto ${isAccessible ? "space-y-10" : "space-y-8"}`}>
          {/* Header */}
          <header className="text-center animate-fade-in-up">
            {/* Floating icon */}
            <div
              className={`inline-block mb-4 animate-float ${isAccessible ? "text-8xl" : "text-6xl"}`}
              role="img"
              aria-hidden="true"
            >
              {theme.icon}
            </div>

            {/* Welcome message with glow */}
            <h1
              className={`font-black mb-3 leading-tight ${isAccessible ? "text-5xl" : "text-3xl md:text-4xl"}`}
              style={{
                fontFamily: theme.displayFont,
                color: theme.primary,
                textShadow: `0 0 40px ${theme.glowColor}`,
              }}
            >
              {theme.welcomeMessage}
            </h1>

            {/* Subtitle */}
            <p
              className={`opacity-70 tracking-wider uppercase ${isAccessible ? "text-2xl" : "text-sm"}`}
              style={{ letterSpacing: '0.2em' }}
            >
              Uncle Mark&apos;s Adventure Bucks
            </p>

            {/* Decorative line */}
            <div
              className="mx-auto mt-6 h-px w-32 opacity-30"
              style={{
                background: `linear-gradient(90deg, transparent, ${theme.primary}, transparent)`,
              }}
            />
          </header>

          {/* Personal Message */}
          {theme.personalMessage && (
            <section
              className="animate-fade-in-up text-center"
              style={{ animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}
            >
              <div
                className="rounded-2xl p-6 glass"
                style={{ backgroundColor: theme.cardBg }}
              >
                <p
                  className={`leading-relaxed ${isAccessible ? "text-2xl" : "text-base md:text-lg"}`}
                  style={{ fontFamily: theme.fontFamily }}
                >
                  {theme.personalMessage}
                </p>
              </div>
            </section>
          )}

          {/* Balance */}
          <BalanceDisplay balance={person.balance} theme={theme} isAccessible={isAccessible} />

          {/* Activities */}
          <section aria-labelledby="activities-heading">
            <h2
              id="activities-heading"
              className={`font-bold mb-6 flex items-center gap-3 ${isAccessible ? "text-4xl" : "text-xl"}`}
              style={{ fontFamily: theme.displayFont }}
            >
              <span
                className="inline-block w-8 h-1 rounded-full"
                style={{ backgroundColor: theme.primary }}
              />
              Available Adventures
            </h2>

            {activities.length === 0 ? (
              <div
                className="text-center py-12 px-6 rounded-2xl glass animate-fade-in-up"
                style={{ backgroundColor: theme.cardBg }}
              >
                <div className="text-6xl mb-4 animate-bounce">🎄</div>
                <p
                  className="font-bold text-xl mb-2"
                  style={{ fontFamily: theme.displayFont }}
                >
                  Adventures Coming Soon!
                </p>
                <p className="opacity-70">
                  Uncle Mark is planning some awesome activities. Check back soon!
                </p>
              </div>
            ) : (
              <div className={`space-y-4 ${isAccessible ? "space-y-8" : ""}`}>
                {activities.map((activity, index) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    theme={theme}
                    onRedeem={handleRedeem}
                    isRedeemed={isActivityRedeemed(activity.id)}
                    canAfford={person.balance >= activity.cost}
                    isAccessible={isAccessible}
                    index={index}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Photo Gallery */}
          {photos.length > 0 && (
            <PhotoGallery
              photos={photos}
              theme={theme}
              personName={person.name}
              isAccessible={isAccessible}
            />
          )}

          {/* Adventure Request Form */}
          <AdventureRequestForm
            personId={person.id}
            personName={person.name}
            theme={theme}
            isAccessible={isAccessible}
          />

          {/* Footer */}
          <footer
            className={`text-center pt-10 pb-4 opacity-50 animate-fade-in-up ${isAccessible ? "text-xl" : "text-sm"}`}
            style={{ animationDelay: '0.8s', opacity: 0, animationFillMode: 'forwards' }}
          >
            <p className="mb-1">Made with ❤️ by Uncle Mark</p>
            <p>Merry Christmas 2025!</p>
          </footer>
        </div>
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
