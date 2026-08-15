/* ==========================================================================

   VOCALIZE MASTER PIPELINE LOADER

   Synthesizes all modular datasets (15K Master, Kids, Exam, Idioms, Situations, Pop Media, Tech, JLPT/Korean)

   ========================================================================== */



function getSafeVocabObj(varName) {

  return (typeof window !== 'undefined' && window[varName]) ? window[varName] : {};

}



window.VOCABULARY_DATA = {

  // Edition 1: 🇰🇷 한국인용 -> 🇺🇸 영어 공부 (모든 데이터셋 100% 동적 통합)

  'EN_KO': {

    name: '🇰🇷 한국인용 🇺🇸 영어 자동 암기',

    get levels() {

      return Object.assign({},

        window.VOCAB_MASTER_15K || {},

        window.VOCAB_KIDS || {},

        window.VOCAB_ELEMENTARY_ESSENTIAL || {},

        window.VOCAB_MIDDLE_1800 || {},

        window.VOCAB_MIDDLE_400_IDIOMS || {},

        window.VOCAB_ESSENTIAL_5000 || {},

        window.VOCAB_HIGH_3000 || {},

        window.VOCAB_HIGH_600_IDIOMS || {},

        window.VOCAB_HIGH_500_IDIOMS || {},

        window.VOCAB_REAL_LIFE_200 || {},

        window.VOCAB_NATIVE_500 || {},

        window.VOCAB_PRACTICAL_1000 || {},

        window.VOCAB_SITUATIONS_MASTER || {},

        window.VOCAB_BIZ_NOUNS_500 || {},

        window.VOCAB_BIZ_WORKPLACE_500 || {},

        window.VOCAB_SITUATIONS_12K || {},

        window.VOCAB_TV_SLANG_500 || {},

        window.VOCAB_TV_SLANG_1000 || {},

        window.VOCAB_MOVIE_QUOTES_1000 || {},

        window.VOCAB_SITCOM_COMEDY_1000 || {},

        window.VOCAB_CRIME_MEDICAL_1000 || {},

        window.VOCAB_SCIFI_ACTION_1000 || {},

        window.VOCAB_EXAM || {},

        window.VOCAB_IDIOMS || {},

        window.VOCAB_SITUATIONS || {},

        window.VOCAB_POP_MEDIA || {},

        window.VOCAB_TECH_BUSINESS || {},

        window.VOCAB_JLPT_KOREAN || {}

      );

    }

  },



  // Edition 2: 🇰🇷 한국인용 -> 🇯🇵 일본어 공부

  'JA_KO': {

    name: '🇰🇷 한국인용 🇯🇵 일본어 자동 암기',

    levels: Object.assign({}, getSafeVocabObj('VOCAB_JLPT_KOREAN'))

  },



  // Edition 3: 🇯🇵 일본인용 -> 🇺🇸 영어 공부

  'EN_JA': {

    name: '🇯🇵 日本人向け 🇺🇸 英語単語 自動暗記',

    levels: Object.assign({},

      getSafeVocabObj('VOCAB_MASTER_15K'),

      getSafeVocabObj('VOCAB_KIDS'),

      getSafeVocabObj('VOCAB_EXAM'),

      getSafeVocabObj('VOCAB_POP_MEDIA')

    )

  },



  // Edition 4: 🇯🇵 일본인용 -> 🇰🇷 한국어 공부

  'KO_JA': {

    name: '🇯🇵 日本人向け 🇰🇷 韓国語 単語・会話',

    levels: Object.assign({}, getSafeVocabObj('VOCAB_JLPT_KOREAN'))

  },



  // Edition 5: 🇺🇸 영어권 -> 🇰🇷 한국어 공부

  'KO_EN': {

    name: '🇺🇸 Global 🇰🇷 Learn Korean Audio',

    levels: Object.assign({}, getSafeVocabObj('VOCAB_JLPT_KOREAN'))

  },



  // Edition 6: 🇺🇸 영어권 -> 🇯🇵 일본어 공부

  'JA_EN': {

    name: '🇺🇸 Global 🇯🇵 Learn Japanese Audio',

    levels: Object.assign({}, getSafeVocabObj('VOCAB_JLPT_KOREAN'))

  }

};

