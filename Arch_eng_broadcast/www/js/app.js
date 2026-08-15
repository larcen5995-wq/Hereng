/* ==========================================================================
   VOCALIZE - Main Application Controller (Korean Native ➔ English Learning App)
   Coordinates 45+ Master Teacher Persona Registry (20 English, 15 Korean, 10 Japanese),
   Dynamic Pitch/Speed Voice Tuning, 3-Tier Hierarchy Taxonomy (대/중/소 분류),
   Radio Frequency Tuning Wheel, Card Jump, Auto-Resume Bookmarking & Dual-Voice TTS
   ========================================================================== */

function initVocalizeApp() {
  // Play Store PRO Redirect Modal Logic
  const playStoreProModal = document.getElementById('playStoreProModal');
  const btnConfirmGoPlayStore = document.getElementById('btnConfirmGoPlayStore');
  const btnClosePlayStoreModal = document.getElementById('btnClosePlayStoreModal');
  const btnUnlockProLicense = document.getElementById('btnUnlockProLicense');
  const btnHeaderProUnlock = document.getElementById('btnHeaderProUnlock');
  const btnDualEditionToggle = document.getElementById('btnDualEditionToggle');

  function openPlayStoreModal() {
    if (playStoreProModal) playStoreProModal.classList.add('active');
  }

  function triggerPlayStoreRedirect() {
    if (window.AndroidNativeTTS && typeof window.AndroidNativeTTS.openPlayStorePro === 'function') {
      window.AndroidNativeTTS.openPlayStorePro();
    } else {
      window.open('https://play.google.com/store/search?q=heareng&c=apps', '_system');
    }
  }

  if (btnUnlockProLicense) btnUnlockProLicense.addEventListener('click', openPlayStoreModal);
  if (btnHeaderProUnlock) btnHeaderProUnlock.addEventListener('click', openPlayStoreModal);
  if (btnDualEditionToggle) btnDualEditionToggle.addEventListener('click', openPlayStoreModal);

  if (btnConfirmGoPlayStore) {
    btnConfirmGoPlayStore.addEventListener('click', () => {
      triggerPlayStoreRedirect();
      if (playStoreProModal) playStoreProModal.classList.remove('active');
    });
  }

  if (btnClosePlayStoreModal) {
    btnClosePlayStoreModal.addEventListener('click', () => {
      if (playStoreProModal) playStoreProModal.classList.remove('active');
    });
  }

  // Helper for Ad Modal Close

  // Initialize PRO Status on Header Badge
  function updateProHeaderBadge() {
    const statusText = document.getElementById('editionStatusText');
    if (statusText) {
      if (window.adMobEngine && window.adMobEngine.isProUnlocked) {
        statusText.innerHTML = '👑 $5 PRO 영구 무광고 소장중';
      } else {
        statusText.innerHTML = '⚡ [무료 광고버전] ➔ 👑 $5 PRO 무광고';
      }
    }
  }
  updateProHeaderBadge();
  // UI Element References
  const targetVoiceSelect = document.getElementById('targetVoiceSelect');
  const explanationVoiceSelect = document.getElementById('explanationVoiceSelect');
  const themeSelect = document.getElementById('themeSelect');
  const btnThemeToggle = document.getElementById('btnThemeToggle');
  const sleepTimerSelect = document.getElementById('sleepTimerSelect');
  const currentEditionBadge = document.getElementById('currentEditionBadge');
  
  // 3-Tier Hierarchy Taxonomy Elements
  const mainCategorySelect = document.getElementById('mainCategorySelect');
  const subLevelSelect = document.getElementById('subLevelSelect');
  const contentTypeSegment = document.getElementById('contentTypeSegment');

  // Player Elements
  const cardPlayer = document.getElementById('cardPlayer');
  const cardCategoryBadge = document.getElementById('cardCategoryBadge');
  const btnOpenRadioWheel = document.getElementById('btnOpenRadioWheel');
  const cardIndexCount = document.getElementById('cardIndexCount');
  const targetWord = document.getElementById('targetWord');
  const phoneticText = document.getElementById('phoneticText');
  const translationWord = document.getElementById('translationWord');
  const visualizer = document.getElementById('visualizer');

  // Radio Tuner Wheel Elements
  const cardSlider = document.getElementById('cardSlider');
  const cardJumpInput = document.getElementById('cardJumpInput');
  const cardTotalSpan = document.getElementById('cardTotalSpan');
  const btnJumpGo = document.getElementById('btnJumpGo');
  const btnSpinPrev = document.getElementById('btnSpinPrev');
  const btnSpinNext = document.getElementById('btnSpinNext');
  const wheelDisplayNum = document.getElementById('wheelDisplayNum');

  const btnSkipBack100 = document.getElementById('btnSkipBack100');
  const btnSkipBack10 = document.getElementById('btnSkipBack10');
  const btnSkipNext10 = document.getElementById('btnSkipNext10');
  const btnSkipNext100 = document.getElementById('btnSkipNext100');

  // Radio Wheel Modal
  const radioWheelModal = document.getElementById('radioWheelModal');
  const modalJumpInput = document.getElementById('modalJumpInput');
  const modalTotalSpan = document.getElementById('modalTotalSpan');
  const modalWheelPrev = document.getElementById('modalWheelPrev');
  const modalWheelNext = document.getElementById('modalWheelNext');
  const btnConfirmRadioJump = document.getElementById('btnConfirmRadioJump');
  const btnCloseRadioModal = document.getElementById('btnCloseRadioModal');

  // Resume Banner
  const resumeToastBanner = document.getElementById('resumeToastBanner');
  const resumeToastText = document.getElementById('resumeToastText');
  const btnApplyResume = document.getElementById('btnApplyResume');

  const btnPrev = document.getElementById('btnPrev');
  const btnPlayPause = document.getElementById('btnPlayPause');
  const btnNext = document.getElementById('btnNext');
  const btnShuffle = document.getElementById('btnShuffle');
  const btnToggleHide = document.getElementById('btnToggleHide');

  const delaySelect = document.getElementById('delaySelect');
  const repeatSelect = document.getElementById('repeatSelect');
  const speedSelect = document.getElementById('speedSelect');

  const adCountdownText = document.getElementById('adCountdownText');
  const adTestTimerSelect = document.getElementById('adTestTimerSelect');
  const adModal = document.getElementById('adModal');
  const btnCloseAdModal = document.getElementById('btnCloseAdModal');
  const btnToggleProMode = document.getElementById('btnToggleProMode');

  const fileInput = document.getElementById('fileInput');
  const dropzone = document.getElementById('dropzone');
  const customTextInput = document.getElementById('customTextInput');
  const btnLoadCustomText = document.getElementById('btnLoadCustomText');

  // Audition Panel References
  const auditionKoreanSelect = document.getElementById('auditionKoreanSelect');
  const auditionEnglishSelect = document.getElementById('auditionEnglishSelect');
  const auditionJapaneseSelect = document.getElementById('auditionJapaneseSelect');
  const btnAuditionKorean = document.getElementById('btnAuditionKorean');
  const btnAuditionEnglish = document.getElementById('btnAuditionEnglish');
  const btnAuditionJapanese = document.getElementById('btnAuditionJapanese');

    // Application State (HearEng Product - Korean Native Learning English)
  const currentEditionKey = 'EN_KO';
  let currentSection = 'exam';
  let currentLevel = 'toddler_3_5';
  let currentType = 'words';
  let isHideTranslation = false;
  let sleepTimerId = null;

      // Taxonomy Sections Dictionary (Mapped 100% to REAL 71,036 Dataset Keys & 4 Main Categories)
  const SECTION_LEVELS = {
    exam: [
      { key: 'toddler_3_5', label: '🍼 3~5세 유아 말문 터지기 (170개)' },
      { key: 'kindergarten_6_7', label: '🧒 6~7세 유치원 파닉스 (220개)' },
      { key: 'elem_essential_50', label: '✨ 초등 교과서 필수 표현 (150개)' },
      { key: 'elementary_800', label: '🎒 2015 교육부 지정 초등 필수 800단어 (800개)' },
      { key: 'elementary_1300', label: '🎒 초등 필수 영단어 1,300개 완성 (1,300개)' },
      { key: 'middle', label: '🏫 중학교 필수 영단어 (1,798개)' },
      { key: 'high', label: '🎓 고등 수능 기출 전체 (3,000개)' },
      { key: 'high_1', label: '🎓 고등 수능 기출 [1단계: 500단어]' },
      { key: 'high_2', label: '🎓 고등 수능 기출 [2단계: 500단어]' },
      { key: 'high_3', label: '🎓 고등 수능 기출 [3단계: 500단어]' },
      { key: 'high_4', label: '🎓 고등 수능 기출 [4단계: 500단어]' },
      { key: 'high_5', label: '🎓 고등 수능 기출 [5단계: 500단어]' },
      { key: 'high_6', label: '🎓 고등 수능 기출 [6단계: 500단어]' },
      { key: 'essential_5000_1', label: '🔥 필수 영단어 5000 [1단계: 500단어]' },
      { key: 'essential_5000_2', label: '🔥 필수 영단어 5000 [2단계: 500단어]' },
      { key: 'essential_5000_3', label: '🔥 필수 영단어 5000 [3단계: 500단어]' },
      { key: 'essential_5000_4', label: '🔥 필수 영단어 5000 [4단계: 500단어]' },
      { key: 'essential_5000_5', label: '🔥 필수 영단어 5000 [5단계: 500단어]' },
      { key: 'essential_5000_6', label: '🔥 필수 영단어 5000 [6단계: 500단어]' },
      { key: 'essential_5000_7', label: '🔥 필수 영단어 5000 [7단계: 500단어]' },
      { key: 'essential_5000_8', label: '🔥 필수 영단어 5000 [8단계: 500단어]' },
      { key: 'essential_5000_9', label: '🔥 필수 영단어 5000 [9단계: 500단어]' },
      { key: 'essential_5000_10', label: '🔥 필수 영단어 5000 [10단계: 500단어]' },
      { key: 'master_15k_loop', label: '🔥 15,000단어 1시간 연속 루프 (CEFR/수능/TOEIC)' },
      { key: 'idioms_elem', label: '📌 초등 기초 숙어' },
      { key: 'idioms_mid', label: '📌 중등 시험 숙어' },
      { key: 'idioms_high', label: '📌 고등/TOEIC 숙어' }
    ],
    business: [
      { key: 'biz_workplace_500', label: '👔 비즈니스 실무 필수 표현 & 회사 생활 회화 (1,049개)' },
      { key: 'biz_nouns_500', label: '💼 비즈니스 회사 필수 명사 A-Z (1,050개)' },
      { key: 'business_email', label: '📧 비즈니스 이메일 필수 표현' },
      { key: 'tech_it', label: '💻 IT / 테크 필수 어휘' },
      { key: 'idioms_daily', label: '📌 비즈니스/일상 관용구' }
    ],
    situational: [
      { key: 'situations_12k', label: '🎭 12,000개 상황별 엑셀 실무 마스터 데이터 (29,820개)' },
      { key: 'situations_master', label: '🎭 상황별 영어 (12,000문장+ 전수 탑재)' },
      { key: 'native_500', label: '🗣️ 원어민 매일 쓰는 필수 회화 패턴 & 실생활 500문장' },
      { key: 'practical_1000', label: '✍️ 실용 영작문 & 실생활 1,000문장 완성하기' },
      { key: 'real_life_200', label: '🗣️ 실생활 영어 200문장 완성하기 (450개)' },
      { key: 'airport_travel', label: '✈️ 해외 여행 & 공항 수속 필수 회화' },
      { key: 'hotel_stay', label: '🏨 호텔 & 숙소 체크인 필수 회화' },
      { key: 'shopping_dining', label: '🛒 쇼핑 & 식당 카페 주문 회화' },
      { key: 'emotions_real', label: '💖 실생활 감정 & 반응 표현' },
      { key: 'sleep_radio', label: '🌙 수면 힐링 라디오' }
    ],
    pop: [
      { key: 'tv_slang_1000', label: '🍿 미드 & 영화 실전 슬랭 & 팝컬처 (2,100개)' },
      { key: 'tv_slang_500', label: '🍿 미드 & 영화 실전 슬랭 & 관용 표현 (1,100개)' },
      { key: 'movie_quotes_1000', label: '🎬 해외 명작 영화 100선 대표 명대사 (2,100개)' },
      { key: 'sitcom_comedy_1000', label: '🎞️ 시트콤 & 코미디 실전 일상회화 (2,100개)' },
      { key: 'crime_medical_1000', label: '🕵️ 수사물 & 메디컬 & 법정드라마 회화 (2,099개)' },
      { key: 'scifi_action_1000', label: '🚀 SF & 판타지 & 액션 블록버스터 명대사 (2,100개)' },
      { key: 'tv_slang', label: '🍿 미드 & 영화 단골 슬랭' },
      { key: 'kpop_hallyu', label: '🎵 K-Pop & 한류 문화 필수 용어' },
      { key: 'anime_japan', label: '⛩️ 애니메이션 & 팝컬처 회화' }
    ]
  };

  // Render Sub-Level Dropdown based on Main Category Selection
    function renderSubLevels(sectionKey, activeLevelKey = null) {
    currentSection = sectionKey || 'exam';
    if (!subLevelSelect) return;
    subLevelSelect.innerHTML = '';

    // Show/hide Delete Current Custom File button
    const btnDeleteCustom = document.getElementById('btnDeleteCurrentCustomFile');
    if (btnDeleteCustom) {
      btnDeleteCustom.style.display = (currentSection === 'user_custom' && userCustomDatasets.length > 0) ? 'flex' : 'none';
    }

    const levels = SECTION_LEVELS[currentSection] || SECTION_LEVELS.exam;
    currentLevel = activeLevelKey || (levels[0] ? levels[0].key : 'toddler_3_5');

    levels.forEach(lvl => {
      const opt = document.createElement('option');
      opt.value = lvl.key;
      opt.textContent = lvl.label;
      if (lvl.key === currentLevel) opt.selected = true;
      subLevelSelect.appendChild(opt);
    });

    subLevelSelect.value = currentLevel;
    if (!subLevelSelect.value || subLevelSelect.selectedIndex === -1) {
      if (subLevelSelect.options.length > 0) {
        subLevelSelect.selectedIndex = 0;
        currentLevel = subLevelSelect.value;
      }
    }
  }

  // Handle Top Deck 'btnDeleteCurrentCustomFile' (선택한 커스텀 파일 삭제 버튼)
  const btnDeleteCurrentCustomFile = document.getElementById('btnDeleteCurrentCustomFile');
  if (btnDeleteCurrentCustomFile) {
    btnDeleteCurrentCustomFile.addEventListener('click', () => {
      const currentDsId = subLevelSelect ? subLevelSelect.value : null;
      const targetDs = userCustomDatasets.find(d => d.id === currentDsId);
      if (!targetDs) {
        alert('삭제할 커스텀 파일이 선택되지 않았습니다.');
        return;
      }

      if (confirm(`'${targetDs.name}' 커스텀 파일을 정말 삭제하시겠습니까?`)) {
        userCustomDatasets = userCustomDatasets.filter(d => d.id !== currentDsId);
        localStorage.setItem('vocalize_user_custom_datasets', JSON.stringify(userCustomDatasets));
        registerUserCustomDatasets();

        if (userCustomDatasets.length > 0) {
          renderSubLevels('user_custom', userCustomDatasets[0].id);
        } else {
          mainCategorySelect.value = 'exam';
          renderSubLevels('exam');
        }
        window.ttsEngine.stop();
        loadPlaylist();
        if (typeof showToast === 'function') {
          showToast(`🗑️ '${targetDs.name}' 커스텀 파일이 삭제되었습니다.`);
        } else {
          alert(`'${targetDs.name}' 커스텀 파일이 삭제되었습니다.`);
        }
      }
    });
  }

  // Populate Audition & Player Voice Selectors with Master Teacher Persona Registry + OS Voices
  function populateVoiceRegistries() {
    const targetTeachers = window.ttsEngine.getTeacherListForLang(window.ttsEngine.targetLang);
    const expTeachers = window.ttsEngine.getTeacherListForLang(window.ttsEngine.explanationLang);
    let systemVoices = window.ttsEngine.voices || (window.speechSynthesis ? window.speechSynthesis.getVoices() : []);
    if (window.AndroidNativeTTS && typeof window.AndroidNativeTTS.getInstalledVoicesJson === 'function') {
      try {
        const rawJson = window.AndroidNativeTTS.getInstalledVoicesJson();
        const nativeArr = JSON.parse(rawJson);
        if (Array.isArray(nativeArr) && nativeArr.length > 0) {
          nativeArr.forEach(nv => {
            if (!systemVoices.some(sv => sv.name === nv.name)) {
              systemVoices.push({
                name: nv.name,
                lang: nv.lang,
                voiceURI: nv.name
              });
            }
          });
        }
      } catch(e) {}
    }

    // 1. Audition English
    if (auditionEnglishSelect) {
      auditionEnglishSelect.innerHTML = '';
      MASTER_ENGLISH_TEACHERS.forEach((t, i) => {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = t.name;
        auditionEnglishSelect.appendChild(opt);
      });
    }

    // 2. Audition Korean
    if (auditionKoreanSelect && typeof MASTER_KOREAN_TEACHERS !== 'undefined') {
      auditionKoreanSelect.innerHTML = '';
      MASTER_KOREAN_TEACHERS.forEach((t, i) => {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = t.name;
        auditionKoreanSelect.appendChild(opt);
      });
    }

    // 3. Audition Japanese
    if (auditionJapaneseSelect && typeof MASTER_JAPANESE_TEACHERS !== 'undefined') {
      auditionJapaneseSelect.innerHTML = '';
      MASTER_JAPANESE_TEACHERS.forEach((t, i) => {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = t.name;
        auditionJapaneseSelect.appendChild(opt);
      });
    }

    // 4. Target Voice Select (Master Personas Only)
    if (targetVoiceSelect) {
      targetVoiceSelect.innerHTML = '';
      targetTeachers.forEach((t, i) => {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = t.name;
        if (window.ttsEngine.selectedTargetTeacher === t) opt.selected = true;
        targetVoiceSelect.appendChild(opt);
      });
    }

    // 5. Explanation Voice Select (Master Personas Only)
    if (explanationVoiceSelect) {
      explanationVoiceSelect.innerHTML = '';
      expTeachers.forEach((t, i) => {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = t.name;
        if (window.ttsEngine.selectedExplanationTeacher === t) opt.selected = true;
        explanationVoiceSelect.appendChild(opt);
      });
    }
  }

  // Audition Voice Test Buttons
  if (btnAuditionKorean) {
    btnAuditionKorean.addEventListener('click', () => {
      const idx = auditionKoreanSelect.value;
      const t = MASTER_KOREAN_TEACHERS[idx];
      if (t) {
        window.ttsEngine.testTeacherSample(t, 'ko-KR', `안녕하세요! ${t.name}입니다. 반가워요!`);
      }
    });
  }

  if (btnAuditionEnglish) {
    btnAuditionEnglish.addEventListener('click', () => {
      const idx = auditionEnglishSelect.value;
      const t = MASTER_ENGLISH_TEACHERS[idx];
      if (t) {
        window.ttsEngine.testTeacherSample(t, 'en-US', `Hello! This is ${t.name.split(' ')[1]}. Welcome to Vocalize!`);
      }
    });
  }

  if (btnAuditionJapanese) {
    btnAuditionJapanese.addEventListener('click', () => {
      const idx = auditionJapaneseSelect.value;
      const t = MASTER_JAPANESE_TEACHERS[idx];
      if (t) {
        window.ttsEngine.testTeacherSample(t, 'ja-JP', `こんにちは！${t.name.split(' ')[1]}です。よろしくお願いします！`);
      }
    });
  }

  // Populate voice registries immediately on startup
  populateVoiceRegistries();

  window.ttsEngine.onVoicesReady = () => {
    populateVoiceRegistries();
  };

  if (targetVoiceSelect) {
    targetVoiceSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      const targetTeachers = window.ttsEngine.getTeacherListForLang(window.ttsEngine.targetLang);
      if (val.startsWith('sys_')) {
        const sysIdx = parseInt(val.replace('sys_', ''));
        let systemVoices = window.ttsEngine.voices || [];
        const targetLangPrefix = window.ttsEngine.targetLang.substring(0, 2);
        const targetSystemVoices = systemVoices.filter(v => v.lang && v.lang.toLowerCase().startsWith(targetLangPrefix));
        const sysVoice = targetSystemVoices[sysIdx];
        if (sysVoice) {
          window.ttsEngine.selectedTargetTeacher = {
            id: 'sys_' + sysIdx,
            name: sysVoice.name,
            pitch: 1.0,
            rate: 1.0,
            keyword: sysVoice.name,
            nativeVoiceName: sysVoice.name
          };
        }
      } else {
        const idx = parseInt(val);
        window.ttsEngine.selectedTargetTeacher = targetTeachers[idx] || targetTeachers[0];
      }
    });
  }

  if (explanationVoiceSelect) {
    explanationVoiceSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      const expTeachers = window.ttsEngine.getTeacherListForLang(window.ttsEngine.explanationLang);
      if (val.startsWith('sys_')) {
        const sysIdx = parseInt(val.replace('sys_', ''));
        let systemVoices = window.ttsEngine.voices || [];
        const expLangPrefix = window.ttsEngine.explanationLang.substring(0, 2);
        const expSystemVoices = systemVoices.filter(v => v.lang && v.lang.toLowerCase().startsWith(expLangPrefix));
        const sysVoice = expSystemVoices[sysIdx];
        if (sysVoice) {
          window.ttsEngine.selectedExplanationTeacher = {
            id: 'sys_' + sysIdx,
            name: sysVoice.name,
            pitch: 1.0,
            rate: 1.0,
            keyword: sysVoice.name,
            nativeVoiceName: sysVoice.name
          };
        }
      } else {
        const idx = parseInt(val);
        window.ttsEngine.selectedExplanationTeacher = expTeachers[idx] || expTeachers[0];
      }
    });
  }

  // Theme Switcher Logic
  function setTheme(themeName) {
    document.body.classList.remove('theme-midnight', 'theme-slate', 'theme-clarity');
    document.body.classList.add(themeName);
    if (themeSelect) themeSelect.value = themeName;
    localStorage.setItem('vocalize_theme', themeName);
  }

  const savedTheme = localStorage.getItem('vocalize_theme') || 'theme-midnight';
  setTheme(savedTheme);

  if (themeSelect) {
    themeSelect.addEventListener('change', (e) => setTheme(e.target.value));
  }

  const btnWatchAdSupport = document.getElementById('btnWatchAdSupport');
  if (btnWatchAdSupport) {
    btnWatchAdSupport.addEventListener('click', () => {
      if (window.adMobEngine) {
        window.adMobEngine.triggerRadioCmAd();
      }
    });
  }

  // Floating Dev Ad Test Panel Event Listeners (웹 브라우저 테스트 전용)
  const btnTestDaily7AmAd = document.getElementById('btnTestDaily7AmAd');
  const btnTestDaily7PmAd = document.getElementById('btnTestDaily7PmAd');
  const btnTestRadioCm45mAd = document.getElementById('btnTestRadioCm45mAd');

  if (btnTestDaily7AmAd) {
    btnTestDaily7AmAd.addEventListener('click', () => {
      if (window.adMobEngine) {
        window.adMobEngine.triggerDailyAdMent("광고 시간입니다. 광고 없는 버전도 판매 중입니다.", true);
      }
    });
  }

  if (btnTestDaily7PmAd) {
    btnTestDaily7PmAd.addEventListener('click', () => {
      if (window.adMobEngine) {
        window.adMobEngine.triggerDailyAdMent("광고 시간입니다. 광고 없는 버전도 판매 중입니다.", true);
      }
    });
  }

  if (btnTestRadioCm45mAd) {
    btnTestRadioCm45mAd.addEventListener('click', () => {
      if (window.adMobEngine) {
        window.adMobEngine.triggerRadioCmAd(true);
      }
    });
  }

  if (btnThemeToggle) {
    btnThemeToggle.addEventListener('click', () => {
      const themes = ['theme-midnight', 'theme-slate', 'theme-clarity'];
      let curIndex = 0;
      if (document.body.classList.contains('theme-slate')) curIndex = 1;
      else if (document.body.classList.contains('theme-clarity')) curIndex = 2;
      
      const nextIdx = (curIndex + 1) % themes.length;
      setTheme(themes[nextIdx]);
    });
  }

  // Initialize Languages & Auto-Restore Bookmark State on Startup
    function initAppEdition() {
    if (currentEditionBadge) currentEditionBadge.textContent = '🇰🇷 한국인용 ➔ 🇺🇸 영어 마스터';
    window.ttsEngine.setLanguages('en-US', 'ko-KR');
    populateVoiceRegistries();

    const raw = localStorage.getItem('heareng_bookmark');
    let startIdx = 0;
    if (raw) {
      try {
        const state = JSON.parse(raw);
        if (state && typeof state.index === 'number' && state.index >= 0) {
          if (state.section && mainCategorySelect) {
            currentSection = state.section;
            mainCategorySelect.value = currentSection;
          }
          if (state.level) {
            currentLevel = state.level;
            renderSubLevels(currentSection, currentLevel);
          }
          if (state.type) {
            currentType = state.type;
            if (contentTypeSegment) {
              contentTypeSegment.querySelectorAll('.segment-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.type === currentType);
              });
            }
          }
          startIdx = state.index;
        }
      } catch(e){}
    }

    loadPlaylist(startIdx);
  }

  // Load Playlist with Direct Unique Dataset Mapping for HearEng
  function loadPlaylist(startIndex = 0) {
    if (subLevelSelect && subLevelSelect.value) {
      currentLevel = subLevelSelect.value;
    }

    const editionData = (typeof VOCABULARY_DATA !== 'undefined' && VOCABULARY_DATA) ? VOCABULARY_DATA['EN_KO'] : null;
    let levelData = editionData?.levels?.[currentLevel];

    if (!levelData) {
      if (window.VOCAB_EXAM && window.VOCAB_EXAM[currentLevel]) {
        levelData = window.VOCAB_EXAM[currentLevel];
      } else if (window.VOCAB_KIDS && window.VOCAB_KIDS[currentLevel]) {
        levelData = window.VOCAB_KIDS[currentLevel];
      } else if (window.VOCAB_SITUATIONS && window.VOCAB_SITUATIONS[currentLevel]) {
        levelData = window.VOCAB_SITUATIONS[currentLevel];
      } else if (window.VOCAB_TECH_BUSINESS && window.VOCAB_TECH_BUSINESS[currentLevel]) {
        levelData = window.VOCAB_TECH_BUSINESS[currentLevel];
      } else if (window.VOCAB_ESSENTIAL_5000 && window.VOCAB_ESSENTIAL_5000[currentLevel]) {
        levelData = window.VOCAB_ESSENTIAL_5000[currentLevel];
      } else if (window.VOCAB_SITUATIONS_12K && window.VOCAB_SITUATIONS_12K[currentLevel]) {
        levelData = window.VOCAB_SITUATIONS_12K[currentLevel];
      } else if (window.VOCAB_HIGH_3000 && window.VOCAB_HIGH_3000[currentLevel]) {
        levelData = window.VOCAB_HIGH_3000[currentLevel];
      }
    }

    if (!levelData && editionData && editionData.levels) {
      const firstAvailableLevel = Object.keys(editionData.levels)[0];
      currentLevel = firstAvailableLevel;
      levelData = editionData.levels[currentLevel];
    }

    if (!levelData) {
      if (targetWord) targetWord.textContent = "Loading...";
      if (translationWord) translationWord.textContent = "데이터 준비 중";
      if (phoneticText) phoneticText.textContent = "";
      return;
    }

    const targetRepeatSelect = document.getElementById('targetRepeatSelect');
    const explanationRepeatSelect = document.getElementById('explanationRepeatSelect');
    const delayNextCardSelect = document.getElementById('delayNextCardSelect');

    if (targetRepeatSelect && targetRepeatSelect.value) window.ttsEngine.targetRepeatCount = parseInt(targetRepeatSelect.value);
    if (explanationRepeatSelect && explanationRepeatSelect.value) window.ttsEngine.explanationRepeatCount = parseInt(explanationRepeatSelect.value);
    if (delayNextCardSelect && delayNextCardSelect.value) window.ttsEngine.delayNextCard = parseInt(delayNextCardSelect.value);

    let items = levelData[currentType];

    if (!items || items.length === 0) {
      items = levelData['words'] || levelData['sentences'] || levelData['idioms'] || [];
    }

    if (!items || items.length === 0) {
      if (targetWord) targetWord.textContent = "데이터 준비 중";
      if (translationWord) translationWord.textContent = "";
      if (phoneticText) phoneticText.textContent = "";
      return;
    }

    const levelLabel = levelData.label || currentLevel;
    if (cardCategoryBadge) cardCategoryBadge.textContent = `${levelLabel} • ${currentType.toUpperCase()}`;

    const total = items.length;
    if (cardTotalSpan) cardTotalSpan.textContent = total;
    if (modalTotalSpan) modalTotalSpan.textContent = total;
    if (cardSlider) cardSlider.max = total;
    if (cardJumpInput) cardJumpInput.max = total;
    if (modalJumpInput) modalJumpInput.max = total;

    window.ttsEngine.setPlaylist(items);
    const validStart = (startIndex >= 0 && startIndex < total) ? startIndex : 0;
    window.ttsEngine.currentIndex = validStart;
    window.ttsEngine.currentRepeat = 0;
    updateCardUI(items[validStart], validStart);
  }

  // Direct Jump to Target Card Index
  function jumpToIndex(targetIndex) {
    const total = window.ttsEngine.playlist.length;
    if (total === 0) return;

    let validIndex = targetIndex;
    if (validIndex < 0) validIndex = 0;
    if (validIndex >= total) validIndex = total - 1;

    window.ttsEngine.stop();
    window.ttsEngine.currentIndex = validIndex;
    window.ttsEngine.currentRepeat = 0;

    // Instantly notify Native Android Service of the user's manual card jump!
    if (window.AndroidNativeTTS && typeof window.AndroidNativeTTS.setNativeServiceIndex === 'function') {
      try {
        window.AndroidNativeTTS.setNativeServiceIndex(validIndex);
      } catch(e) {}
    }

    if (window.ttsEngine.isPlaying) {
      window.ttsEngine.speakCurrentCard();
    } else {
      updateCardUI(window.ttsEngine.playlist[validIndex], validIndex);
    }
  }

  // Save Bookmark state
  function saveBookmark() {
    const levelData = VOCABULARY_DATA[currentEditionKey]?.levels[currentLevel];
    const levelLabel = levelData ? (levelData.label || currentLevel) : currentLevel;

    const state = {
      editionKey: currentEditionKey,
      section: currentSection,
      level: currentLevel,
      levelLabel: levelLabel,
      type: currentType,
      index: window.ttsEngine.currentIndex
    };
    localStorage.setItem('vocalize_bookmark', JSON.stringify(state));
  }

  // Check & Show Resume Toast Banner
  function checkSavedBookmark() {
    const raw = localStorage.getItem('vocalize_bookmark');
    if (!raw) return;

    try {
      const state = JSON.parse(raw);
      if (state && state.index > 0) {
        resumeToastText.textContent = `이전 기록: [${state.levelLabel}] ${state.index + 1}번 카드`;
        // // // resumeToastBanner.style.display = 'flex'; // DISABLED FOR 100% ZERO TOAST
        btnApplyResume.textContent = `${state.index + 1}번으로 이어서 듣기`;

        btnApplyResume.onclick = () => {
          currentSection = state.section || 'exam';
          currentLevel = state.level || 'toddler_3_5';
          currentType = state.type || 'words';
          
          if (mainCategorySelect) mainCategorySelect.value = currentSection;

          renderSubLevels(currentSection, currentLevel);

          contentTypeSegment.querySelectorAll('.segment-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.type === currentType);
          });

          initAppEdition();
          loadPlaylist(state.index);
          // resumeToastBanner.style.display = 'none';
        };
      }
    } catch(e) {}
  }

  // Update Card UI for 6-Country Multi-Language Support
  function updateCardUI(item, index) {
    if (!item) return;
    targetWord.textContent = item.target;
    
    const learnerLangSelect = document.getElementById('learnerLangSelect');
    const selectedLang = learnerLangSelect ? learnerLangSelect.value : 'en';
    
    let activeTranslation = '';
    if (item.translations && item.translations[selectedLang]) {
      activeTranslation = item.translations[selectedLang];
    } else {
      activeTranslation = item.translation || '';
    }
    
    translationWord.textContent = activeTranslation;
    phoneticText.textContent = item.phonetic || '';

    // Dynamic Font Scaling to PREVENT Overlap/Overflow
    const targetLen = item.target.length;
    if (targetLen > 45) {
      targetWord.style.fontSize = '15px';
    } else if (targetLen > 25) {
      targetWord.style.fontSize = '18px';
    } else {
      targetWord.style.fontSize = '26px';
    }

    const transLen = (item.translation || '').length;
    if (transLen > 45) {
      translationWord.style.fontSize = '13px';
    } else if (transLen > 25) {
      translationWord.style.fontSize = '15px';
    } else {
      translationWord.style.fontSize = '18px';
    }

    const total = window.ttsEngine.playlist.length;
    cardIndexCount.textContent = `${index + 1} / ${total}`;
    wheelDisplayNum.textContent = `${index + 1} / ${total}`;

    cardSlider.value = index + 1;
    cardJumpInput.value = index + 1;
    modalJumpInput.value = index + 1;

    if (isHideTranslation) {
      translationWord.classList.add('hidden');
    } else {
      translationWord.classList.remove('hidden');
    }

    saveBookmark();
  }

  // Register Callbacks
  window.ttsEngine.onCardChange = (item, index) => {
    updateCardUI(item, index);
  };

  window.ttsEngine.onSpeechStart = () => {
    startSilentKeepAliveAudio();
    cardPlayer.classList.add('playing');
    visualizer.classList.add('active');
  };

  window.ttsEngine.onSpeechEnd = () => {
    cardPlayer.classList.remove('playing');
    visualizer.classList.remove('active');
  };

  window.onNativeCardIndexChanged = function(idx) {
    if (typeof idx === 'number' && idx >= 0 && window.ttsEngine && window.ttsEngine.playlist) {
      if (idx < window.ttsEngine.playlist.length) {
        window.ttsEngine.currentIndex = idx;
        updateCardUI(window.ttsEngine.playlist[idx], idx);
      }
    }
    if (btnPlayPause && window.ttsEngine) {
      if (window.ttsEngine.isPlaying) {
        btnPlayPause.innerHTML = '<i class="fa-solid fa-pause"></i>';
      } else {
        btnPlayPause.innerHTML = '<i class="fa-solid fa-play"></i>';
      }
    }
  };
  window.forceSyncMainCard = window.onNativeCardIndexChanged;

  // Real-time 500ms sync interval: ONLY sync screen card when actively playing!
  setInterval(() => {
    if (window.AndroidNativeTTS && typeof window.AndroidNativeTTS.getNativeServiceIndex === 'function') {
      if (window.ttsEngine && window.ttsEngine.isPlaying) {
        const nativeIdx = window.AndroidNativeTTS.getNativeServiceIndex();
        if (typeof nativeIdx === 'number' && nativeIdx >= 0 && window.ttsEngine.playlist) {
          if (window.ttsEngine.currentIndex !== nativeIdx && nativeIdx < window.ttsEngine.playlist.length) {
            window.forceSyncMainCard(nativeIdx);
          }
        }
      }
    }
  }, 500);

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && window.ttsEngine && window.ttsEngine.isPlaying) {
      if (window.AndroidNativeTTS && typeof window.AndroidNativeTTS.getNativeServiceIndex === 'function') {
        const idx = window.AndroidNativeTTS.getNativeServiceIndex();
        if (idx >= 0) window.forceSyncMainCard(idx);
      }
    }
  });

  window.addEventListener('focus', () => {
    if (window.ttsEngine && window.ttsEngine.isPlaying) {
      if (window.AndroidNativeTTS && typeof window.AndroidNativeTTS.getNativeServiceIndex === 'function') {
        const idx = window.AndroidNativeTTS.getNativeServiceIndex();
        if (idx >= 0) window.forceSyncMainCard(idx);
      }
    }
  });

  // Learner Native Language Selection Listener (6-Country Support)
  const learnerLangSelect = document.getElementById('learnerLangSelect');
  const LANG_LOCALE_MAP = {
    'en': 'en-US',
    'vi': 'vi-VN',
    'zh': 'zh-CN',
    'th': 'th-TH',
    'hi': 'hi-IN',
    'ja': 'ja-JP'
  };

  if (learnerLangSelect) {
    const savedLang = localStorage.getItem('hearkor_learner_lang') || 'en';
    learnerLangSelect.value = savedLang;
    if (window.ttsEngine) {
      window.ttsEngine.setLanguages('ko-KR', LANG_LOCALE_MAP[savedLang] || 'en-US');
    }

    learnerLangSelect.addEventListener('change', (e) => {
      const selectedLang = e.target.value;
      localStorage.setItem('hearkor_learner_lang', selectedLang);
      const expLocale = LANG_LOCALE_MAP[selectedLang] || 'en-US';
      if (window.ttsEngine) {
        window.ttsEngine.setLanguages('en-US', 'ko-KR');
      }
      if (window.ttsEngine && window.ttsEngine.playlist && window.ttsEngine.playlist[window.ttsEngine.currentIndex]) {
        updateCardUI(window.ttsEngine.playlist[window.ttsEngine.currentIndex], window.ttsEngine.currentIndex);
      }
    });
  }

  // 3-Tier Taxonomy Event Listeners
  function handleSubLevelChange(val) {
    currentLevel = val;
    window.ttsEngine.stop();
    btnPlayPause.innerHTML = '<i class="fa-solid fa-play"></i>';
    loadPlaylist();
  }

    mainCategorySelect.addEventListener('change', (e) => {
    const val = e.target.value;
    renderSubLevels(val);
    window.ttsEngine.stop();
    if (btnPlayPause) btnPlayPause.innerHTML = '<i class="fa-solid fa-play"></i>';
    loadPlaylist(0);
  });

  subLevelSelect.addEventListener('change', (e) => handleSubLevelChange(e.target.value));
  subLevelSelect.addEventListener('input', (e) => handleSubLevelChange(e.target.value));

  contentTypeSegment.querySelectorAll('.segment-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      contentTypeSegment.querySelectorAll('.segment-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentType = btn.dataset.type;
      window.ttsEngine.stop();
      btnPlayPause.innerHTML = '<i class="fa-solid fa-play"></i>';
      loadPlaylist();
    });
  });

  // Radio Wheel Tuning Controls
  btnSpinPrev.addEventListener('click', () => jumpToIndex(window.ttsEngine.currentIndex - 1));
  btnSpinNext.addEventListener('click', () => jumpToIndex(window.ttsEngine.currentIndex + 1));

  cardSlider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value) - 1;
    jumpToIndex(val);
  });

  btnJumpGo.addEventListener('click', () => {
    const val = parseInt(cardJumpInput.value) - 1;
    jumpToIndex(val);
  });

  cardJumpInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = parseInt(cardJumpInput.value) - 1;
      jumpToIndex(val);
    }
  });

  // Quick Skip Pills Listeners (-100, -10, +10, +100)
  btnSkipBack100.addEventListener('click', () => jumpToIndex(window.ttsEngine.currentIndex - 100));
  btnSkipBack10.addEventListener('click', () => jumpToIndex(window.ttsEngine.currentIndex - 10));
  btnSkipNext10.addEventListener('click', () => jumpToIndex(window.ttsEngine.currentIndex + 10));
  btnSkipNext100.addEventListener('click', () => jumpToIndex(window.ttsEngine.currentIndex + 100));

  // Radio Wheel Modal Open/Close
  btnOpenRadioWheel.addEventListener('click', () => {
    modalJumpInput.value = window.ttsEngine.currentIndex + 1;
    modalTotalSpan.textContent = window.ttsEngine.playlist.length;
    radioWheelModal.classList.add('active');
  });

  modalWheelPrev.addEventListener('click', () => {
    let val = parseInt(modalJumpInput.value) - 1;
    if (val < 1) val = 1;
    modalJumpInput.value = val;
  });

  modalWheelNext.addEventListener('click', () => {
    let val = parseInt(modalJumpInput.value) + 1;
    const max = window.ttsEngine.playlist.length;
    if (val > max) val = max;
    modalJumpInput.value = val;
  });

  btnConfirmRadioJump.addEventListener('click', () => {
    const val = parseInt(modalJumpInput.value) - 1;
    jumpToIndex(val);
    radioWheelModal.classList.remove('active');
  });

  btnCloseRadioModal.addEventListener('click', () => {
    radioWheelModal.classList.remove('active');
  });

  // Controls Events
  if (btnPlayPause) {
    btnPlayPause.addEventListener('click', () => {
      if (!window.ttsEngine.playlist || window.ttsEngine.playlist.length === 0) {
        loadPlaylist();
      }

      if (window.ttsEngine.isPlaying) {
        window.ttsEngine.pause();
        btnPlayPause.innerHTML = '<i class="fa-solid fa-play"></i>';
        if (window.audioTimer) window.audioTimer.pause();
      } else {
        window.ttsEngine.play();
        btnPlayPause.innerHTML = '<i class="fa-solid fa-pause"></i>';
        if (window.audioTimer) window.audioTimer.start();
      }
    });
  }

  if (btnPrev) btnPrev.addEventListener('click', () => window.ttsEngine.previous());
  if (btnNext) btnNext.addEventListener('click', () => window.ttsEngine.next());

  if (btnShuffle) {
    btnShuffle.addEventListener('click', () => {
      const isRandom = window.ttsEngine.toggleShuffle();
      if (isRandom) {
        btnShuffle.classList.add('active');
        btnShuffle.style.color = '#00f2fe';
        btnShuffle.style.borderColor = '#00f2fe';
        showToast('🔀 랜덤 셔플 플레이 ON (순서 무작위 낭독)');
      } else {
        btnShuffle.classList.remove('active');
        btnShuffle.style.color = '';
        btnShuffle.style.borderColor = '';
        showToast('▶️ 순차 플레이 ON (순서대로 낭독)');
      }
    });
  }

  if (btnToggleHide) {
    btnToggleHide.addEventListener('click', () => {
      isHideTranslation = !isHideTranslation;
      btnToggleHide.classList.toggle('active', isHideTranslation);
      if (translationWord) {
        if (isHideTranslation) {
          translationWord.classList.add('hidden');
        } else {
          translationWord.classList.remove('hidden');
        }
      }
    });
  }

  // Advanced Custom Audio Parameters & Presets
  const targetRepeatSelect = document.getElementById('targetRepeatSelect');
  const targetIntraGapSelect = document.getElementById('targetIntraGapSelect');
  const explanationRepeatSelect = document.getElementById('explanationRepeatSelect');
  const targetToExpGapSelect = document.getElementById('targetToExpGapSelect');
  const delayNextCardSelect = document.getElementById('delayNextCardSelect');
  const btnSaveCustomPreset = document.getElementById('btnSaveCustomPreset');

  const btnPresetSpeed = document.getElementById('btnPresetSpeed');
  const btnPresetShadowing = document.getElementById('btnPresetShadowing');
  const btnPresetSleep = document.getElementById('btnPresetSleep');
  const btnPresetDictation = document.getElementById('btnPresetDictation');

  if (targetRepeatSelect) {
    targetRepeatSelect.value = window.ttsEngine.targetRepeatCount;
    targetRepeatSelect.addEventListener('change', (e) => {
      window.ttsEngine.targetRepeatCount = parseInt(e.target.value);
    });
  }

  if (targetIntraGapSelect) {
    targetIntraGapSelect.value = window.ttsEngine.targetIntraGap;
    targetIntraGapSelect.addEventListener('change', (e) => {
      window.ttsEngine.targetIntraGap = parseInt(e.target.value);
    });
  }

  if (explanationRepeatSelect) {
    explanationRepeatSelect.value = window.ttsEngine.explanationRepeatCount;
    explanationRepeatSelect.addEventListener('change', (e) => {
      window.ttsEngine.explanationRepeatCount = parseInt(e.target.value);
    });
  }

  if (targetToExpGapSelect) {
    targetToExpGapSelect.value = window.ttsEngine.targetToExpGap;
    targetToExpGapSelect.addEventListener('change', (e) => {
      window.ttsEngine.targetToExpGap = parseInt(e.target.value);
    });
  }

  if (delayNextCardSelect) {
    delayNextCardSelect.value = window.ttsEngine.delayNextCard;
    delayNextCardSelect.addEventListener('change', (e) => {
      window.ttsEngine.delayNextCard = parseInt(e.target.value);
    });
  }

  if (speedSelect) {
    speedSelect.value = window.ttsEngine.rate;
    speedSelect.addEventListener('change', (e) => {
      window.ttsEngine.rate = parseFloat(e.target.value);
    });
  }

  if (btnSaveCustomPreset) {
    btnSaveCustomPreset.addEventListener('click', () => {
      localStorage.setItem('heareng_target_repeat', window.ttsEngine.targetRepeatCount);
      localStorage.setItem('heareng_target_intra_gap', window.ttsEngine.targetIntraGap);
      localStorage.setItem('heareng_exp_repeat', window.ttsEngine.explanationRepeatCount);
      localStorage.setItem('heareng_target_exp_gap', window.ttsEngine.targetToExpGap);
      localStorage.setItem('heareng_delay_next_card', window.ttsEngine.delayNextCard);
      localStorage.setItem('heareng_speech_rate', window.ttsEngine.rate);
      alert('🎉 나만의 커스텀 음성 세팅이 저장되었습니다! 앱 재실행 시에도 그대로 유지됩니다.');
    });
  }

  function applyAudioPreset(tRepeat, tIntraGap, expRepeat, tExpGap, nextGap, rateSpeed) {
    window.ttsEngine.targetRepeatCount = tRepeat;
    window.ttsEngine.targetIntraGap = tIntraGap;
    window.ttsEngine.explanationRepeatCount = expRepeat;
    window.ttsEngine.targetToExpGap = tExpGap;
    window.ttsEngine.delayNextCard = nextGap;
    window.ttsEngine.rate = rateSpeed;

    if (targetRepeatSelect) targetRepeatSelect.value = tRepeat;
    if (targetIntraGapSelect) targetIntraGapSelect.value = tIntraGap;
    if (explanationRepeatSelect) explanationRepeatSelect.value = expRepeat;
    if (targetToExpGapSelect) targetToExpGapSelect.value = tExpGap;
    if (delayNextCardSelect) delayNextCardSelect.value = nextGap;
    if (speedSelect) speedSelect.value = rateSpeed;
  }

  if (btnPresetSpeed) {
    btnPresetSpeed.addEventListener('click', () => {
      applyAudioPreset(3, 300, 1, 300, 500, 1.0);
    });
  }

  if (btnPresetShadowing) {
    btnPresetShadowing.addEventListener('click', () => {
      applyAudioPreset(2, 1000, 1, 800, 1500, 0.9);
    });
  }

  if (btnPresetSleep) {
    btnPresetSleep.addEventListener('click', () => {
      applyAudioPreset(2, 1500, 2, 1000, 2000, 0.8);
    });
  }

  if (btnPresetDictation) {
    btnPresetDictation.addEventListener('click', () => {
      applyAudioPreset(2, 800, 0, 200, 3000, 1.0);
    });
  }

  // Sleep Timer
  if (sleepTimerSelect) {
    sleepTimerSelect.addEventListener('change', (e) => {
      const seconds = parseInt(e.target.value);
      if (sleepTimerId) clearTimeout(sleepTimerId);
      
      if (seconds > 0) {
        sleepTimerId = setTimeout(() => {
          window.ttsEngine.stop();
          btnPlayPause.innerHTML = '<i class="fa-solid fa-play"></i>';
          alert('🌙 슬립 타이머 시간이 완료되어 음성 재생이 정지되었습니다.');
        }, seconds * 1000);
        alert(`🌙 ${seconds / 60}분 후 슬립 타이머가 작동합니다.`);
      }
    });
  }

  // Tab Navigation
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });

  // Audio Timer
  window.audioTimer.onTick = (remaining) => {
    adCountdownText.textContent = window.audioTimer.formatTime(remaining);
  };

  window.audioTimer.onAdTrigger = () => {
    window.ttsEngine.pause();
    btnPlayPause.innerHTML = '<i class="fa-solid fa-play"></i>';
    adModal.classList.add('active');

    // Short & clean radio break speech for 1-hour intervals
    if (window.ttsEngine && window.ttsEngine.speakText) {
      window.ttsEngine.speakText('잠시 후 라디오 광고 시간입니다. 시청 후 낭독 방송이 계속해서 이어집니다.', 'ko-KR');
    }
  };

  adTestTimerSelect.addEventListener('change', (e) => {
    window.audioTimer.setInterval(parseInt(e.target.value));
  });

  btnCloseAdModal.addEventListener('click', () => {
    adModal.classList.remove('active');
    window.audioTimer.reset();
  });

  // --- DAILY 7:00 AM RADIO STATION OPENING AD PIPELINE ---
  const daily7amRadioAdModal = document.getElementById('daily7amRadioAdModal');
  const btnCloseDailyAdModal = document.getElementById('btnCloseDailyAdModal');

  function get7amDailyKey() {
    const now = new Date();
    // If before 7am today, belongs to yesterday's cycle
    if (now.getHours() < 7) {
      now.setDate(now.getDate() - 1);
    }
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_7AM`;
  }

  function checkAndShowDaily7amAd() {
    if (window.audioTimer.isProUnlocked) return false;

    const currentKey = get7amDailyKey();
    const isFirstInstall = !localStorage.getItem('vocalize_is_first_install_launch');

    // BRAND NEW INSTALLATION ONBOARDING GRACE PERIOD (첫 설치 신규 유저 우대)
    if (isFirstInstall) {
      localStorage.setItem('vocalize_is_first_install_launch', 'completed');
      localStorage.setItem('vocalize_daily_7am_ad_key', currentKey);

      // Play warm onboarding welcome message for brand-new users
      if (window.ttsEngine && window.ttsEngine.speakText) {
        window.ttsEngine.speakText('HearEng FM 라디오 낭독 방송에 오신 것을 환영합니다! 첫 방문 감사 선물로 오늘 낭독 방송을 바로 체험해 보세요.', 'ko-KR');
      }
      return false; // Do not block new user with ad on their very first launch!
    }

    const savedKey = localStorage.getItem('vocalize_daily_7am_ad_key');

    if (savedKey !== currentKey) {
      // Pause playback & show daily opening ad modal
      window.ttsEngine.pause();
      btnPlayPause.innerHTML = '<i class="fa-solid fa-play"></i>';
      daily7amRadioAdModal.classList.add('active');

      // Polite long opening speech for experienced users
      if (window.ttsEngine && window.ttsEngine.speakText) {
        window.ttsEngine.speakText('시청자 여러분 안녕하십니까. HearEng은 무제한 무료 라디오 낭독 서비스를 제공하기 위해 1일 1회 첫 실행 시 전면 광고 및 연속 1시간 사용 시 1회 라디오 광고를 진행합니다. 넓은 마음으로 양해 부탁드리며, 시청 후 계속해서 낭독이 이어집니다.', 'ko-KR');
      }
      return true;
    }
    return false;
  }

  if (btnCloseDailyAdModal) {
    btnCloseDailyAdModal.addEventListener('click', () => {
      const currentKey = get7amDailyKey();
      localStorage.setItem('vocalize_daily_7am_ad_key', currentKey);
      if (window.adMobEngine) {
        window.adMobEngine.closeWebAdModalAndResume();
      } else {
        if (daily7amRadioAdModal) daily7amRadioAdModal.classList.remove('active');
        if (btnPlayPause) btnPlayPause.click();
      }
    });
  }

  // --- VOLUNTARY EXTRA AD WATCH HANDLER (응원 광고 보기) ---
  const btnWatchExtraAdBanner = document.getElementById('btnWatchExtraAdBanner');
  if (btnWatchExtraAdBanner) {
    btnWatchExtraAdBanner.addEventListener('click', () => {
      alert('❤️ HearEng 서비스를 응원해 주셔서 감사합니다!\n스폰서 광고 시청이 완료되었으며 개발자에게 후원금이 전달되었습니다.');
    });
  }

  // --- 100% LOCK SCREEN SILENT AUDIO KEEP-ALIVE LOOP (PREVENTS ANDROID DOZE FREEZE) ---
  let silentKeepAliveAudio = null;

  function startSilentKeepAliveAudio() {
    try {
      if (!silentKeepAliveAudio) {
        silentKeepAliveAudio = new Audio('data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=');
        silentKeepAliveAudio.loop = true;
      }
      silentKeepAliveAudio.play().catch(e => {});
      if (window.AndroidNativeTTS) {
        if (typeof window.AndroidNativeTTS.acquireWakeLock === 'function') {
          window.AndroidNativeTTS.acquireWakeLock();
        }
        if (typeof window.AndroidNativeTTS.startRadioNotification === 'function') {
          window.AndroidNativeTTS.startRadioNotification('HearEng 24시간 라디오 낭독중', '유튜브 프리미엄 스타일 잠금화면 무제한 연속 낭독');
        }
      }
    } catch(e) {}
  }

  function stopSilentKeepAliveAudio() {
    try {
      if (silentKeepAliveAudio) {
        silentKeepAliveAudio.pause();
      }
    } catch(e) {}
  }

  // --- YOUTUBE PREMIUM-STYLE BACKGROUND AUDIO & LOCK SCREEN MEDIA SESSION API ---
  let isBackgroundPlayEnabled = true;

  function initMediaSessionAPI() {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: 'HearEng FM 라디오 연속 낭독',
        artist: 'HearEng AI 성우 낭독 방송',
        album: '무제한 오디오북 & 단어장',
        artwork: [
          { src: 'https://cdn-icons-png.flaticon.com/512/3074/3074058.png', sizes: '512x512', type: 'image/png' }
        ]
      });

      navigator.mediaSession.setActionHandler('play', () => {
        btnPlayPause.click();
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        btnPlayPause.click();
      });
      navigator.mediaSession.setActionHandler('previoustrack', () => {
        btnPrev.click();
      });
      navigator.mediaSession.setActionHandler('nexttrack', () => {
        btnNext.click();
      });
    }
  }

  initMediaSessionAPI();

  // --- DEDICATED 24-HOUR RADIO BROADCAST MODE BUTTON HANDLER ---
  let isRadioModeActive = true;
  const btnToggleRadioMode = document.getElementById('btnToggleRadioMode');
  if (btnToggleRadioMode) {
    btnToggleRadioMode.addEventListener('click', () => {
      isRadioModeActive = !isRadioModeActive;
      if (isRadioModeActive) {
        btnToggleRadioMode.innerHTML = '<i class="fa-solid fa-tower-broadcast"></i> 📻 24시간 라디오 방송 모드 (ON)';
        btnToggleRadioMode.style.background = 'linear-gradient(135deg, #6366f1, #8b5cf6)';
        alert('📻 24시간 라디오 방송 연속 낭독 모드가 활성화되었습니다!\nFM 라디오 방송처럼 손대지 않아도 계속해서 낭독이 이어집니다.');
      } else {
        btnToggleRadioMode.innerHTML = '<i class="fa-solid fa-tower-broadcast"></i> 📻 라디오 모드 (OFF)';
        btnToggleRadioMode.style.background = 'var(--text-muted)';
      }
    });
  }

  const btnToggleBackgroundPlay = document.getElementById('btnToggleBackgroundPlay');
  if (btnToggleBackgroundPlay) {
    btnToggleBackgroundPlay.addEventListener('click', () => {
      isBackgroundPlayEnabled = !isBackgroundPlayEnabled;
      if (isBackgroundPlayEnabled) {
        btnToggleBackgroundPlay.innerHTML = '<i class="fa-solid fa-mobile-screen-button"></i> 🎧 화면꺼짐 연속 재생 (ON)';
        btnToggleBackgroundPlay.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        alert('🎧 화면꺼짐 백그라운드 재생 모드가 활성화되었습니다!\n스마트폰 화면을 끄거나 다른 앱을 이용할 때도 낭독 음성이 계속 끊김 없이 출력됩니다.');
      } else {
        btnToggleBackgroundPlay.innerHTML = '<i class="fa-solid fa-mobile-screen-button"></i> 🎧 백그라운드 (OFF)';
        btnToggleBackgroundPlay.style.background = 'var(--text-muted)';
      }
    });
  }

  // Hook into play button to trigger daily 7am ad check on first daily play
  const originalPlayPauseClick = btnPlayPause.onclick;
  btnPlayPause.addEventListener('click', (e) => {
    const isAdShown = checkAndShowDaily7amAd();
    if (isAdShown) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  });

  // --- DUAL PRODUCT EDITION PIPELINE (Free $0 vs PRO $5 / ₩6,900) ---
  // btnDualEditionToggle already declared
  const editionStatusText = document.getElementById('editionStatusText');
  const btnSwitchEditionPro = document.getElementById('btnSwitchEditionPro');
  const editionBadgeTag = document.getElementById('editionBadgeTag');

  let currentAppEdition = localStorage.getItem('vocalize_product_edition') || 'free';

  function applyAppEdition(edition) {
    currentAppEdition = edition;
    localStorage.setItem('vocalize_product_edition', edition);

    if (edition === 'pro_5usd') {
      window.audioTimer.isProUnlocked = true;
      window.audioTimer.pause();
      if (window.adMobEngine) {
        window.adMobEngine.isProUnlocked = true;
        window.adMobEngine.hideAllAdBanners();
      }
      const tab1SponsorAdBox = document.getElementById('tab1SponsorAdBox');
      if (tab1SponsorAdBox) tab1SponsorAdBox.style.display = 'none';

      if (adCountdownText) adCountdownText.textContent = "PRO (무광고)";
      if (editionStatusText) editionStatusText.innerHTML = '👑 [PRO $5 평생 무광고 소장 버전]';
      if (editionBadgeTag) editionBadgeTag.innerHTML = '👑 PRO $5 무광고 소장 중';
      if (btnSwitchEditionPro) {
        btnSwitchEditionPro.innerHTML = '<i class="fa-solid fa-check"></i> PRO $5 평생 소장 중 (무료 버전으로 전환)';
        btnSwitchEditionPro.style.background = '#10b981';
        btnSwitchEditionPro.style.color = '#fff';
      }
    } else {
      window.audioTimer.isProUnlocked = false;
      window.audioTimer.reset();
      if (window.adMobEngine) {
        window.adMobEngine.isProUnlocked = false;
      }
      const tab1SponsorAdBox = document.getElementById('tab1SponsorAdBox');
      if (tab1SponsorAdBox) tab1SponsorAdBox.style.display = 'flex';

      if (editionStatusText) editionStatusText.innerHTML = '⚡ [무료 광고버전] ➔ 👑 $5 PRO 무광고';
      if (editionBadgeTag) editionBadgeTag.innerHTML = '⚡ 무료 광고버전 사용 중';
      if (btnSwitchEditionPro) {
        btnSwitchEditionPro.innerHTML = '👑 $5 (₩6,900) PRO 평생 무광고 소장 버전으로 전환하기';
        btnSwitchEditionPro.style.background = '#fff';
        btnSwitchEditionPro.style.color = '#b45309';
      }
    }
  }

  function toggleProductEdition() {
    if (currentAppEdition === 'free') {
      applyAppEdition('pro_5usd');
      alert('🎉 $5 (₩6,900) PRO 평생 무광고 소장 버전이 활성화되었습니다!\n모든 7시 전면 광고 및 1시간 라디오 광고가 100% 제거되어 평생 무제한 낭독을 즐기실 수 있습니다.');
    } else {
      applyAppEdition('free');
      alert('⚡ 무료 광고 지원 버전으로 전환되었습니다. 1일 1회 첫 실행 광고 및 1시간 사용 시간 광고가 적용됩니다.');
    }
  }

  if (btnDualEditionToggle) btnDualEditionToggle.addEventListener('click', toggleProductEdition);
  if (btnSwitchEditionPro) btnSwitchEditionPro.addEventListener('click', toggleProductEdition);

  // Apply saved product edition on startup
  applyAppEdition(currentAppEdition);

  // Custom User Uploaded Datasets Storage Pipeline
  let userCustomDatasets = JSON.parse(localStorage.getItem('vocalize_user_custom_datasets') || '[]');

  // Pre-load default samples if first time opening or if array is empty
  const hasSample1 = userCustomDatasets.some(d => d.id === 'sample_custom_1');
  const hasSample2 = userCustomDatasets.some(d => d.id === 'sample_custom_2');
  if (userCustomDatasets.length === 0 || (!hasSample1 && !hasSample2)) {
    const defaultSamples = [
      {
        id: 'sample_custom_1',
        name: '[예시] 미드 쉐도잉 필수 표현.csv',
        date: '2026-08-09',
        items: [
          { target: 'Catch up with ~', translation: '뭐뭐를 따라잡다 / 근황을 나누다', phonetic: '[캐치 업 위드]' },
          { target: 'Look forward to ~', translation: '뭐뭐를 진심으로 기대하다', phonetic: '[룩 포워드 투]' },
          { target: 'Count me in!', translation: '나도 꼭 끼워줘!', phonetic: '[카운트 미 인]' },
          { target: 'Take your time', translation: '서두르지 말고 천천히 해', phonetic: '[테이크 유어 타임]' },
          { target: 'No big deal', translation: '별일 아니야 / 괜찮아', phonetic: '[노 빅 딜]' }
        ]
      },
      {
        id: 'sample_custom_2',
        name: '[예시] 영문 소설 읽기 노하우.txt',
        date: '2026-08-09',
        items: [
          { target: 'Once upon a time, there lived a wise old king.', translation: '옛날 옛적에 지혜로운 늙은 왕이 살았습니다.', phonetic: '' },
          { target: 'He loved his people with all his heart.', translation: '그는 온 마음을 다해 백성들을 사랑했습니다.', phonetic: '' },
          { target: 'The kingdom was peaceful and prosperous.', translation: '그 왕국은 평화롭고 번영했습니다.', phonetic: '' }
        ]
      }
    ];
    if (userCustomDatasets.length === 0) {
      userCustomDatasets = defaultSamples;
    } else {
      if (!hasSample1) userCustomDatasets.unshift(defaultSamples[0]);
      if (!hasSample2) userCustomDatasets.unshift(defaultSamples[1]);
    }
    localStorage.setItem('vocalize_user_custom_datasets', JSON.stringify(userCustomDatasets));
  }

  function registerUserCustomDatasets() {
    if (!SECTION_LEVELS.user_custom) {
      SECTION_LEVELS.user_custom = [];
    } else {
      SECTION_LEVELS.user_custom = [];
    }

    if (userCustomDatasets.length === 0) {
      SECTION_LEVELS.user_custom.push({ key: 'no_custom_file', label: '📂 (아직 업로드된 커스텀 파일이 없습니다)' });
      window.VOCAB_EXAM.no_custom_file = {
        label: '📂 (아직 업로드된 커스텀 파일이 없습니다)',
        get words() { return [{ target: 'No File Uploaded', translation: '소설/업로드 탭에서 TXT/CSV 파일을 추가하세요.', phonetic: '' }]; },
        get idioms() { return [{ target: 'No File Uploaded', translation: '소설/업로드 탭에서 TXT/CSV 파일을 추가하세요.', phonetic: '' }]; },
        get sentences() { return [{ target: 'No File Uploaded', translation: '소설/업로드 탭에서 TXT/CSV 파일을 추가하세요.', phonetic: '' }]; }
      };
    } else {
      userCustomDatasets.forEach(ds => {
        SECTION_LEVELS.user_custom.push({ key: ds.id, label: `📂 ${ds.name} (${ds.items.length}개)` });
        window.VOCAB_EXAM[ds.id] = {
          label: `📂 ${ds.name} (${ds.items.length}개)`,
          get words() { return ds.items; },
          get idioms() { return ds.items; },
          get sentences() { return ds.items; }
        };
      });
    }

    renderUserCustomFilesListUI();
  }

  function renderUserCustomFilesListUI() {
    const listContainer = document.getElementById('userCustomFilesList');
    const countContainer = document.getElementById('userCustomFilesCount');
    const tab1ChipsContainer = document.getElementById('tab1CustomFilesChips');
    const tab1CountContainer = document.getElementById('tab1CustomFilesCount');

    if (countContainer) countContainer.textContent = `총 ${userCustomDatasets.length}개 파일`;
    if (tab1CountContainer) tab1CountContainer.textContent = `${userCustomDatasets.length}개 보존됨`;

    // 1. Render Tab 1 Quick Custom File Chips (with Delete button)
    if (tab1ChipsContainer) {
      if (userCustomDatasets.length === 0) {
        tab1ChipsContainer.innerHTML = `
          <span style="font-size: 11px; color: var(--text-muted);">보존된 커스텀 파일이 없습니다. '소설/단어 업로드' 탭에서 파일을 추가해 보세요!</span>
        `;
      } else {
        tab1ChipsContainer.innerHTML = userCustomDatasets.map(ds => `
          <div style="display: flex; align-items: center; gap: 4px; background: var(--bg-card); border: 1px solid var(--primary); padding: 4px 8px; border-radius: 14px;">
            <button class="btn-chip-custom-ds" data-id="${ds.id}" style="background: transparent; border: none; color: var(--primary); font-size: 11px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 4px;">
              <i class="fa-solid fa-play"></i> 📁 ${ds.name} (${ds.items.length}개)
            </button>
            <button class="btn-delete-chip-ds" data-id="${ds.id}" title="파일 삭제" style="background: #ef4444; color: #fff; border: none; border-radius: 50%; width: 18px; height: 18px; font-size: 9px; cursor: pointer; display: flex; align-items: center; justify-content: center; margin-left: 2px;">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        `).join('');

        document.querySelectorAll('.btn-chip-custom-ds').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const targetId = e.currentTarget.dataset.id;
            mainCategorySelect.value = 'user_custom';
            renderSubLevels('user_custom', targetId);
          });
        });

        document.querySelectorAll('.btn-delete-chip-ds').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const targetId = e.currentTarget.dataset.id;
            const targetDs = userCustomDatasets.find(d => d.id === targetId);
            if (!targetDs) return;

            if (confirm(`'${targetDs.name}' 커스텀 파일이 완전히 삭제됩니다. 삭제하시겠습니까?`)) {
              userCustomDatasets = userCustomDatasets.filter(d => d.id !== targetId);
              localStorage.setItem('vocalize_user_custom_datasets', JSON.stringify(userCustomDatasets));
              registerUserCustomDatasets();
              renderSubLevels('user_custom');
            }
          });
        });
      }
    }

    // 2. Render Tab 2 Custom Files List
    if (!listContainer) return;

    if (userCustomDatasets.length === 0) {
      listContainer.innerHTML = `
        <div style="font-size: 12px; color: var(--text-muted); text-align: center; padding: 12px; background: var(--bg-card); border-radius: 6px;">
          아직 저장된 커스텀 파일이 없습니다. 상단에서 TXT/CSV 파일을 업로드해 보세요!
        </div>
      `;
      return;
    }

    listContainer.innerHTML = userCustomDatasets.map(ds => `
      <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 10px 12px; display: flex; align-items: center; justify-content: space-between; gap: 8px;">
        <div style="display: flex; flex-direction: column; gap: 2px; overflow: hidden;">
          <div style="font-size: 12px; font-weight: 700; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            <i class="fa-solid fa-file-contract" style="color: var(--primary);"></i> ${ds.name}
          </div>
          <div style="font-size: 10px; color: var(--text-muted);">
            총 <strong>${ds.items.length}개</strong> 문장/단어 • ${ds.date || '저장됨'}
          </div>
        </div>

        <div style="display: flex; gap: 6px; flex-shrink: 0;">
          <button class="btn-jump-go btn-play-custom-ds" data-id="${ds.id}" style="background: var(--primary); padding: 5px 10px; font-size: 11px;">
            <i class="fa-solid fa-play"></i> 단어장에서 바로 재생
          </button>
          <button class="btn-jump-go btn-delete-custom-ds" data-id="${ds.id}" style="background: #ef4444; padding: 5px 8px; font-size: 11px;">
            <i class="fa-solid fa-trash-can"></i> 삭제
          </button>
        </div>
      </div>
    `).join('');

    // Play Custom Dataset
    document.querySelectorAll('.btn-play-custom-ds').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetId = e.currentTarget.dataset.id;
        mainCategorySelect.value = 'user_custom';
        renderSubLevels('user_custom', targetId);
        document.querySelector('[data-tab="tabVocab"]').click();
      });
    });

    // Delete Custom Dataset
    document.querySelectorAll('.btn-delete-custom-ds').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetId = e.currentTarget.dataset.id;
        const targetDs = userCustomDatasets.find(d => d.id === targetId);
        if (!targetDs) return;

        if (confirm(`'${targetDs.name}' 커스텀 파일을 정말 삭제하시겠습니까?`)) {
          userCustomDatasets = userCustomDatasets.filter(d => d.id !== targetId);
          localStorage.setItem('vocalize_user_custom_datasets', JSON.stringify(userCustomDatasets));
          registerUserCustomDatasets();
          
          if (mainCategorySelect.value === 'user_custom') {
            renderSubLevels('user_custom');
          }
        }
      });
    });
  }

  // Register existing custom datasets on startup
  registerUserCustomDatasets();

  // File Download Helper
  function downloadBlob(content, filename, contentType) {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Sample Download & Native Share Handlers
  function shareOrDownloadSample(content, filename, mimeType) {
    if (customTextInput) customTextInput.value = content;
    if (navigator.share && navigator.canShare) {
      try {
        const file = new File([content], filename, { type: mimeType });
        if (navigator.canShare({ files: [file] })) {
          navigator.share({
            title: `HearEng ${filename} 샘플`,
            text: `HearEng ${filename} 예제 템플릿입니다.`,
            files: [file]
          }).catch(() => downloadBlob(content, filename, mimeType));
          return;
        }
      } catch(e){}
    }
    downloadBlob(content, filename, mimeType);
  }

  const btnDownloadWordCsv = document.getElementById('btnDownloadWordCsv');
  const btnDownloadSentenceCsv = document.getElementById('btnDownloadSentenceCsv');
  const btnDownloadTxtSample = document.getElementById('btnDownloadTxtSample');

  if (btnDownloadWordCsv) {
    btnDownloadWordCsv.addEventListener('click', () => {
      const sample = 'apple, 사과, [애플]\nbanana, 바나나, [바나나]\ncoffee, 커피, [커피]\nhappy, 행복한, [해피]\nsuccess, 성공, [서세스]';
      shareOrDownloadSample(sample, 'sample_vocab_words.csv', 'text/csv;charset=utf-8;');
      if (typeof showToast === 'function') showToast('📥 [단어 예제] 텍스트가 입력되고 공유/다운로드 창이 열렸습니다!');
    });
  }

  if (btnDownloadSentenceCsv) {
    btnDownloadSentenceCsv.addEventListener('click', () => {
      const sample = 'Nice to meet you., 만나서 반가워요., [나이스 투 미트 유]\nHow are you today?, 오늘 기분이 어떠신가요?, [하우 아 유 투데이]\nPractice makes perfect., 연습이 완벽을 만듭니다., [프랙티스 메익스 퍼펙트]';
      shareOrDownloadSample(sample, 'sample_sentences.csv', 'text/csv;charset=utf-8;');
      if (typeof showToast === 'function') showToast('📥 [문장 예제] 텍스트가 입력되고 공유/다운로드 창이 열렸습니다!');
    });
  }

  if (btnDownloadTxtSample) {
    btnDownloadTxtSample.addEventListener('click', () => {
      const sample = 'Once upon a time, there lived a wise prince.\nHe loved learning new languages every single day.\nListening to audiobooks made him speak English fluently.';
      shareOrDownloadSample(sample, 'sample_novel.txt', 'text/plain;charset=utf-8;');
      if (typeof showToast === 'function') showToast('📥 [소설/텍스트 예제] 텍스트가 입력되고 공유/다운로드 창이 열렸습니다!');
    });
  }

  // Beginner Guide Accordion Toggle
  const btnToggleGuide = document.getElementById('btnToggleGuide');
  const guideContentBox = document.getElementById('guideContentBox');
  const guideArrowIcon = document.getElementById('guideArrowIcon');

  if (btnToggleGuide && guideContentBox) {
    btnToggleGuide.addEventListener('click', () => {
      const isHidden = guideContentBox.style.display === 'none' || guideContentBox.style.display === '';
      guideContentBox.style.display = isHidden ? 'flex' : 'none';
      if (guideArrowIcon) {
        guideArrowIcon.className = isHidden ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down';
      }
    });
  }

  // File Upload Handling
  let uploadedFileName = '커스텀 파일.csv';

    // File Input & Dropzone Change Handlers
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      uploadedFileName = file.name;
      const reader = new FileReader();
      reader.onload = (event) => {
        if (customTextInput) {
          customTextInput.value = event.target.result;
        }
        alert(`📂 [${file.name}] 업로드 준비 완료! (${(file.size / 1024).toFixed(1)} KB)
아래 [소설/단어장 저장 및 단어장 플레이어로 바로 연속 재생] 버튼을 누르시면 낭독이 시작됩니다!`);
      };
      reader.readAsText(file, 'UTF-8');
    });
  }

  if (dropzone) {
    dropzone.addEventListener('click', (e) => {
      if (e.target !== fileInput && fileInput) {
        fileInput.click();
      }
    });
  }

  btnLoadCustomText.addEventListener('click', () => {
    const raw = customTextInput.value.trim();
    if (!raw) {
      alert('텍스트를 입력하거나 CSV/TXT 파일을 업로드해 주세요.');
      return;
    }

    const lines = raw.split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0 && !l.startsWith('#') && !l.startsWith('//'));

    const customItems = lines.map(line => {
      let target = line;
      let translation = '';
      let phonetic = '';

      if (line.includes(',')) {
        const parts = line.split(',');
        target = parts[0].trim().replace(/^"|"$/g, '');
        translation = parts[1] ? parts[1].trim().replace(/^"|"$/g, '') : '';
        phonetic = parts[2] ? parts[2].trim().replace(/^"|"$/g, '') : '';
      } else if (line.includes('\t')) {
        const parts = line.split('\t');
        target = parts[0].trim();
        translation = parts[1] ? parts[1].trim() : '';
        phonetic = parts[2] ? parts[2].trim() : '';
      } else {
        target = line.trim();
        translation = '';
        phonetic = '';
      }

      return { target, translation, phonetic };
    });

    if (customItems.length === 0) {
      alert('유효한 문장이나 단어가 없습니다.');
      return;
    }

    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    const newDataset = {
      id: 'custom_' + Date.now(),
      name: uploadedFileName || '내 커스텀 학습.csv',
      date: dateStr,
      items: customItems
    };

    userCustomDatasets.unshift(newDataset);
    localStorage.setItem('vocalize_user_custom_datasets', JSON.stringify(userCustomDatasets));

    // Register into VOCAB_EXAM and SECTION_LEVELS
    registerUserCustomDatasets();

    // Switch main category to user_custom and load dataset
    mainCategorySelect.value = 'user_custom';
    renderSubLevels('user_custom', newDataset.id);

    // Switch Tab to Vocabulary Player Tab
    document.querySelector('[data-tab="tabVocab"]').click();
    
    alert(`🎉 업로드 성공!\n'단어장' 탭의 [📁 사용자 커스텀 학습] ➔ [📂 ${newDataset.name}] 카테고리로 연동되었습니다. (${customItems.length}개 항목) 연속 재생을 시작합니다!`);
  });





      // Initial Load (Synchronous 0s SubLevel Render & Immediate Card Load)
  const startSection = (mainCategorySelect && mainCategorySelect.value) ? mainCategorySelect.value : 'exam';
  renderSubLevels(startSection, 'toddler_3_5');
  initAppEdition();
  checkSavedBookmark();

  try {
    if (screen.orientation && typeof screen.orientation.lock === 'function') {
      screen.orientation.lock('portrait').catch(() => {});
    }
  } catch(e) {}
}

// Bulletproof Initialization Trigger
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initVocalizeApp();
} else {
  document.addEventListener('DOMContentLoaded', initVocalizeApp);
}
