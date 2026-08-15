/* ==========================================================================
   VOCALIZE - Web Speech Synthesis Engine (v1.62 Clean Single Audio Producer)
   Delegates 100% Audio Output to Native Service on Android to Prevent AudioFocus Mute Collisions
   ========================================================================== */

const MASTER_ENGLISH_TEACHERS = [
  { id: 'en_1', name: '🇺🇸 [미국 영어] 대표 여성 원어민 (Aria)', pitch: 1.0, rate: 0.98, keyword: 'Aria', neuralVoice: 'en-US-AriaNeural' }
];

const MASTER_KOREAN_TEACHERS = [
  { id: 'ko_1', name: '🇰🇷 [한국어 해설] 표준 여성 음성 (기본 맑은 대표 음성)', pitch: 1.0, rate: 0.95, keyword: 'SunHi', neuralVoice: 'ko-KR-SunHiNeural' }
];

const MASTER_JAPANESE_TEACHERS = [
  { id: 'ja_1', name: '🇯🇵 [일본어 해설] 표준 여성 음성 (Nanami)', pitch: 1.0, rate: 0.98, keyword: 'Nanami', neuralVoice: 'ja-JP-NanamiNeural' }
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
        // Pass lightweight 1-to-1 indexed playlist items to guarantee perfect index alignment
        const compactPlaylist = this.playlist.map(item => ({
          target: item.target || "",
          translation: item.translation || "",
          phonetic: item.phonetic || ""
        }));
        const jsonStr = JSON.stringify(compactPlaylist);
        const tRepeats = Math.max(1, this.targetRepeatCount || 3);
        const eRepeats = Math.max(0, this.explanationRepeatCount || 1);
        window.AndroidNativeTTS.startNativePlaylist(jsonStr, this.currentIndex, tRepeats, eRepeats);
        if (this.onSpeechStart) this.onSpeechStart();
        return; // Delegate 100% of audio playback to Native Java Service
      } catch(e) {
        console.error('Native TTS Bridge Exception:', e);
      }
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
    try { if (this.synth) this.synth.cancel(); } catch(e){}

    if (this.currentIndex < 0 || this.currentIndex >= this.playlist.length) {
      this.currentIndex = 0;
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

    const currentCardIdxAtStart = this.currentIndex;

    const speakNextStep = () => {
      if (!this.isPlaying || this.currentIndex !== currentCardIdxAtStart) return;

      if (currentStep >= totalSteps) {
        this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
        this.activeTimerId = setTimeout(() => {
          this.speakCurrentCardWebBrowser();
        }, this.delayNextCard || 500);
        return;
      }

      const isTargetTurn = (currentStep < totalTargetRepeats);
      let textToSpeak = isTargetTurn ? item.target : (item.translation || item.target);
      const langCode = isTargetTurn ? 'en-US' : 'ko-KR';

      if (!isTargetTurn && textToSpeak) {
        textToSpeak = textToSpeak.replace(/~/g, '뭐뭐');
      }
      // Strip all noise symbols / :: : ; [] () - _ from TTS speech text
      if (textToSpeak) {
        textToSpeak = textToSpeak.replace(/[\/::;:\[\]\(\)\-\_]/g, ' ').replace(/\s+/g, ' ').trim();
      }

      if (!textToSpeak || textToSpeak.trim().length === 0) {
        currentStep++;
        speakNextStep();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      window._activeUtterance = utterance;
      this.activeUtterance = utterance;
      utterance.lang = langCode;

      let teacher = isTargetTurn ? this.selectedTargetTeacher : this.selectedExplanationTeacher;

      // Pure 100% un-distorted natural voice settings (Zero artificial filter distortion)
      utterance.pitch = 1.0;
      utterance.rate = 0.95;

      // Always dynamically refresh voices list from synth
      this.voices = this.synth ? this.synth.getVoices() : [];

      if (this.voices && this.voices.length > 0) {
        const langPrefix = langCode.substring(0, 2).toLowerCase();
        const langVoices = this.voices.filter(v => v.lang && v.lang.toLowerCase().replace('_', '-').startsWith(langPrefix));
        
        if (teacher && teacher.keyword && langVoices.length > 0) {
          const kw = teacher.keyword.toLowerCase();
          const keywordMatch = langVoices.find(v => v.name && v.name.toLowerCase().includes(kw));
          if (keywordMatch) utterance.voice = keywordMatch;
        }
        
        if (!utterance.voice && langVoices.length > 0) {
          const teacherList = this.getTeacherListForLang(langCode);
          const teacherIdx = teacherList ? (teacherList.indexOf(teacher) % langVoices.length) : 0;
          const naturalVoices = langVoices.filter(v => v.name && !v.name.includes('Heami'));
          const voicePool = naturalVoices.length > 0 ? naturalVoices : langVoices;
          const assignedIdx = (teacherIdx >= 0 && teacherIdx < voicePool.length) ? teacherIdx : 0;
          utterance.voice = voicePool[assignedIdx] || langVoices[0];
        }
      }

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

  next() {
    this.nextCard();
  }

  previous() {
    this.prevCard();
  }

  toggleShuffle() {
    this.isShuffle = !this.isShuffle;
    return this.isShuffle;
  }

  testTeacherSample(teacherObj, langCode, sampleText) {
    if (!sampleText) return;
    try {
      if (this.synth) {
        try { this.synth.cancel(); } catch(e){}
        try { this.synth.resume(); } catch(e){}
        let cleanText = sampleText.replace(/[\/::;:\[\]\(\)\-\_]/g, ' ').replace(/\s+/g, ' ').trim();
        const utterance = new SpeechSynthesisUtterance(cleanText);
        window._activeUtterance = utterance;
        this.activeUtterance = utterance;
        utterance.lang = langCode;
        utterance.rate = 0.95;
        utterance.pitch = 1.0;

        this.voices = this.synth ? this.synth.getVoices() : [];

        if (this.voices && this.voices.length > 0) {
          const langPrefix = langCode.substring(0, 2).toLowerCase();
          const langVoices = this.voices.filter(v => v.lang && v.lang.toLowerCase().replace('_', '-').startsWith(langPrefix));
          if (teacherObj && teacherObj.keyword && langVoices.length > 0) {
            const kw = teacherObj.keyword.toLowerCase();
            const match = langVoices.find(v => v.name && v.name.toLowerCase().includes(kw));
            if (match) utterance.voice = match;
          }
          if (!utterance.voice && langVoices.length > 0) {
            const teacherList = this.getTeacherListForLang(langCode);
            const teacherIdx = teacherList ? (teacherList.indexOf(teacherObj) % langVoices.length) : 0;
            const naturalVoices = langVoices.filter(v => v.name && !v.name.includes('Heami'));
            const voicePool = naturalVoices.length > 0 ? naturalVoices : langVoices;
            const assignedIdx = (teacherIdx >= 0 && teacherIdx < voicePool.length) ? teacherIdx : 0;
            utterance.voice = voicePool[assignedIdx] || langVoices[0];
          }
        }

        this.synth.speak(utterance);
      }
    } catch(e) {
      console.log('testTeacherSample Error:', e);
    }
  }

  speakTarget(text) {
    if (!text) return;
    let targetLangCode = 'en-US';
    if (/[\uac00-\ud7a3]/.test(text)) {
      targetLangCode = 'ko-KR';
    }
    this.speakText(text, targetLangCode);
  }

  speakExplanation(text) {
    if (!text) return;
    let expLangCode = 'ko-KR';
    if (/[a-zA-Z]/.test(text) && !/[\uac00-\ud7a3]/.test(text)) {
      expLangCode = 'en-US';
    }
    this.speakText(text, expLangCode);
  }

  speakText(text, langCode = 'ko-KR', onEndCallback = null) {
    if (!text) {
      if (onEndCallback) onEndCallback();
      return;
    }
    try {
      if (this.synth) {
        const wasPlaying = this.isPlaying;
        this.isPlaying = false;
        try { this.synth.cancel(); } catch(e){}
        try { this.synth.resume(); } catch(e){}

        let cleanText = text.replace(/[\/::;:\[\]\(\)\-\_]/g, ' ').replace(/\s+/g, ' ').trim();
        const utterance = new SpeechSynthesisUtterance(cleanText);
        window._activeUtterance = utterance;
        this.activeUtterance = utterance;
        utterance.lang = langCode;
        utterance.rate = 0.95;
        utterance.pitch = 1.0;

        this.voices = this.synth ? this.synth.getVoices() : [];

        if (this.voices && this.voices.length > 0) {
          const langPrefix = langCode.substring(0, 2).toLowerCase();
          const langVoices = this.voices.filter(v => v.lang && v.lang.toLowerCase().replace('_', '-').startsWith(langPrefix));
          if (langVoices.length > 0) {
            const naturalVoice = langVoices.find(v => v.name && (v.name.includes('Google') || v.name.includes('SunHi') || v.name.includes('InJoon') || v.name.includes('Natural') || v.name.includes('Online')));
            const nonHeamiVoice = langVoices.find(v => v.name && !v.name.includes('Heami'));
            utterance.voice = naturalVoice || nonHeamiVoice || langVoices[0];
          }
        }

        const handleFinish = () => {
          if (onEndCallback) {
            onEndCallback();
          } else if (wasPlaying) {
            this.isPlaying = true;
            this.activeTimerId = setTimeout(() => {
              this.speakCurrentCardWebBrowser();
            }, 500);
          }
        };

        utterance.onend = handleFinish;
        utterance.onerror = handleFinish;

        this.synth.speak(utterance);
      } else {
        if (onEndCallback) onEndCallback();
      }
    } catch(e) {
      console.log('speakText Error:', e);
      if (onEndCallback) onEndCallback();
    }
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
