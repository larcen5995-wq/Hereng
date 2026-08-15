/* ==========================================================================
   VOCALIZE - Web Speech Synthesis Engine (v1.62 Clean Single Audio Producer)
   Delegates 100% Audio Output to Native Service on Android to Prevent AudioFocus Mute Collisions
   ========================================================================== */

const MASTER_ENGLISH_TEACHERS = [
  { id: 'en_1', name: '🇺🇸 [미국 영어] 대표 여성 원어민 (Aria)', pitch: 1.0, rate: 1.0, keyword: 'Aria', neuralVoice: 'en-US-AriaNeural' },
  { id: 'en_2', name: '🇺🇸 [미국 영어] Jenny (따뜻한 미국 여성)', pitch: 1.0, rate: 1.0, keyword: 'Jenny', neuralVoice: 'en-US-JennyNeural' },
  { id: 'en_3', name: '🇺🇸 [미국 영어] Guy (30대 미국 남성)', pitch: 1.0, rate: 1.0, keyword: 'Guy', neuralVoice: 'en-US-GuyNeural' },
  { id: 'en_4', name: '🇺🇸 [미국 영어] Christopher (차분한 미국 남성 낭독가)', pitch: 1.0, rate: 1.0, keyword: 'Christopher', neuralVoice: 'en-US-ChristopherNeural' },
  { id: 'en_5', name: '🇬🇧 [영국 영어] Sonia (정통 영국 BBC 여성 아나운서)', pitch: 1.0, rate: 1.0, keyword: 'Sonia', neuralVoice: 'en-GB-SoniaNeural' },
  { id: 'en_6', name: '🇬🇧 [영국 영어] Ryan (정통 영국 신사 남성)', pitch: 1.0, rate: 1.0, keyword: 'Ryan', neuralVoice: 'en-GB-RyanNeural' },
  { id: 'en_7', name: '🇦🇺 [호주 영어] Natasha (호주 여성 원어민)', pitch: 1.0, rate: 1.0, keyword: 'Natasha', neuralVoice: 'en-AU-NatashaNeural' },
  { id: 'en_8', name: '🇦🇺 [호주 영어] William (호주 남성 원어민)', pitch: 1.0, rate: 1.0, keyword: 'William', neuralVoice: 'en-AU-WilliamNeural' }
];

const MASTER_KOREAN_TEACHERS = [
  { id: 'ko_1', name: '🇰🇷 [한국어 해설] 표준 여성 음성 (기본 맑은 대표 음성)', pitch: 1.0, rate: 1.0, keyword: 'Google', neuralVoice: 'ko-KR-SunHiNeural' },
  { id: 'ko_2', name: '🇰🇷 [한국어 해설] 선희 (20대 맑은 여성 아나운서)', pitch: 1.0, rate: 1.0, keyword: 'SunHi', neuralVoice: 'ko-KR-SunHiNeural' },
  { id: 'ko_3', name: '🇰🇷 [한국어 해설] 인준 (30대 정통 남성 아나운서)', pitch: 1.0, rate: 1.0, keyword: 'InJoon', neuralVoice: 'ko-KR-InJoonNeural' },
  { id: 'ko_4', name: '🇰🇷 [한국어 해설] 현수 (30대 남성 튜터)', pitch: 1.0, rate: 1.0, keyword: 'Hyunsu', neuralVoice: 'ko-KR-HyunsuMultilingualNeural' }
];

const MASTER_JAPANESE_TEACHERS = [
  { id: 'ja_1', name: '🇯🇵 [일본어 해설] 표준 여성 음성', pitch: 1.0, rate: 1.0, keyword: 'Google', neuralVoice: 'ja-JP-NanamiNeural' },
  { id: 'ja_2', name: '🇯🇵 [일본어 해설] 차분한 남성 음성', pitch: 1.0, rate: 1.0, keyword: 'Keita', neuralVoice: 'ja-JP-KeitaNeural' }
];

class TTSEngine {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.voices = [];
    this.targetLang = 'en-US';
    this.explanationLang = 'ko-KR';
    this.rate = 1.0;
    this.pitch = 1.0;
    this.selectedTargetTeacher = MASTER_ENGLISH_TEACHERS[0];
    this.selectedExplanationTeacher = MASTER_KOREAN_TEACHERS[0];
    this.playlist = [];
    // this.currentIndex preserved for requested card start index
    this.isPlaying = false;
    this.targetRepeatCount = 3;
    this.explanationRepeatCount = 1;
    this.delayNextCard = 500;
    this.isShuffle = false;

    this.onSpeechStart = null;
    this.onSpeechEnd = null;
    this.onCardChange = null;

    this.activeTimerId = null;
    this.initVoices();
  }

  initVoices() {
    if (!this.synth) return;
    this.populateVoiceList();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => this.populateVoiceList();
    }
  }

  populateVoiceList() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  setLanguages(targetLang, expLang) {
    this.targetLang = targetLang;
    this.explanationLang = expLang;
    const targetTeachers = this.getTeacherListForLang(targetLang);
    const expTeachers = this.getTeacherListForLang(expLang);
    this.selectedTargetTeacher = targetTeachers[0] || null;
    this.selectedExplanationTeacher = expTeachers[0] || null;
  }

  getTeacherListForLang(langCode) {
    if (langCode.startsWith('ko')) return MASTER_KOREAN_TEACHERS;
    if (langCode.startsWith('ja')) return MASTER_JAPANESE_TEACHERS;
    return MASTER_ENGLISH_TEACHERS;
  }

  setPlaylist(items) {
    this.playlist = items || [];
    // this.currentIndex preserved for requested card start index
  }

  clearPendingTimer() {
    if (this.activeTimerId) {
      clearTimeout(this.activeTimerId);
      this.activeTimerId = null;
    }
  }

  stop() {
    this.isPlaying = false;
    this.clearPendingTimer();
    try {
      if (window.AndroidNativeTTS && typeof window.AndroidNativeTTS.pauseNativePlaylist === 'function') {
        window.AndroidNativeTTS.pauseNativePlaylist();
      }
    } catch(e){}
    if (this.synth) {
      try { this.synth.cancel(); } catch(e){}
    }
    if (this.onSpeechEnd) this.onSpeechEnd();
  }

  play() {
    if (!this.playlist || this.playlist.length === 0) return;
    this.isPlaying = true;

    // Check if running inside Android Native App
    if (window.AndroidNativeTTS && typeof window.AndroidNativeTTS.startNativePlaylist === 'function') {
      try {
        const jsonStr = JSON.stringify(this.playlist);
        const tRepeats = Math.max(1, this.targetRepeatCount || 3);
        const eRepeats = Math.max(0, this.explanationRepeatCount || 1);
        window.AndroidNativeTTS.startNativePlaylist(jsonStr, this.currentIndex, tRepeats, eRepeats);
        if (this.onSpeechStart) this.onSpeechStart();
        return; // Delegate 100% of audio playback to Native Java Service
      } catch(e){}
    }

    // Fallback for Web Browser Environment ONLY
    this.speakCurrentCardWebBrowser();
  }

  pause() {
    this.isPlaying = false;
    this.clearPendingTimer();
    try {
      if (window.AndroidNativeTTS && typeof window.AndroidNativeTTS.pauseNativePlaylist === 'function') {
        window.AndroidNativeTTS.pauseNativePlaylist();
      }
    } catch(e){}
    if (this.synth) {
      try { this.synth.cancel(); } catch(e){}
    }
    if (this.onSpeechEnd) this.onSpeechEnd();
  }

  speakCurrentCardWebBrowser() {
    if (!this.isPlaying || !this.playlist || this.playlist.length === 0) return;
    this.clearPendingTimer();

    if (this.currentIndex < 0 || this.currentIndex >= this.playlist.length) {
      // this.currentIndex preserved for requested card start index
    }

    const item = this.playlist[this.currentIndex];
    if (!item) return;

    if (this.onCardChange) {
      this.onCardChange(item, this.currentIndex);
    }

    let currentStep = 0;
    const totalTargetRepeats = Math.max(1, this.targetRepeatCount || 3);
    const totalExpRepeats = Math.max(0, this.explanationRepeatCount || 1);
    const totalSteps = totalTargetRepeats + totalExpRepeats;

    const speakNextStep = () => {
      if (!this.isPlaying) return;

      if (currentStep >= totalSteps) {
        this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
        this.activeTimerId = setTimeout(() => {
          this.speakCurrentCardWebBrowser();
        }, this.delayNextCard || 500);
        return;
      }

      const isTargetTurn = (currentStep < totalTargetRepeats);
      const textToSpeak = isTargetTurn ? item.target : (item.translation || item.target);
      const langCode = isTargetTurn ? 'en-US' : 'ko-KR';

      if (!textToSpeak || textToSpeak.trim().length === 0) {
        currentStep++;
        speakNextStep();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = langCode;
      utterance.rate = this.rate || 1.0;
      utterance.pitch = this.pitch || 1.0;

      utterance.onstart = () => {
        if (this.onSpeechStart) this.onSpeechStart();
      };

      utterance.onend = () => {
        currentStep++;
        this.activeTimerId = setTimeout(() => {
          speakNextStep();
        }, 300);
      };

      utterance.onerror = (err) => {
        currentStep++;
        this.activeTimerId = setTimeout(() => {
          speakNextStep();
        }, 300);
      };

      if (this.synth) {
        try { this.synth.cancel(); } catch(e){}
        this.synth.speak(utterance);
      }
    };

    speakNextStep();
  }

  nextCard() {
    if (!this.playlist || this.playlist.length === 0) return;
    this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
    this.play();
  }

  prevCard() {
    if (!this.playlist || this.playlist.length === 0) return;
    this.currentIndex = (this.currentIndex - 1 + this.playlist.length) % this.playlist.length;
    this.play();
  }

  toggleShuffle() {
    this.isShuffle = !this.isShuffle;
    return this.isShuffle;
  }
}

window.ttsEngine = new TTSEngine();

// Connect Native Service Index Change Callback to Web UI
window.onNativeCardIndexChanged = function(index) {
  try {
    if (window.ttsEngine) {
      window.ttsEngine.currentIndex = index;
    }
    if (typeof window.updateAppUI === 'function') {
      window.updateAppUI(index);
    }
  } catch(e) {}
};
