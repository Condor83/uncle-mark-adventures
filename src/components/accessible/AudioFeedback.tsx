"use client";

import { useCallback, useEffect, useRef } from "react";

interface AudioFeedbackProps {
  onReady?: () => void;
}

export function useAudioFeedback() {
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const speak = useCallback((text: string, priority: boolean = false) => {
    if (!synthRef.current) return;

    if (priority) {
      synthRef.current.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    synthRef.current.speak(utterance);
  }, []);

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

  const announceWelcome = useCallback((name: string, balance: number, activityCount: number) => {
    speak(`Hey ${name}! Welcome to your adventure bucks page! You have ${balance} adventure bucks to spend on ${activityCount} awesome activities with Uncle Mark. Scroll down to hear about each adventure!`);
  }, [speak]);

  return {
    speak,
    playSound,
    announceBalance,
    announceActivity,
    announceRedemption,
    announceWelcome,
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
