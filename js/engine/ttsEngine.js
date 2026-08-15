/* ==========================================================================
   HEARENG - Web Speech Synthesis Engine (v2.15 Bulletproof)
   - Android Native TTS는 AndroidNativeTTS 브리지로 위임
   - 웹 브라우저는 Web Speech API 사용 (Chrome 멈춤 버그 완전 해결)
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
    this.synth = (typeof window !== 'undefined' && window.speechSynthesis) ? window.speechSynthesis : null;
    this.voices = [];
    this.targetLang = 'en-US';
    this.explanationLang = 'ko-KR';
    this.rate = 1.0;
    this.pitch = 1.0;
    this.selectedTargetTeacher = MASTER_ENGLISH_TEACHERS[0];
    this.selectedExplanationTeacher = MASTER_KOREAN_TEACHERS[0];
    this.playlist = [];
    this.currentIndex = 0;
    this.isPlaying = false;
    this.targetRepeatCount = 3;
    this.targetIntraGap = 500;
    this.explanationRepeatCount = 1;
    this.targetToExpGap = 500;
    this.delayNextCard = 1000;
    this.repeatSystemMode = 'type_sequence';
    this.isShuffle = false;
    this.bgAudio = null;

    this.onSpeechStart = null;
    this.onSpeechEnd = null;
    this.onCardChange = null;

    this.activeTimerId = null;
    this._watchdogId = null;
    this._stepDoneFlag = false;

    this._initVoices();
  }

  _initVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices() || [];
    if (typeof this.synth.onvoiceschanged !== 'undefined') {
      this.synth.onvoiceschanged = () => {
        this.voices = this.synth.getVoices() || [];
      };
    }
  }

  // 하위 호환
  initVoices() { this._initVoices(); }
  populateVoiceList() { this._initVoices(); }

  getTeacherListForLang(langCode) {
    if (!langCode) return MASTER_ENGLISH_TEACHERS;
    if (langCode.startsWith('ko')) return MASTER_KOREAN_TEACHERS;
    if (langCode.startsWith('ja')) return MASTER_JAPANESE_TEACHERS;
    return MASTER_ENGLISH_TEACHERS;
  }

  setSpeed(rate) {
    this.rate = parseFloat(rate) || 1.0;
    this.speechRate = parseFloat(rate) || 1.0;
  }

  setPlaylist(items) {
    this.playlist = Array.isArray(items) ? items : [];
  }

  // 소리 하지 않고 타이머 + synth 만 정리 (백그라운드 오디오는 절대 끄지 않음!)
  _fullStop() {
    if (this._watchdogId) { clearTimeout(this._watchdogId); this._watchdogId = null; }
    if (this.activeTimerId) { clearTimeout(this.activeTimerId); this.activeTimerId = null; }
    if (this.synth) {
      try { this.synth.resume(); } catch(e){}
      try { this.synth.cancel(); } catch(e){}
    }
    // bgAudio는 절대 여기서 멈춰서는 안 됨 → 잠금화면 오디오 세션 유지 필수!
    // bgAudio는 stop() 호출 시에만 멈쳐야 함
  }

  stop() {
    this.isPlaying = false;
    this._fullStop();
    // 멈쳐아 할 때만 bgAudio 멈춰야 함
    if (this.bgAudio) { try { this.bgAudio.pause(); } catch(e){} }
    try {
      if (window.AndroidNativeTTS && typeof window.AndroidNativeTTS.pauseNativePlaylist === 'function') {
        window.AndroidNativeTTS.pauseNativePlaylist();
      }
    } catch(e){}
    if (this.onSpeechEnd) this.onSpeechEnd();
  }

  pause() { this.stop(); }

  play() {
    if (!this.playlist || this.playlist.length === 0) {
      console.warn('TTS play(): playlist is empty');
      return;
    }
    if (this.currentIndex == null || isNaN(this.currentIndex) || this.currentIndex < 0) {
      this.currentIndex = 0;
    }
    this.isPlaying = true;

    // ★ iOS 잠금화면 / 백그라운드 무한 오디오 유지 트랙 구동
    try {
      if (!this.bgAudio) {
        const silentWav = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=';
        this.bgAudio = new Audio(silentWav);
        this.bgAudio.loop = true;
      }
      this.bgAudio.play().catch(e => {});
    } catch(e){}

    const isNovel = this.isNovelMode || (this.playlist[0] && (this.playlist[0].isNovel || this.playlist[0].type === 'novel'));

    // ── Android Native 우선 ──
    if (window.AndroidNativeTTS && typeof window.AndroidNativeTTS.startNativePlaylist === 'function') {
      try {
        const compact = this.playlist.map(it => ({
          target: it.target || '',
          translation: it.translation || '',
          phonetic: it.phonetic || '',
          isNovel: !!(it.isNovel || it.type === 'novel' || isNovel)
        }));
        const tR = isNovel ? 1 : Math.max(1, this.targetRepeatCount || 3);
        const eR = isNovel ? 0 : Math.max(0, this.explanationRepeatCount || 1);
        window.AndroidNativeTTS.startNativePlaylist(JSON.stringify(compact), this.currentIndex, tR, eR);
        if (this.onSpeechStart) this.onSpeechStart();
        return;
      } catch(e) {
        console.error('Native TTS Bridge Error:', e);
      }
    }

    // ── 웹 브라우저 낭독 ──
    if (isNovel) {
      this._playNovelCard();
    } else {
      this._playWebCard();
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // 📖 소설 전용 무제한 연속 낭독 엔진 (스마트 청킹 + 언어 감지 + 1회 재생)
  // ═══════════════════════════════════════════════════════════════
  _playNovelCard() {
    if (!this.isPlaying || !this.playlist || this.playlist.length === 0) return;

    this._fullStop();

    if (this.currentIndex < 0 || this.currentIndex >= this.playlist.length || isNaN(this.currentIndex)) {
      this.currentIndex = 0;
    }

    const item = this.playlist[this.currentIndex];
    if (!item) { this._advanceAndPlayNext(); return; }

    if (this.onCardChange) {
      try { this.onCardChange(item, this.currentIndex); } catch(e){}
    }
    if (this.onSpeechStart) {
      try { this.onSpeechStart(); } catch(e){}
    }

    const text = (item.target || item.text || '').trim();
    if (!text) { this._advanceAndPlayNext(); return; }

    // 1. 언어 자동 판별 (영문 비중 vs 한글)
    const hasEng = /[a-zA-Z]/.test(text);
    const hasKor = /[\uac00-\ud7a3]/.test(text);
    const lang = (hasEng && !hasKor) ? 'en-US' : 'ko-KR';

    // 2. 템포 갭 (대화체 150ms / 일반 서술 300ms)
    const isDialogue = /^["“'‘]/.test(text) || /["”'’]$/.test(text);
    const gap = isDialogue ? 150 : 300;

    const cardIdx = this.currentIndex;

    this._speakOneText(text, lang, () => {
      if (!this.isPlaying || this.currentIndex !== cardIdx) return;
      this.activeTimerId = setTimeout(() => {
        this._advanceAndPlayNext();
      }, gap);
    });
  }

  // 📖 장문 소설/텍스트 스마트 문장 파서 (80~150자 단위 청킹)
  parseNovelToChunks(rawText) {
    if (!rawText) return [];

    // 특수기호 정제 (제목 별표, 한자 괄호 정제)
    let cleaned = rawText
      .replace(/^\s*\*+/gm, '')
      .replace(/\([\u4e00-\u9fafA-Za-z0-9\s]+\)/g, '');

    // 줄바꿈 문장 재결합
    const lines = cleaned.split(/\r?\n/);
    let combinedText = "";
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      if (!line) {
        combinedText += "\n\n";
        continue;
      }
      combinedText += line + " ";
    }

    // 문장 및 대화체 기준 청킹
    const rawSentences = combinedText.split(/(?<=[.!?])\s+|(?<=\n\n)/);
    const chunks = [];

    for (let s of rawSentences) {
      let trimmed = s.trim();
      if (!trimmed) continue;

      if (trimmed.length > 180) {
        const subParts = trimmed.split(/(?<=[,;])\s+/);
        let subBuf = "";
        for (let sub of subParts) {
          if ((subBuf + sub).length > 150) {
            if (subBuf) chunks.push(subBuf.trim());
            subBuf = sub;
          } else {
            subBuf += (subBuf ? " " : "") + sub;
          }
        }
        if (subBuf) chunks.push(subBuf.trim());
      } else {
        chunks.push(trimmed);
      }
    }

    return chunks.map((str, idx) => {
      const hasKor = /[\uac00-\ud7a3]/.test(str);
      return {
        id: `novel_${idx + 1}`,
        target: str,
        translation: hasKor ? str : '',
        phonetic: `[문장 ${idx + 1}]`,
        isNovel: true,
        type: 'novel'
      };
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 웹 브라우저 카드 재생 (Chrome onend 버그 완전 해결판)
  // ═══════════════════════════════════════════════════════════════
  _playWebCard() {
    if (!this.isPlaying || !this.playlist || this.playlist.length === 0) return;

    this._fullStop(); // 기존 재생 완전 정리

    // 인덱스 보정
    if (this.currentIndex < 0 || this.currentIndex >= this.playlist.length || isNaN(this.currentIndex)) {
      this.currentIndex = 0;
    }

    const item = this.playlist[this.currentIndex];
    if (!item) { this._advanceAndPlayNext(); return; }

    // 카드 변경 콜백 (UI 동기화)
    if (this.onCardChange) {
      try { this.onCardChange(item, this.currentIndex); } catch(e){}
    }
    if (this.onSpeechStart) {
      try { this.onSpeechStart(); } catch(e){}
    }

    const totalTarget = Math.max(1, this.targetRepeatCount || 3);
    const totalExp    = Math.max(0, this.explanationRepeatCount || 1);
    const totalSteps  = totalTarget + totalExp;
    const cardIdx     = this.currentIndex; // 카드 변경 감지용 스냅샷

    let step = 0;

    const doNextStep = () => {
      // 재생 취소 or 카드 변경 감지
      if (!this.isPlaying || this.currentIndex !== cardIdx) return;

      if (step >= totalSteps) {
        // 이 카드 완료 → 다음 카드
        this._advanceAndPlayNext();
        return;
      }

      const isEngTurn = (step < totalTarget);
      let text = isEngTurn ? (item.target || '') : (item.translation || item.target || '');
      const lang = isEngTurn ? 'en-US' : 'ko-KR';

      // 텍스트 정리
      if (!isEngTurn && text) text = text.replace(/~/g, '뭐뭐');
      text = (text || '').replace(/[\/::;\[\]()\-_]/g, ' ').replace(/\s+/g, ' ').trim();

      if (!text) { step++; doNextStep(); return; } // 빈 텍스트 건너뜀

      this._speakOneText(text, lang, () => {
        step++;
        // 세부 조절 패널 딜레이 설정 정밀 적용
        let gap = 350;
        if (isEngTurn) {
          if (step < totalTarget) {
            gap = this.targetIntraGap != null ? this.targetIntraGap : 500;
          } else {
            gap = this.targetToExpGap != null ? this.targetToExpGap : 500;
          }
        } else {
          gap = 350;
        }
        this.activeTimerId = setTimeout(doNextStep, gap);
      });
    };

    doNextStep();
  }

  // ── 단일 텍스트 발화 (watchdog 포함, synth 없어도 callback 보장) ──
  _speakOneText(text, lang, onDone) {
    if (!this.synth) {
      // speechSynthesis 없음 → 딜레이만 주고 통과
      this.activeTimerId = setTimeout(onDone, 800);
      return;
    }

    let done = false;
    const safeOnDone = () => {
      if (done) return;
      done = true;
      if (this._watchdogId) { clearTimeout(this._watchdogId); this._watchdogId = null; }
      onDone();
    };

    // iOS WebKit 큐 초기화 (연속 낭독 / 묵음 씹힘 방지 필수)
    try {
      if (this.synth.speaking || this.synth.pending) {
        this.synth.cancel();
      }
    } catch(e){}

    const utt = new SpeechSynthesisUtterance(text);
    window._activeUtterance = utt;
    utt.lang = lang;
    utt.rate = this.rate || 1.0;
    utt.pitch = 1.0;

    // 음성 선택 (여성 음성 최우선 선택)
    const vs = this.synth.getVoices() || [];
    if (vs.length > 0) {
      const prefix = lang.substring(0, 2).toLowerCase();
      const langVoices = vs.filter(v => v.lang && v.lang.toLowerCase().replace('_','-').startsWith(prefix));
      if (langVoices.length > 0) {
        // 1. 대표 여성 음성 이름 (iOS Samantha, Karen, Victoria, Yuna, Sora, SunHi, Aria 등)
        const femaleVoice = langVoices.find(v => 
          /samantha|karen|victoria|sora|yuna|sunhi|aria|jennie|jiyeon|kyoko|female|woman|girl|natural/i.test(v.name)
        );
        // 2. 남성 전용 음성 제외 (Daniel, Alex, Fred, Arthur, Minho, Male 등)
        const nonMaleVoice = langVoices.find(v => !/daniel|alex|fred|arthur|minho|male|boy|man/i.test(v.name));

        utt.voice = femaleVoice || nonMaleVoice || langVoices[0];
      }
    }

    utt.onend   = safeOnDone;
    utt.onerror = (err) => {
      console.warn('TTS utterance error:', err);
      safeOnDone();
    };

    // 약간의 딜레이(50ms) 후 speak 호출로 WebKit 오디오 컨텍스트 동기화
    setTimeout(() => {
      try { this.synth.resume(); } catch(e){}
      try {
        this.synth.speak(utt);
      } catch(e) {
        safeOnDone();
        return;
      }

      // iOS WebKit 오디오 딜레이에 맞춘 Watchdog
      const estimatedMs = Math.max(4000, text.length * 200 * 3);
      this._watchdogId = setTimeout(() => {
        console.warn(`[TTS Watchdog] "${text.slice(0,20)}..." 발화 타임아웃 → 강제 진행`);
        safeOnDone();
      }, estimatedMs);
    }, 50);
  }

  // ── 다음 카드로 이동 후 무한 연속 재생 ──
  _advanceAndPlayNext() {
    if (!this.isPlaying) return;
    if (this.isShuffle) {
      this.currentIndex = Math.floor(Math.random() * this.playlist.length);
    } else {
      this.currentIndex++;
      if (this.currentIndex >= this.playlist.length) {
        // 단어장 마지막 카드 도달 시 처음(0)부터 무한 재시작!
        this.currentIndex = 0;
      }
    }
    const delay = this.delayNextCard != null ? this.delayNextCard : 1000;
    this.activeTimerId = setTimeout(() => {
      this._playWebCard();
    }, delay);
  }

  // ── 하위 호환 메서드 ──
  speakCurrentCardWebBrowser() { this._playWebCard(); }

  nextCard() {
    if (!this.playlist || this.playlist.length === 0) return;
    const was = this.isPlaying;
    this._fullStop();
    this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
    if (was) { this.isPlaying = true; this._playWebCard(); }
    else if (this.onCardChange) {
      const item = this.playlist[this.currentIndex];
      if (item) this.onCardChange(item, this.currentIndex);
    }
  }

  prevCard() {
    if (!this.playlist || this.playlist.length === 0) return;
    const was = this.isPlaying;
    this._fullStop();
    this.currentIndex = (this.currentIndex - 1 + this.playlist.length) % this.playlist.length;
    if (was) { this.isPlaying = true; this._playWebCard(); }
    else if (this.onCardChange) {
      const item = this.playlist[this.currentIndex];
      if (item) this.onCardChange(item, this.currentIndex);
    }
  }

  next() { this.nextCard(); }
  previous() { this.prevCard(); }

  toggleShuffle() {
    this.isShuffle = !this.isShuffle;
    return this.isShuffle;
  }

  // ── 단일 텍스트 읽기 (외부 호출용) ──
  speakText(text, langCode = 'ko-KR', onEndCallback = null) {
    if (!text) { if (onEndCallback) onEndCallback(); return; }
    const wasPlaying = this.isPlaying;
    this.isPlaying = false;
    this._fullStop();

    const done = () => {
      if (onEndCallback) {
        onEndCallback();
      } else if (wasPlaying) {
        this.isPlaying = true;
        this.activeTimerId = setTimeout(() => this.play(), 500);
      }
    };

    this._speakOneText(text, langCode, done);
  }

  // ── 테스트 발화 ──
  testTeacherSample(teacherObj, langCode, sampleText) {
    if (!sampleText) return;
    this.speakText(sampleText, langCode || 'en-US');
  }

  setLanguages(targetLang, expLang) {
    this.targetLang = targetLang;
    this.explanationLang = expLang;
    const tTeachers = this.getTeacherListForLang(targetLang);
    const eTeachers = this.getTeacherListForLang(expLang);
    this.selectedTargetTeacher = tTeachers[0] || null;
    this.selectedExplanationTeacher = eTeachers[0] || null;
  }

  // 하위 호환
  clearPendingTimer() {
    if (this.activeTimerId) { clearTimeout(this.activeTimerId); this.activeTimerId = null; }
  }
}

// ── 전역 인스턴스 생성 ──
window.ttsEngine = new TTSEngine();

// ── Android → Web UI 인덱스 동기화 콜백 ──
window.onNativeCardIndexChanged = function(index) {
  try {
    if (window.ttsEngine) window.ttsEngine.currentIndex = index;
    if (typeof window.updateAppUI === 'function') window.updateAppUI(index);
  } catch(e) {}
};
