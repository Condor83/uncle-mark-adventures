"use client";

import { useState } from "react";
import { Theme } from "@/types";

interface AdventureRequestFormProps {
  personId: string;
  personName: string;
  theme: Theme;
  isAccessible?: boolean;
  onSuccess?: () => void;
}

export default function AdventureRequestForm({
  personId,
  personName,
  theme,
  isAccessible,
  onSuccess,
}: AdventureRequestFormProps) {
  const [requestText, setRequestText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personId,
          personName,
          requestText: requestText.trim(),
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setRequestText("");
        onSuccess?.();
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setError("Failed to submit. Please try again!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        className="rounded-2xl p-6 text-center animate-scale-in glass"
        style={{ backgroundColor: theme.cardBg }}
      >
        <div className={`mb-4 ${isAccessible ? "text-7xl" : "text-5xl"}`}>
          <span className="inline-block animate-bounce">🎉</span>
        </div>
        <h3
          className={`font-bold mb-2 ${isAccessible ? "text-3xl" : "text-xl"}`}
          style={{ fontFamily: theme.displayFont, color: theme.primary }}
        >
          Request Sent!
        </h3>
        <p className={`opacity-80 mb-4 ${isAccessible ? "text-xl" : "text-sm"}`}>
          Uncle Mark will review your adventure idea soon!
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className={`px-4 py-2 rounded-lg transition-colors ${isAccessible ? "text-lg px-6 py-3" : ""}`}
          style={{
            backgroundColor: `${theme.primary}20`,
            color: theme.primary,
          }}
        >
          Submit Another Idea
        </button>
      </div>
    );
  }

  return (
    <section
      className="animate-fade-in-up"
      style={{ animationDelay: "0.6s", opacity: 0, animationFillMode: "forwards" }}
      aria-labelledby="request-heading"
    >
      <h2
        id="request-heading"
        className={`font-bold mb-6 flex items-center gap-3 ${isAccessible ? "text-4xl" : "text-xl"}`}
        style={{ fontFamily: theme.displayFont }}
      >
        <span
          className="inline-block w-8 h-1 rounded-full"
          style={{ backgroundColor: theme.primary }}
        />
        Got an Adventure Idea?
      </h2>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl p-6 glass"
        style={{ backgroundColor: theme.cardBg }}
      >
        <label
          htmlFor="adventure-request"
          className={`block mb-3 opacity-80 ${isAccessible ? "text-xl" : "text-sm"}`}
        >
          Tell Uncle Mark what adventure you&apos;d like to go on together!
        </label>

        <textarea
          id="adventure-request"
          value={requestText}
          onChange={(e) => setRequestText(e.target.value)}
          placeholder="I'd love to..."
          maxLength={500}
          rows={isAccessible ? 4 : 3}
          className={`w-full rounded-xl p-4 resize-none transition-all focus:outline-none focus:ring-2 ${
            isAccessible ? "text-xl" : "text-base"
          }`}
          style={{
            backgroundColor: `${theme.background}80`,
            color: theme.textColor,
            borderColor: theme.primary,
            border: `1px solid ${theme.primary}40`,
          }}
          disabled={isSubmitting}
        />

        <div className="flex items-center justify-between mt-4">
          <span
            className={`opacity-50 ${isAccessible ? "text-lg" : "text-xs"}`}
          >
            {requestText.length}/500
          </span>

          <button
            type="submit"
            disabled={!requestText.trim() || isSubmitting}
            className={`font-bold rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
              isAccessible ? "px-8 py-4 text-xl" : "px-6 py-3 text-sm"
            }`}
            style={{
              backgroundColor: theme.primary,
              color: theme.background,
              boxShadow: requestText.trim() ? `0 0 20px ${theme.glowColor}` : "none",
            }}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Sending...
              </span>
            ) : (
              "Send to Uncle Mark"
            )}
          </button>
        </div>

        {error && (
          <p
            className={`mt-4 text-red-400 ${isAccessible ? "text-lg" : "text-sm"}`}
            role="alert"
          >
            {error}
          </p>
        )}
      </form>
    </section>
  );
}
