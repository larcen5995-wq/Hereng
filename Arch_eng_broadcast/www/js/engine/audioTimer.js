/* ==========================================================================
   VOCALIZE - 1-Hour Radio Ad Time & Monetization Simulator Engine
   Handles background playback time, voice alert before ads, & Pro/VIP unlocks
   ========================================================================== */

class AudioTimer {
  constructor() {
    this.intervalSeconds = 3600; // 1 hour default
    this.elapsedSeconds = 0;
    this.timerId = null;
    this.isProUnlocked = false;
    this.onAdTrigger = null;
    this.onTick = null;
  }

  setInterval(seconds) {
    this.intervalSeconds = seconds;
    this.reset();
  }

  start() {
    if (this.timerId || this.isProUnlocked) return;
    this.timerId = setInterval(() => {
      this.elapsedSeconds++;
      if (this.onTick) {
        this.onTick(this.getRemainingSeconds());
      }
      if (this.elapsedSeconds >= this.intervalSeconds) {
        this.triggerAdTime();
      }
    }, 1000);
  }

  pause() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  reset() {
    this.pause();
    this.elapsedSeconds = 0;
    if (this.onTick) this.onTick(this.getRemainingSeconds());
  }

  getRemainingSeconds() {
    const remain = this.intervalSeconds - this.elapsedSeconds;
    return remain > 0 ? remain : 0;
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  triggerAdTime() {
    this.pause();
    
    // Voice alert before ad
    if (window.ttsEngine) {
      window.ttsEngine.stop();
      window.ttsEngine.speakText('잠시 후 광고 타임입니다. 연속 학습 수고하셨습니다!', 'ko-KR', () => {
        if (this.onAdTrigger) this.onAdTrigger();
      });
    } else if (this.onAdTrigger) {
      this.onAdTrigger();
    }
  }
}

window.audioTimer = new AudioTimer();
