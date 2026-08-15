/* ==========================================================================
   VOCALIZE DATA MODULE - JLPT N5~N1 & Learn Korean for Foreigners
   ========================================================================== */

const VOCAB_JLPT_KOREAN = window.VOCAB_JLPT_KOREAN =  {
  jlpt_n5_n1: {
    label: '🇯🇵 JLPT N5~N1 단계별 어휘 (일본어)',
    words: [
      { target: "わたし (Watashi)", translation: "나 / 저 (N5)" },
      { target: "べんきょう (Benkyou)", translation: "공부 (N5)" },
      { target: "約束 (Yakusoku)", translation: "약속 (N4)" },
      { target: "経済 (Keizai)", translation: "경제 (N3)" },
      { target: "環境 (Kankyou)", translation: "환경 (N2)" },
      { target: " 矛盾 (Mujun)", translation: "모순 (N1)" }
    ],
    idioms: [
      { target: "一生懸命 (Isshoukenmei)", translation: "열심히 / 필사적으로" }
    ],
    sentences: [
      { target: "日本語の勉強はとても楽しいです。", translation: "일본어 공부는 매우 즐겁습니다." },
      { target: "継続は力なり。(Keizoku wa chikara nari)", translation: "계속함이 곧 힘이다." }
    ]
  },

  korean_foreigners: {
    label: '🇰🇷 외국인을 위한 K-한국어 기초',
    words: [
      { target: "안녕하세요 (Annyeong-haseyo)", translation: "Hello / Hi" },
      { target: "감사합니다 (Kamsa-hamnida)", translation: "Thank you" },
      { target: "맛있어요 (Mas-iss-eoyo)", translation: "It is delicious", phonetic: '' },
      { target: "얼마예요? (Eolmayeyo?)", translation: "How much is it?" }
    ],
    idioms: [
      { target: "잘 부탁드립니다", translation: "Nice to meet you / Please treat me well" }
    ],
    sentences: [
      { target: "한국 문화를 좋아해서 공부해요.", translation: "I study Korean because I like Korean culture." },
      { target: "어디로 가면 돼요?", translation: "Where should I go?" }
    ]
  }
};
