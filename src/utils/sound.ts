// utils/sound.ts
class SoundManager {
  private static instance: SoundManager;
  private successAudio: HTMLAudioElement | null = null;
  private clickAudio: HTMLAudioElement | null = null;
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
      this.successAudio = new Audio('/sounds/success.mp3');
      this.clickAudio = new Audio('/sounds/click.mp3');
      this.successAudio.volume = 0.5;
      this.clickAudio.volume = 0.3; // Lower volume for click sound
      
      await Promise.all([
        this.successAudio.load(),
        this.clickAudio.load()
      ]);

      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize audio:', error);
    }
  }

  public async playSuccess() {
    if (!this.successAudio) return;
    try {
      this.successAudio.currentTime = 0;
      await this.successAudio.play();
    } catch (error) {
      console.error('Failed to play success sound:', error);
    }
  }

  public async playClick() {
    if (!this.clickAudio) return;
    try {
      this.clickAudio.currentTime = 0;
      await this.clickAudio.play();
    } catch (error) {
      console.error('Failed to play click sound:', error);
    }
  }
}

export const soundManager = SoundManager.getInstance();