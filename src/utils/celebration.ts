// utils/celebration.ts
import confetti from "canvas-confetti";

class SoundManager {
  private static instance: SoundManager;
  private audio: HTMLAudioElement | null = null;
  private isInitialized = false;

  private constructor() {}

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  public async init() {
    if (this.isInitialized) return;

    try {
      this.audio = new Audio("/sounds/success.mp3");
      this.audio.volume = 0.5;

      // Pre-load the audio
      await this.audio.load();

      // Set up event listeners
      this.audio.addEventListener("error", (e) => {
        console.error("Audio error:", e);
      });

      this.isInitialized = true;
    } catch (error) {
      console.error("Failed to initialize audio:", error);
    }
  }

  public async playSound() {
    if (!this.audio) return;

    try {
      // Reset sound to start
      this.audio.currentTime = 0;

      // Check if context is suspended (autoplay restriction)
      if (this.audio.paused) {
        const playPromise = this.audio.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            if (error.name === "NotAllowedError") {
              console.log("Audio autoplay blocked by browser");
            } else {
              console.error("Audio playback error:", error);
            }
          });
        }
      }
    } catch (error) {
      console.error("Failed to play sound:", error);
    }
  }
}

export const triggerCelebration = async () => {
  const soundManager = SoundManager.getInstance();

  // Initialize sound on first use
  await soundManager.init();

  // Try to play sound
  await soundManager.playSound();

  // Visual celebration (confetti)
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#22c55e", "#3b82f6", "#f59e0b"],
  });

  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });
  }, 250);
};

export const initializeAudio = async () => {
  const soundManager = SoundManager.getInstance();
  await soundManager.init();
};
