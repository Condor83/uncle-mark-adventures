"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Activity } from "@/types";

interface AudioFeedbackProps {
  onReady?: () => void;
}

// Get the best available voice - prefer natural/premium voices
function getBestVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (voices.length === 0) return null;

  // Priority list of preferred voices (natural-sounding ones)
  const preferredVoices = [
    // macOS premium voices
    "Samantha",
    "Alex",
    "Evan",
    "Tom",
    // iOS/macOS enhanced
    "Samantha (Enhanced)",
    "Daniel",
    // Google voices (Chrome)
    "Google US English",
    "Google UK English Female",
    "Google UK English Male",
    // Microsoft voices (Edge/Windows)
    "Microsoft Zira",
    "Microsoft David",
    "Microsoft Mark",
    // Other natural voices
    "Karen",
    "Moira",
    "Tessa",
  ];

  // Try to find a preferred voice
  for (const preferred of preferredVoices) {
    const voice = voices.find(
      (v) => v.name.includes(preferred) && v.lang.startsWith("en")
    );
    if (voice) return voice;
  }

  // Fallback: find any English voice that's marked as local (usually better quality)
  const localEnglish = voices.find((v) => v.lang.startsWith("en") && v.localService);
  if (localEnglish) return localEnglish;

  // Final fallback: any English voice
  const anyEnglish = voices.find((v) => v.lang.startsWith("en"));
  return anyEnglish || voices[0];
}

export function useAudioFeedback() {
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const speakingQueueRef = useRef<string[]>([]);
  const isSpeakingRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    synthRef.current = window.speechSynthesis;

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const best = getBestVoice(voices);
      setVoice(best);
    };

    // Voices may load async
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const processQueue = useCallback(() => {
    if (!synthRef.current || isSpeakingRef.current || speakingQueueRef.current.length === 0) {
      return;
    }

    const text = speakingQueueRef.current.shift();
    if (!text) return;

    isSpeakingRef.current = true;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.05;
    utterance.volume = 1;

    if (voice) {
      utterance.voice = voice;
    }

    utterance.onend = () => {
      isSpeakingRef.current = false;
      // Small pause between utterances
      setTimeout(() => processQueue(), 300);
    };

    utterance.onerror = () => {
      isSpeakingRef.current = false;
      processQueue();
    };

    synthRef.current.speak(utterance);
  }, [voice]);

  const speak = useCallback((text: string, priority: boolean = false) => {
    if (!synthRef.current) return;

    if (priority) {
      synthRef.current.cancel();
      speakingQueueRef.current = [];
      isSpeakingRef.current = false;
    }

    speakingQueueRef.current.push(text);
    processQueue();
  }, [processQueue]);

  const speakSequence = useCallback((texts: string[]) => {
    texts.forEach((text) => {
      speakingQueueRef.current.push(text);
    });
    processQueue();
  }, [processQueue]);

  const playSound = useCallback((type: "click" | "success" | "error" | "balance") => {
    // Create simple audio feedback using Web Audio API
    if (typeof window === "undefined") return;

    const audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    const sounds: Record<string, { freq: number; duration: number; type: OscillatorType }> = {
      click: { freq: 800, duration: 0.1, type: "sine" },
      success: { freq: 523, duration: 0.3, type: "sine" },
      error: { freq: 200, duration: 0.3, type: "square" },
      balance: { freq: 440, duration: 0.2, type: "triangle" },
    };

    const sound = sounds[type];
    oscillator.frequency.value = sound.freq;
    oscillator.type = sound.type;
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + sound.duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + sound.duration);

    // Play success as ascending notes
    if (type === "success") {
      setTimeout(() => {
        const osc2 = audioContext.createOscillator();
        const gain2 = audioContext.createGain();
        osc2.connect(gain2);
        gain2.connect(audioContext.destination);
        osc2.frequency.value = 659;
        osc2.type = "sine";
        gain2.gain.setValueAtTime(0.3, audioContext.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        osc2.start(audioContext.currentTime);
        osc2.stop(audioContext.currentTime + 0.2);
      }, 150);

      setTimeout(() => {
        const osc3 = audioContext.createOscillator();
        const gain3 = audioContext.createGain();
        osc3.connect(gain3);
        gain3.connect(audioContext.destination);
        osc3.frequency.value = 784;
        osc3.type = "sine";
        gain3.gain.setValueAtTime(0.3, audioContext.currentTime);
        gain3.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        osc3.start(audioContext.currentTime);
        osc3.stop(audioContext.currentTime + 0.3);
      }, 300);
    }
  }, []);

  const announceBalance = useCallback((balance: number) => {
    playSound("balance");
    speak(`Your current balance is ${balance} adventure bucks.`);
  }, [speak, playSound]);

  const announceActivity = useCallback((name: string, cost: number, description: string) => {
    speak(`${name}. Costs ${cost} adventure bucks. ${description}`);
  }, [speak]);

  const announceRedemption = useCallback((activityName: string, newBalance: number) => {
    playSound("success");
    setTimeout(() => {
      speak(`Awesome! You redeemed ${activityName}! Your new balance is ${newBalance} adventure bucks. Uncle Mark will be in touch to schedule your adventure!`, true);
    }, 500);
  }, [speak, playSound]);

  const announceWelcome = useCallback((name: string, balance: number, activityCount: number, personalMessage?: string) => {
    const messages: string[] = [
      `Hey ${name}! Welcome to your adventure bucks page!`,
    ];

    if (personalMessage) {
      messages.push(personalMessage);
    }

    messages.push(`You have ${balance} adventure bucks to spend on ${activityCount} awesome activities with Uncle Mark.`);

    speakSequence(messages);
  }, [speakSequence]);

  const announceAllActivities = useCallback((activities: Activity[], canAffordCheck: (cost: number) => boolean) => {
    if (activities.length === 0) {
      speak("No adventures are available right now, but check back soon!");
      return;
    }

    const messages: string[] = [
      `Here are your ${activities.length} available adventures:`,
    ];

    activities.forEach((activity, index) => {
      const canAfford = canAffordCheck(activity.cost);
      const affordText = canAfford
        ? "You can afford this one!"
        : "You'll need more adventure bucks for this.";

      messages.push(
        `Adventure ${index + 1}: ${activity.name}. ` +
        `It costs ${activity.cost} adventure bucks. ` +
        `${activity.description} ` +
        `${affordText}`
      );
    });

    messages.push(
      "To redeem an adventure, tap on it and confirm. Uncle Mark will get notified and reach out to plan your adventure together!"
    );

    speakSequence(messages);
  }, [speak, speakSequence]);

  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      speakingQueueRef.current = [];
      isSpeakingRef.current = false;
    }
  }, []);

  return {
    speak,
    speakSequence,
    playSound,
    announceBalance,
    announceActivity,
    announceRedemption,
    announceWelcome,
    announceAllActivities,
    stopSpeaking,
  };
}

export default function AudioFeedback({ onReady }: AudioFeedbackProps) {
  const { speak } = useAudioFeedback();

  useEffect(() => {
    // Wait for speech synthesis to be ready
    if (typeof window !== "undefined" && window.speechSynthesis) {
      onReady?.();
    }
  }, [onReady]);

  return null;
}
