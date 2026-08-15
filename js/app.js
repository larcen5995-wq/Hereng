/* ==========================================================================
   HEARENG - Main Application Controller (v2.15 Production)
   완전 재작성 - const 중복 선언 제거, 재생 컨트롤 완전 통합
   ========================================================================== */

function initVocalizeApp() {
  console.log('🚀 HearEng v2.15 initializing...');

  // ─────────────────────────────────────────────────────────
  // 헬퍼: 단일 DOM 참조
  // ─────────────────────────────────────────────────────────
  const $  = id => document.getElementById(id);
  const $$ = sel => document.querySelectorAll(sel);

  // =========================================================================
  // 1. PRO / 플레이스토어 모달
  // =========================================================================
  const playStoreProModal = $('playStoreProModal');

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

  ['btnUnlockProLicense','btnHeaderProUnlock','btnDualEditionToggle'].forEach(id => {
    const el = $(id); if (el) el.addEventListener('click', openPlayStoreModal);
  });

  const btnConfirmGoPlayStore = $('btnConfirmGoPlayStore');
  if (btnConfirmGoPlayStore) {
    btnConfirmGoPlayStore.addEventListener('click', () => {
      triggerPlayStoreRedirect();
      if (playStoreProModal) playStoreProModal.classList.remove('active');
    });
  }
  const btnClosePlayStoreModal = $('btnClosePlayStoreModal');
  if (btnClosePlayStoreModal) {
    btnClosePlayStoreModal.addEventListener('click', () => {
      if (playStoreProModal) playStoreProModal.classList.remove('active');
    });
  }

  function updateProHeaderBadge() {
    const el = $('editionStatusText');
    if (el) el.innerHTML = (window.adMobEngine && window.adMobEngine.isProUnlocked)
      ? '👑 $5 PRO 영구 무광고 소장중'
      : '⚡ [무료 광고버전] ➔ 👑 $5 PRO 무광고';
  }
  updateProHeaderBadge();

  // =========================================================================
  // 2. 탭 전환
  // =========================================================================
  const tabButtons = $$('.nav-tabs .tab-btn');
  const tabPanes   = $$('.app-content .tab-pane');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-tab');
      if (!id) return;
      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const pane = $(id);
      if (pane) pane.classList.add('active');
    });
  });

  // =========================================================================
  // 3. 테마 / 슬립 타이머
  // =========================================================================
  const themeSelect     = $('themeSelect');
  const btnThemeToggle  = $('btnThemeToggle');
  const sleepTimerSelect = $('sleepTimerSelect');
  const THEMES = ['theme-midnight', 'theme-slate', 'theme-clarity'];

  function applyTheme(name) {
    if (!THEMES.includes(name)) name = 'theme-midnight';
    document.body.className = name;
    localStorage.setItem('heareng_theme', name);
    if (themeSelect) themeSelect.value = name;
  }
  applyTheme(localStorage.getItem('heareng_theme') || 'theme-midnight');

  if (themeSelect) themeSelect.addEventListener('change', e => applyTheme(e.target.value));
  if (btnThemeToggle) {
    btnThemeToggle.addEventListener('click', () => {
      const idx = THEMES.indexOf(document.body.className);
      applyTheme(THEMES[(idx + 1) % THEMES.length]);
    });
  }
  if (sleepTimerSelect) {
    sleepTimerSelect.addEventListener('change', e => {
      const sec = parseInt(e.target.value, 10);
      if (window.audioTimer) {
        if (sec > 0) { window.audioTimer.setInterval(sec); window.audioTimer.start(); }
        else { window.audioTimer.pause(); }
      }
    });
  }

  const speedSelect = $('speedSelect');
  if (speedSelect) {
    speedSelect.addEventListener('change', e => {
      const val = parseFloat(e.target.value) || 1.0;
      localStorage.setItem('heareng_speed', val);
      if (window.ttsEngine && typeof window.ttsEngine.setSpeed === 'function') {
        window.ttsEngine.setSpeed(val);
      }
      if (window.AndroidNativeTTS && typeof window.AndroidNativeTTS.setSpeechRate === 'function') {
        window.AndroidNativeTTS.setSpeechRate(val);
      }
    });
    // 저장된 속도 복원
    const savedSpeed = localStorage.getItem('heareng_speed');
    if (savedSpeed) {
      speedSelect.value = savedSpeed;
      const val = parseFloat(savedSpeed);
      if (window.ttsEngine && typeof window.ttsEngine.setSpeed === 'function') window.ttsEngine.setSpeed(val);
      if (window.AndroidNativeTTS && typeof window.AndroidNativeTTS.setSpeechRate === 'function') window.AndroidNativeTTS.setSpeechRate(val);
    }
  }

  const btnSaveSettings = $('btnSaveSettings');
  if (btnSaveSettings) {
    btnSaveSettings.addEventListener('click', () => {
      ['repeatSelect','delaySelect','speedSelect','themeSelect'].forEach(id => {
        const el = $(id);
        if (el && el.value) localStorage.setItem('heareng_' + id.replace('Select',''), el.value);
      });
      alert('설정이 저장되었습니다!');
    });
  }

  // =========================================================================
  // 4. 분류 데이터 (대/중/소)
  // =========================================================================
  let currentSection = 'exam';
  let currentLevel   = 'toddler_3_5';
  let currentType    = 'words';

  const SECTION_LEVELS = {
    exam: [
      { key: 'toddler_3_5',           label: '🍼 3~5세 유아 말문 터지기' },
      { key: 'kindergarten_6_7',       label: '🧒 6~7세 유치원 파닉스' },
      { key: 'elem_essential_50',      label: '✨ 초등 교과서 필수 표현 (50 Units & 150개 문장)' },
      { key: 'elementary_800',         label: '🎒 2015 교육부 지정 초등 필수 800단어' },
      { key: 'elementary_1300',        label: '🎒 초등 필수 영단어 1,300개 완성' },
      { key: 'middle',                 label: '🏫 중학교 필수 영단어 (2,000개)' },
      { key: 'essential_5000_1',       label: '🔥 필수 영단어 5000 [1단계: 500단어]' },
      { key: 'essential_5000_2',       label: '🔥 필수 영단어 5000 [2단계: 500단어]' },
      { key: 'essential_5000_3',       label: '🔥 필수 영단어 5000 [3단계: 500단어]' },
      { key: 'essential_5000_4',       label: '🔥 필수 영단어 5000 [4단계: 500단어]' },
      { key: 'essential_5000_5',       label: '🔥 필수 영단어 5000 [5단계: 500단어]' },
      { key: 'essential_5000_6',       label: '🔥 필수 영단어 5000 [6단계: 500단어]' },
      { key: 'essential_5000_7',       label: '🔥 필수 영단어 5000 [7단계: 500단어]' },
      { key: 'essential_5000_8',       label: '🔥 필수 영단어 5000 [8단계: 500단어]' },
      { key: 'essential_5000_9',       label: '🔥 필수 영단어 5000 [9단계: 500단어]' },
      { key: 'essential_5000_10',      label: '🔥 필수 영단어 5000 [10단계: 500단어]' },
      { key: 'high_1',                 label: '🎓 고등 수능 기출 [1단계: 500단어]' },
      { key: 'high_2',                 label: '🎓 고등 수능 기출 [2단계: 500단어]' },
      { key: 'high_3',                 label: '🎓 고등 수능 기출 [3단계: 500단어]' },
      { key: 'high_4',                 label: '🎓 고등 수능 기출 [4단계: 500단어]' },
      { key: 'high_5',                 label: '🎓 고등 수능 기출 [5단계: 500단어]' },
      { key: 'high_6',                 label: '🎓 고등 수능 기출 [6단계: 500단어]' },
      { key: 'high',                   label: '🎓 고등 수능 기출 전체 (3,000개)' }
    ],
    business: [
      { key: 'situations_master',      label: '🎭 실생활 상황별 영어 회화 & 어휘 마스터' },
      { key: 'biz_nouns_500',          label: '💼 비즈니스 회사 필수 명사 A-Z (500문장)' },
      { key: 'biz_workplace_500',      label: '👔 비즈니스 실무 필수 표현 & 회사 생활 회화 (500문장)' },
      { key: 'real_life_200',          label: '🗣️ 실생활 영어 200문장 완성하기' },
      { key: 'native_500',             label: '🗣️ 원어민 매일 쓰는 필수 회화 패턴 500문장' },
      { key: 'practical_1000',         label: '✍️ 실용 영작문 & 실생활 1,000문장 완성하기' },
      { key: 'tech_it',                label: '💻 IT / 테크 필수 어휘' },
      { key: 'business_email',         label: '📧 비즈니스 이메일' },
      { key: 'airport_travel',         label: '✈️ 공항 & 출장 회화' },
      { key: 'hotel_stay',             label: '🏨 호텔 & 숙소 회화' },
      { key: 'shopping_dining',        label: '🛒 쇼핑 & 식당/카페' },
      { key: 'emotions_real',          label: '💖 감정 표현' },
      { key: 'sleep_radio',            label: '🌙 수면 힐링 라디오' }
    ],
    pop: [
      { key: 'tv_slang_1000',          label: '🍿 미드 & 영화 실전 슬랭 & 팝컬처 (1,000문장)' },
      { key: 'movie_quotes_1000',      label: '🎬 해외 명작 영화 100선 대표 명대사 (1,000문장)' },
      { key: 'sitcom_comedy_1000',     label: '🎞️ 시트콤 & 코미디 실전 일상회화 (1,000문장)' },
      { key: 'crime_medical_1000',     label: '🕵️ 수사물 & 메디컬 & 법정드라마 회화 (1,000문장)' },
      { key: 'scifi_action_1000',      label: '🚀 SF & 판타지 & 액션 블록버스터 명대사 (1,000문장)' },
      { key: 'tv_slang_500',           label: '🍿 미드 & 영화 실전 슬랭 & 관용 표현 (500문장)' }
    ],
    user_custom: []
  };

  // ── 중분류 드롭다운 렌더링 ──
  function renderSubLevels(sectionKey, activeLevelKey) {
    currentSection = sectionKey || 'exam';

    if (currentSection === 'user_custom') {
      const stored = JSON.parse(localStorage.getItem('user_custom_files') || '[]');
      SECTION_LEVELS.user_custom = stored.map(item => ({
        key: item.id, label: `${item.title || item.name} (${item.count || (item.items ? item.items.length : 0)}개)`,
        items: item.items, type: item.type || 'words'
      }));
    }

    ['subLevelSelect', 'subCategorySelect'].forEach(selectId => {
      const sel = $(selectId);
      if (!sel) return;
      sel.innerHTML = '';
      const levels = SECTION_LEVELS[currentSection] || [];
      if (levels.length === 0 && currentSection === 'user_custom') {
        const o = document.createElement('option');
        o.value = ''; o.textContent = '저장된 나만의 단어장이 없습니다';
        sel.appendChild(o);
      } else {
        levels.forEach(lvl => {
          const o = document.createElement('option');
          o.value = lvl.key || lvl.id;
          o.textContent = lvl.label || lvl.name || lvl.title;
          sel.appendChild(o);
        });
        if (activeLevelKey) sel.value = activeLevelKey;
        else if (levels.length > 0) sel.selectedIndex = 0;
      }
    });

    const btnDel = $('btnDeleteCurrentCustomFile');
    if (btnDel) {
      btnDel.style.display = (currentSection === 'user_custom' && (SECTION_LEVELS.user_custom || []).length > 0) ? 'inline-flex' : 'none';
    }
  }

  // =========================================================================
  // 5. 데이터셋 로더
  // =========================================================================
  window.loadDatasetByLevelKey = function(levelKey) {
    if (!levelKey) return;
    currentLevel = levelKey;
    let items = [];

    if (levelKey.startsWith('custom_')) {
      try {
        const stored = JSON.parse(localStorage.getItem('user_custom_files') || '[]');
        const found = stored.find(x => x.id === levelKey);
        if (found && found.items) items = found.items;
      } catch(e) {}
    } else {
      try {
        const data = window.VOCABULARY_DATA && window.VOCABULARY_DATA['EN_KO'];
        if (data && data.levels) {
          const levelData = data.levels[levelKey];
          if (Array.isArray(levelData)) {
            items = levelData;
          } else if (levelData && typeof levelData === 'object') {
            items = levelData[currentType] || levelData.words || levelData.sentences || levelData.idioms || [];
          }
        }
      } catch(e) { console.warn('Dataset load error:', e); }
    }

    if (!items || items.length === 0) {
      console.warn('No items for level:', levelKey, 'type:', currentType);
    }

    const isNovel = (currentType === 'novel') || (items[0] && (items[0].isNovel || items[0].type === 'novel'));

    if (window.ttsEngine) {
      window.ttsEngine.isNovelMode = isNovel;
      window.ttsEngine.setPlaylist(items || []);
      window.ttsEngine.currentIndex = 0;
    }

    window.forceSyncMainCard(0);

    // 카드 배지 업데이트
    const badge = $('cardCategoryBadge');
    if (badge) {
      if (isNovel) {
        badge.textContent = `📖 소설 무제한 연속 낭독 모드`;
      } else {
        const levels = SECTION_LEVELS[currentSection] || [];
        const lvlObj = levels.find(l => l.key === levelKey || l.id === levelKey);
        const lbl = lvlObj ? lvlObj.label.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim() : levelKey;
        badge.textContent = `${lbl} • ${currentType.toUpperCase()}`;
      }
    }

    // 슬라이더 max 업데이트
    const slider = $('cardSlider');
    const totalSpan = $('cardTotalSpan');
    if (slider) { slider.min = 1; slider.max = (items || []).length || 1; slider.value = 1; }
    if (totalSpan) totalSpan.textContent = (items || []).length;
  };

  // =========================================================================
  // 6. UI 카드 동기화
  // =========================================================================
  window.forceSyncMainCard = function(index) {
    try {
      const eng = window.ttsEngine;
      if (eng && eng.playlist && eng.playlist[index]) {
        const it = eng.playlist[index];
        eng.currentIndex = index;
        const total = eng.playlist.length;
        const isNovel = it.isNovel || (it.type === 'novel') || (eng.isNovelMode);

        if (isNovel) {
          if ($('targetWord')) {
            $('targetWord').style.fontSize = '18px';
            $('targetWord').style.lineHeight = '1.6';
            $('targetWord').style.textAlign = 'left';
            $('targetWord').textContent = it.target || '';
          }
          if ($('translationWord')) {
            $('translationWord').style.fontSize = '12px';
            $('translationWord').style.color = 'var(--primary)';
            $('translationWord').textContent = '📖 소설 무제한 연속 낭독 중...';
          }
          if ($('phoneticText'))  $('phoneticText').textContent  = `[문장 ${index + 1} / ${total}]`;
        } else {
          if ($('targetWord')) {
            $('targetWord').style.fontSize = '';
            $('targetWord').style.lineHeight = '';
            $('targetWord').style.textAlign = '';
            $('targetWord').textContent = it.target || '';
          }
          const cleanTrans = (it.translation || '').replace(/\s*[\(\[\{].*?[\)\]\}]/g, '').trim();
          if ($('translationWord')) {
            $('translationWord').style.fontSize = '';
            $('translationWord').style.color = '';
            $('translationWord').textContent = cleanTrans || it.translation || '';
          }
          if ($('phoneticText'))  $('phoneticText').textContent  = it.phonetic || '';
        }

        if ($('cardIndexCount')) $('cardIndexCount').textContent = `${index + 1} / ${total}`;
        if ($('wheelDisplayNum')) $('wheelDisplayNum').textContent = `${index + 1} / ${total}`;
        if ($('cardSlider'))   { $('cardSlider').max = total; $('cardSlider').value = index + 1; }
        if ($('cardJumpInput')) $('cardJumpInput').value = index + 1;
        if ($('cardTotalSpan')) $('cardTotalSpan').textContent = total;
      } else {
        if ($('targetWord'))    $('targetWord').textContent    = '단어/소설 없음';
        if ($('translationWord')) $('translationWord').textContent = '선택한 분류에 데이터가 없습니다.';
        if ($('cardIndexCount')) $('cardIndexCount').textContent = '0 / 0';
      }
    } catch(e) { console.warn('forceSyncMainCard error:', e); }
  };

  window.updateAppUI = function(index) {
    if (window.ttsEngine) window.ttsEngine.currentIndex = index;
    window.forceSyncMainCard(index);
  };

  // =========================================================================
  // 7. TTS 엔진 콜백 연결
  // =========================================================================
  if (window.ttsEngine) {
    window.ttsEngine.onCardChange = function(item, index) {
      window.forceSyncMainCard(index);
    };
    window.ttsEngine.onSpeechStart = function() {
      const viz = $('visualizer'); if (viz) viz.classList.add('playing');
      const btn = $('btnPlayPause'); if (btn) btn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    };
    window.ttsEngine.onSpeechEnd = function() {
      if (window.ttsEngine && window.ttsEngine.isPlaying) return; // 연속 재생 중이면 무시
      const viz = $('visualizer'); if (viz) viz.classList.remove('playing');
      const btn = $('btnPlayPause'); if (btn) btn.innerHTML = '<i class="fa-solid fa-play"></i>';
    };
  }

  // =========================================================================
  // 8. 재생 컨트롤
  // =========================================================================
  let isHideMeaning = false;
  let isRadioMode   = false;

  // ── 재생/일시정지 ──
  const btnPlayPause = $('btnPlayPause');
  if (btnPlayPause) {
    btnPlayPause.addEventListener('click', () => {
      if (!window.ttsEngine) return;
      if (window.ttsEngine.isPlaying) {
        window.ttsEngine.pause();
        btnPlayPause.innerHTML = '<i class="fa-solid fa-play"></i>';
        const viz = $('visualizer'); if (viz) viz.classList.remove('playing');
      } else {
        window.ttsEngine.play();
        btnPlayPause.innerHTML = '<i class="fa-solid fa-pause"></i>';
        const viz = $('visualizer'); if (viz) viz.classList.add('playing');
      }
    });
  }

  // ── 이전 카드 ──
  const btnPrev = $('btnPrev');
  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (!window.ttsEngine || !window.ttsEngine.playlist.length) return;
      const wasP = window.ttsEngine.isPlaying;
      window.ttsEngine.pause();
      const len = window.ttsEngine.playlist.length;
      window.ttsEngine.currentIndex = (window.ttsEngine.currentIndex - 1 + len) % len;
      window.forceSyncMainCard(window.ttsEngine.currentIndex);
      if (wasP) window.ttsEngine.play();
    });
  }

  // ── 다음 카드 ──
  const btnNext = $('btnNext');
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (!window.ttsEngine || !window.ttsEngine.playlist.length) return;
      const wasP = window.ttsEngine.isPlaying;
      window.ttsEngine.pause();
      window.ttsEngine.currentIndex = (window.ttsEngine.currentIndex + 1) % window.ttsEngine.playlist.length;
      window.forceSyncMainCard(window.ttsEngine.currentIndex);
      if (wasP) window.ttsEngine.play();
    });
  }

  // ── 셔플 ──
  const btnShuffle = $('btnShuffle');
  if (btnShuffle) {
    btnShuffle.addEventListener('click', () => {
      if (!window.ttsEngine) return;
      const on = window.ttsEngine.toggleShuffle();
      btnShuffle.style.color      = on ? 'var(--accent)' : '';
      btnShuffle.style.background = on ? 'rgba(16,185,129,0.15)' : '';
    });
  }

  // ── 뜻 가리기 ──
  const btnToggleHide = $('btnToggleHide');
  if (btnToggleHide) {
    btnToggleHide.addEventListener('click', () => {
      isHideMeaning = !isHideMeaning;
      const f = isHideMeaning ? 'blur(6px)' : 'none';
      if ($('translationWord')) $('translationWord').style.filter = f;
      if ($('phoneticText'))    $('phoneticText').style.filter    = f;
      btnToggleHide.style.color = isHideMeaning ? 'var(--accent)' : '';
    });
  }

  // ── 슬라이더 ──
  const cardSlider = $('cardSlider');
  if (cardSlider) {
    cardSlider.addEventListener('input', () => {
      const idx = parseInt(cardSlider.value, 10) - 1;
      if (!isNaN(idx) && window.ttsEngine) {
        window.ttsEngine.currentIndex = idx;
        window.forceSyncMainCard(idx);
      }
    });
    cardSlider.addEventListener('change', () => {
      const idx = parseInt(cardSlider.value, 10) - 1;
      if (!isNaN(idx) && window.ttsEngine && window.ttsEngine.isPlaying) {
        window.ttsEngine.pause();
        window.ttsEngine.currentIndex = idx;
        window.ttsEngine.play();
      }
    });
  }

  // ── 건너뛰기 ──
  function skipCards(delta) {
    if (!window.ttsEngine || !window.ttsEngine.playlist.length) return;
    const wasP = window.ttsEngine.isPlaying;
    window.ttsEngine.pause();
    let idx = window.ttsEngine.currentIndex + delta;
    idx = Math.max(0, Math.min(window.ttsEngine.playlist.length - 1, idx));
    window.ttsEngine.currentIndex = idx;
    window.forceSyncMainCard(idx);
    if (wasP) window.ttsEngine.play();
  }
  const btnSB100 = $('btnSkipBack100'); if (btnSB100) btnSB100.addEventListener('click', () => skipCards(-100));
  const btnSB10  = $('btnSkipBack10');  if (btnSB10)  btnSB10.addEventListener('click',  () => skipCards(-10));
  const btnSN10  = $('btnSkipNext10');  if (btnSN10)  btnSN10.addEventListener('click',  () => skipCards(10));
  const btnSN100 = $('btnSkipNext100'); if (btnSN100) btnSN100.addEventListener('click', () => skipCards(100));

  // ── 이동 버튼 ──
  const btnJumpGo    = $('btnJumpGo');
  const cardJumpInput = $('cardJumpInput');
  if (btnJumpGo && cardJumpInput) {
    btnJumpGo.addEventListener('click', () => {
      const idx = parseInt(cardJumpInput.value, 10) - 1;
      if (!isNaN(idx) && idx >= 0 && window.ttsEngine) {
        window.ttsEngine.currentIndex = idx;
        window.forceSyncMainCard(idx);
      }
    });
  }

  // ── 라디오 휠 스핀 ──
  const btnSpinPrev = $('btnSpinPrev');
  const btnSpinNext = $('btnSpinNext');
  if (btnSpinPrev) {
    btnSpinPrev.addEventListener('click', () => {
      if (!window.ttsEngine || !window.ttsEngine.playlist.length) return;
      const idx = Math.max(0, (window.ttsEngine.currentIndex || 0) - 1);
      window.ttsEngine.currentIndex = idx;
      window.forceSyncMainCard(idx);
    });
  }
  if (btnSpinNext) {
    btnSpinNext.addEventListener('click', () => {
      if (!window.ttsEngine || !window.ttsEngine.playlist.length) return;
      const idx = Math.min(window.ttsEngine.playlist.length - 1, (window.ttsEngine.currentIndex || 0) + 1);
      window.ttsEngine.currentIndex = idx;
      window.forceSyncMainCard(idx);
    });
  }

  // ── 라디오 휠 모달 ──
  const radioWheelModal   = $('radioWheelModal');
  const btnOpenRadioWheel = $('btnOpenRadioWheel');
  const btnCloseRadioModal = $('btnCloseRadioModal');
  const modalJumpInput    = $('modalJumpInput');
  const modalWheelPrev    = $('modalWheelPrev');
  const modalWheelNext    = $('modalWheelNext');
  const btnConfirmRadioJump = $('btnConfirmRadioJump');

  if (btnOpenRadioWheel && radioWheelModal) {
    btnOpenRadioWheel.addEventListener('click', () => {
      radioWheelModal.classList.add('active');
      if (modalJumpInput && window.ttsEngine) modalJumpInput.value = (window.ttsEngine.currentIndex || 0) + 1;
    });
  }
  if (btnCloseRadioModal && radioWheelModal) {
    btnCloseRadioModal.addEventListener('click', () => radioWheelModal.classList.remove('active'));
  }
  if (btnConfirmRadioJump && radioWheelModal && modalJumpInput) {
    btnConfirmRadioJump.addEventListener('click', () => {
      const idx = parseInt(modalJumpInput.value, 10) - 1;
      if (!isNaN(idx) && idx >= 0) window.forceSyncMainCard(idx);
      radioWheelModal.classList.remove('active');
    });
  }
  if (modalWheelPrev && modalJumpInput) {
    modalWheelPrev.addEventListener('click', () => {
      modalJumpInput.value = Math.max(1, parseInt(modalJumpInput.value, 10) - 1);
    });
  }
  if (modalWheelNext && modalJumpInput) {
    modalWheelNext.addEventListener('click', () => {
      modalJumpInput.value = parseInt(modalJumpInput.value, 10) + 1;
    });
  }

  // ── 24시간 라디오 버튼 ──
  const btnToggleRadioMode = $('btnToggleRadioMode');
  if (btnToggleRadioMode) {
    btnToggleRadioMode.addEventListener('click', () => {
      isRadioMode = !isRadioMode;
      if (isRadioMode) {
        btnToggleRadioMode.style.background = 'linear-gradient(135deg,#10b981,#6366f1)';
const viz = $('visualizer'); if (viz) viz.classList.add('playing');
        }
      } else {
        btnToggleRadioMode.style.background = 'linear-gradient(135deg,#6366f1,#10b981)';
        btnToggleRadioMode.innerHTML = '<i class="fa-solid fa-tower-broadcast"></i> 📻 24시간 라디오 & 화면꺼짐 무제한 연속 재생 (ON)';
        if (window.ttsEngine) window.ttsEngine.pause();
        if (btnPlayPause) btnPlayPause.innerHTML = '<i class="fa-solid fa-play"></i>';
        const viz = $('visualizer'); if (viz) viz.classList.remove('playing');
      }
    });
  }

  // ── 프리셋 ──
  function applyPreset(preset) {
    if (!window.ttsEngine) return;
    const wasP = window.ttsEngine.isPlaying;
    window.ttsEngine.pause();
    if (preset === 'speed')     { window.ttsEngine.targetRepeatCount = 1; window.ttsEngine.explanationRepeatCount = 0; window.ttsEngine.delayNextCard = 200; window.ttsEngine.rate = 1.5; }
    if (preset === 'shadow')    { window.ttsEngine.targetRepeatCount = 3; window.ttsEngine.explanationRepeatCount = 1; window.ttsEngine.delayNextCard = 500; window.ttsEngine.rate = 0.9; }
    if (preset === 'sleep')     { window.ttsEngine.targetRepeatCount = 2; window.ttsEngine.explanationRepeatCount = 1; window.ttsEngine.delayNextCard = 2000; window.ttsEngine.rate = 0.8; }
    if (preset === 'dictation') { window.ttsEngine.targetRepeatCount = 3; window.ttsEngine.explanationRepeatCount = 0; window.ttsEngine.delayNextCard = 3000; window.ttsEngine.rate = 0.7; }
    if (wasP) window.ttsEngine.play();
  }
  const bPS = $('btnPresetSpeed');     if (bPS) bPS.addEventListener('click', () => applyPreset('speed'));
  const bPSh = $('btnPresetShadowing');if (bPSh) bPSh.addEventListener('click', () => applyPreset('shadow'));
  const bPSl = $('btnPresetSleep');    if (bPSl) bPSl.addEventListener('click', () => applyPreset('sleep'));
  const bPD = $('btnPresetDictation');  if (bPD) bPD.addEventListener('click', () => applyPreset('dictation'));

  // ── 내 설정 저장 & 복원 ──
  function saveAudioSettings(showToast = false) {
    const tRep = $('targetRepeatSelect')?.value;
    const tGap = $('targetIntraGapSelect')?.value;
    const eRep = $('explanationRepeatSelect')?.value;
    const eGap = $('targetToExpGapSelect')?.value;
    const nGap = $('delayNextCardSelect')?.value;
    const spd  = $('speedSelect')?.value;
    const rSys = $('tab1RepeatSystemSelect')?.value;

    if (window.ttsEngine) {
      if (tRep) window.ttsEngine.targetRepeatCount      = parseInt(tRep);
      if (tGap) window.ttsEngine.targetIntraGap         = parseInt(tGap);
      if (eRep) window.ttsEngine.explanationRepeatCount  = parseInt(eRep);
      if (eGap) window.ttsEngine.targetToExpGap         = parseInt(eGap);
      if (nGap) window.ttsEngine.delayNextCard           = parseInt(nGap);
      if (spd)  window.ttsEngine.rate                    = parseFloat(spd);
      if (rSys) window.ttsEngine.repeatSystemMode        = rSys;
    }

    if (tRep) localStorage.setItem('h_tRep', tRep);
    if (tGap) localStorage.setItem('h_tGap', tGap);
    if (eRep) localStorage.setItem('h_eRep', eRep);
    if (eGap) localStorage.setItem('h_eGap', eGap);
    if (nGap) localStorage.setItem('h_nGap', nGap);
    if (spd)  localStorage.setItem('h_spd',  spd);
    if (rSys) localStorage.setItem('h_rSys', rSys);

    if (showToast) alert('✅ 사용자 커스텀 설정이 저장되었습니다!');
  }

  function restoreAudioSettings() {
    const tRep = localStorage.getItem('h_tRep');
    const tGap = localStorage.getItem('h_tGap');
    const eRep = localStorage.getItem('h_eRep');
    const eGap = localStorage.getItem('h_eGap');
    const nGap = localStorage.getItem('h_nGap');
    const spd  = localStorage.getItem('h_spd');
    const rSys = localStorage.getItem('h_rSys');

    if (window.ttsEngine) {
      if (tRep) window.ttsEngine.targetRepeatCount      = parseInt(tRep);
      if (tGap) window.ttsEngine.targetIntraGap         = parseInt(tGap);
      if (eRep) window.ttsEngine.explanationRepeatCount  = parseInt(eRep);
      if (eGap) window.ttsEngine.targetToExpGap         = parseInt(eGap);
      if (nGap) window.ttsEngine.delayNextCard           = parseInt(nGap);
      if (spd)  window.ttsEngine.rate                    = parseFloat(spd);
      if (rSys) window.ttsEngine.repeatSystemMode        = rSys;
    }

    if (tRep && $('targetRepeatSelect'))      $('targetRepeatSelect').value      = tRep;
    if (tGap && $('targetIntraGapSelect'))   $('targetIntraGapSelect').value    = tGap;
    if (eRep && $('explanationRepeatSelect')) $('explanationRepeatSelect').value  = eRep;
    if (eGap && $('targetToExpGapSelect'))   $('targetToExpGapSelect').value    = eGap;
    if (nGap && $('delayNextCardSelect'))     $('delayNextCardSelect').value     = nGap;
    if (spd  && $('speedSelect'))            $('speedSelect').value             = spd;
    if (rSys && $('tab1RepeatSystemSelect')) $('tab1RepeatSystemSelect').value  = rSys;
  }
  restoreAudioSettings();

  const btnSaveCP = $('btnSaveCustomPreset');
  if (btnSaveCP) btnSaveCP.addEventListener('click', () => saveAudioSettings(true));

  // 실시간 변경 리스너 (설정 드롭다운 변경 즉시 ttsEngine 반영)
  ['targetRepeatSelect', 'targetIntraGapSelect', 'explanationRepeatSelect', 'targetToExpGapSelect', 'delayNextCardSelect', 'speedSelect', 'tab1RepeatSystemSelect'].forEach(id => {
    const el = $(id);
    if (el) {
      el.addEventListener('change', () => {
        saveAudioSettings(false);
      });
    }
  });

  // ── 10초 테스트 광고 ──
  const btnTestAd = $('btnTestAd10s');
  const testAdTxt = $('testAdCountdownText');
  if (btnTestAd) {
    btnTestAd.addEventListener('click', () => {
      let n = 10;
      if (testAdTxt) { testAdTxt.style.display = 'inline'; testAdTxt.textContent = `${n}초 남음`; }
      const t = setInterval(() => {
        n--;
        if (testAdTxt) testAdTxt.textContent = `${n}초 남음`;
        if (n <= 0) {
          clearInterval(t);
          if (testAdTxt) testAdTxt.style.display = 'none';
          if (window.adMobEngine) {
            window.adMobEngine.triggerRadioCmAd(true);
          } else if (window.ttsEngine) {
            window.ttsEngine.speakText('광고 시간입니다! HearEng 무료 광고 버전을 이용해주셔서 감사합니다.', 'ko-KR');
          }
        }
      }, 1000);
    });
  }

  // ── 반복 시스템 모달 ──
  const repeatSystemModal = $('repeatSystemModal');
  function openRepeatModal() { if (repeatSystemModal) repeatSystemModal.classList.add('active'); }
  const bOR = $('btnOpenRepeatSystem');       if (bOR) bOR.addEventListener('click', openRepeatModal);
  const bORI = $('btnOpenRepeatModalInline'); if (bORI) bORI.addEventListener('click', openRepeatModal);
  const btnSaveRepeat = $('btnSaveRepeatSystem');
  if (btnSaveRepeat) {
    btnSaveRepeat.addEventListener('click', () => {
      const mode = document.querySelector('input[name="repeatSystemMode"]:checked')?.value || 'current_level';
      localStorage.setItem('heareng_repeat_mode', mode);
      if (repeatSystemModal) repeatSystemModal.classList.remove('active');
      alert('✅ 반복 시스템이 적용되었습니다!');
    });
  }

  // ── 응원 광고 ──
  const btnExtraAd = $('btnWatchExtraAdBanner');
  if (btnExtraAd) {
    btnExtraAd.addEventListener('click', () => {
      if (window.adMobEngine && typeof window.adMobEngine.triggerInterstitialAd === 'function') {
        window.adMobEngine.triggerInterstitialAd();
      } else {
        alert('💖 응원해 주셔서 감사합니다! 광고 수익이 HearEng 개발에 큰 힘이 됩니다 😊');
      }
    });
  }

  // =========================================================================
  // 9. 분류 이벤트 바인딩
  // =========================================================================
  const mainCatSelect = $('mainCategorySelect');
  const subLvlSelect  = $('subLevelSelect');
  const contentTypeSeg = $('contentTypeSegment');

  if (mainCatSelect) {
    mainCatSelect.addEventListener('change', e => {
      renderSubLevels(e.target.value);
      const sub = $('subLevelSelect');
      if (sub && sub.value) window.loadDatasetByLevelKey(sub.value);
    });
  }
  if (subLvlSelect) {
    subLvlSelect.addEventListener('change', e => window.loadDatasetByLevelKey(e.target.value));
  }
  if (contentTypeSeg) {
    contentTypeSeg.querySelectorAll('.segment-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        contentTypeSeg.querySelectorAll('.segment-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentType = btn.getAttribute('data-type') || 'words';
        const sub = $('subLevelSelect');
        if (sub && sub.value) window.loadDatasetByLevelKey(sub.value);
      });
    });
  }

  const btnDelCustom = $('btnDeleteCurrentCustomFile');
  if (btnDelCustom) {
    btnDelCustom.addEventListener('click', () => {
      const sub = $('subLevelSelect');
      if (sub && sub.value) window.deleteCustomVocabById(sub.value);
    });
  }

  // =========================================================================
  // 10. 커스텀 단어장 업로드 (Tab 2)
  // =========================================================================
  const CUSTOM_KEY = 'user_custom_files';

  function parseCustomText(rawText, modeType) {
    if (!rawText || !rawText.trim()) return [];
    if (modeType === 'novel') {
      if (window.ttsEngine && typeof window.ttsEngine.parseNovelToChunks === 'function') {
        return window.ttsEngine.parseNovelToChunks(rawText);
      }
    }
    const lines = rawText.split(/\r?\n/);
    const result = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      if (i === 0 && (line.includes('단어/문장') || line.includes('한글해석'))) continue;
      let target = '', translation = '', phonetic = '';
      const mPh = line.match(/[\[\(]([^\]\)]+)[\]\)]/);
      if (mPh) phonetic = `[${mPh[1].trim()}]`;
      let clean = line.replace(/\[[^\]]+\]|\([^\)]+\)/g, '').trim();
      const mKo = clean.match(/[\uac00-\ud7a3]+.*$/);
      if (mKo) {
        translation = mKo[0].replace(/[\[\]()+=]/g, '').trim();
        target = clean.substring(0, clean.indexOf(mKo[0])).replace(/[,\t:\-]/g, '').trim();
      } else if (clean.includes('\t')) {
        [target, translation] = clean.split('\t').map(p => p.trim());
      } else if (clean.includes(',')) {
        [target, translation] = clean.split(',').map(p => p.trim());
      } else {
        target = translation = clean;
      }
      if (!target && translation) target = translation;
      if (!translation && target) translation = target;
      if (!phonetic && target) phonetic = `[${target}]`;
      if (target) result.push({ target, translation, phonetic });
    }
    return result;
  }

  window.renderUserCustomFilesList = function() {
    const container = $('userCustomFilesList');
    const badge = $('userCustomFilesCount');
    if (!container) return;
    const lists = JSON.parse(localStorage.getItem(CUSTOM_KEY) || '[]');
    if (badge) badge.textContent = `총 ${lists.length}개 파일`;
    if (lists.length === 0) {
      container.innerHTML = '<div style="font-size:11px;color:var(--text-muted);text-align:center;padding:14px;">저장된 나만의 단어장이 없습니다.</div>';
      return;
    }
    container.innerHTML = lists.map(it => {
      const typeLabel = { words:'📚 단어', idioms:'🥞 숙어', sentences:'💬 문장', novel:'📖 소설' }[it.type] || '📚 단어';
      return `<div style="background:rgba(255,255,255,0.04);border:1px solid var(--border-glass);border-radius:10px;padding:10px 12px;display:flex;align-items:center;justify-content:space-between;gap:8px;">
        <div style="flex:1;min-width:0;">
          <div style="font-size:12px;font-weight:800;color:var(--text-main);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${it.title || it.name}</div>
          <div style="font-size:10px;color:var(--text-muted);">${typeLabel} · ${it.count || (it.items ? it.items.length : 0)}개 · ${it.createdAt || ''}</div>
        </div>
        <div style="display:flex;gap:6px;flex-shrink:0;">
          <button onclick="window.playCustomVocabById('${it.id}')" style="background:linear-gradient(135deg,#10b981,#059669);color:#fff;border:none;border-radius:6px;padding:6px 10px;font-size:11px;font-weight:800;cursor:pointer;">▶️ 선택 재생</button>
          <button onclick="window.deleteCustomVocabById('${it.id}')" style="background:rgba(239,68,68,0.15);color:#ef4444;border:1px solid rgba(239,68,68,0.3);border-radius:6px;padding:6px 10px;font-size:11px;font-weight:700;cursor:pointer;">🗑️ 삭제</button>
        </div>
      </div>`;
    }).join('');
  };

  window.playCustomVocabById = function(id) {
    const lists = JSON.parse(localStorage.getItem(CUSTOM_KEY) || '[]');
    const item = lists.find(x => x.id === id);
    if (!item || !item.items) return;
    const t1 = document.querySelector('.nav-tabs .tab-btn[data-tab="tabVocab"]');
    if (t1) t1.click();
    const mc = $('mainCategorySelect');
    if (mc) mc.value = 'user_custom';
    renderSubLevels('user_custom', item.id);
    window.loadDatasetByLevelKey(item.id);
  };

  window.deleteCustomVocabById = function(id) {
    if (!confirm('🗑️ 이 단어장을 보관함에서 삭제하시겠습니까?')) return;
    let lists = JSON.parse(localStorage.getItem(CUSTOM_KEY) || '[]');
    lists = lists.filter(x => x.id !== id);
    localStorage.setItem(CUSTOM_KEY, JSON.stringify(lists));
    window.renderUserCustomFilesList();
    const mc = $('mainCategorySelect');
    if (mc && mc.value === 'user_custom') {
      renderSubLevels('user_custom');
      const sub = $('subLevelSelect');
      if (sub && sub.value) window.loadDatasetByLevelKey(sub.value);
    }
  };

  // 커스텀 텍스트 미리보기
  const customTextInput     = $('customTextInput');
  const customVocabTitleInput = $('customVocabTitleInput');
  const btnLoadCustomText   = $('btnLoadCustomText');

  function updateLivePreview() {
    const container2 = $('livePreviewContainer');
    const badge2     = $('previewCountBadge');
    const table2     = $('previewTableContent');
    const selType    = document.querySelector('input[name="customVocabType"]:checked')?.value || 'words';
    if (!customTextInput || !container2) return;
    const parsed2 = parseCustomText(customTextInput.value || '', selType);
    if (parsed2.length > 0) {
      container2.style.display = 'block';
      if (badge2) badge2.textContent = `총 ${parsed2.length}개 항목`;
      if (table2) {
        table2.innerHTML = parsed2.slice(0, 4).map((it, i) =>
          `<div style="display:flex;gap:8px;background:rgba(255,255,255,0.05);padding:4px 8px;border-radius:6px;align-items:center;">
             <span style="color:var(--primary);font-weight:bold;width:20px;">#${i+1}</span>
             <span style="font-weight:700;color:var(--text-main);flex:1;">${it.target}</span>
             <span style="color:var(--text-muted);flex:1;">${it.translation}</span>
             <span style="color:#10b981;font-size:10px;">${it.phonetic}</span>
           </div>`).join('') + (parsed2.length > 4 ? `<div style="font-size:10px;color:var(--text-muted);text-align:center;margin-top:2px;">...외 ${parsed2.length-4}개 항목 더 있음</div>` : '');
      }
    } else {
      container2.style.display = 'none';
    }
  }

  if (customTextInput) {
    customTextInput.addEventListener('input', updateLivePreview);
    customTextInput.addEventListener('paste', () => setTimeout(updateLivePreview, 100));
  }
  document.querySelectorAll('input[name="customVocabType"]').forEach(r => r.addEventListener('change', updateLivePreview));

  if (btnLoadCustomText && customTextInput) {
    btnLoadCustomText.addEventListener('click', () => {
      const selType2 = document.querySelector('input[name="customVocabType"]:checked')?.value || 'words';
      const parsed3  = parseCustomText(customTextInput.value || '', selType2);
      if (parsed3.length === 0) { alert('⚠️ 단어를 찾을 수 없습니다.'); return; }
      const title = (customVocabTitleInput && customVocabTitleInput.value.trim())
        ? customVocabTitleInput.value.trim()
        : `나만의 단어장 (${new Date().toLocaleDateString()})`;
      let lists2 = JSON.parse(localStorage.getItem(CUSTOM_KEY) || '[]');
      lists2.unshift({ id: 'custom_' + Date.now(), title, name: title, type: selType2, items: parsed3, count: parsed3.length, createdAt: new Date().toLocaleDateString() });
      localStorage.setItem(CUSTOM_KEY, JSON.stringify(lists2));
      window.renderUserCustomFilesList();
      customTextInput.value = '';
      if (customVocabTitleInput) customVocabTitleInput.value = '';
      const lp = $('livePreviewContainer'); if (lp) lp.style.display = 'none';
      alert(`✅ [${title}] 단어장 (총 ${parsed3.length}개 항목)이 저장되었습니다!`);
    });
  }

  // 가이드 모달
  const guideModal = $('guideModalPopup');
  const btnOG = $('btnOpenGuideModal'); if (btnOG && guideModal) btnOG.addEventListener('click', () => guideModal.style.display = 'flex');
  const btnCG = $('btnCloseGuideModal'); if (btnCG && guideModal) btnCG.addEventListener('click', () => guideModal.style.display = 'none');
  if (guideModal) guideModal.addEventListener('click', e => { if (e.target === guideModal) guideModal.style.display = 'none'; });

  // =========================================================================
  // 11. 시작 시퀀스
  // =========================================================================
  renderSubLevels('exam');
  const initialSub = $('subLevelSelect');
  if (initialSub && initialSub.value) {
    window.loadDatasetByLevelKey(initialSub.value);
  }
  window.renderUserCustomFilesList();

  console.log('✅ HearEng v2.15 initialized. Playlist:', window.ttsEngine ? window.ttsEngine.playlist.length : 'NO ENGINE', 'items');
}

// ── 초기화 트리거 ──
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initVocalizeApp();
} else {
  document.addEventListener('DOMContentLoaded', initVocalizeApp);
}
