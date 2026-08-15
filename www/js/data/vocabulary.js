/* ==========================================================================

   VOCALIZE - Curated Vocabulary Database Export

   ========================================================================== */

function getSafeVocabObj(varName) {

  return (typeof window !== 'undefined' && window[varName]) ? window[varName] : {};

}



function buildFullVocabularyData() {

  return {

    'EN_KO': {

      name: '🇰🇷 한국인용 🇺🇸 영어 자동 암기',

      levels: Object.assign({},

        getSafeVocabObj('VOCAB_MASTER_15K'),

        getSafeVocabObj('VOCAB_KIDS'),

        getSafeVocabObj('VOCAB_ELEMENTARY_ESSENTIAL'),

        getSafeVocabObj('VOCAB_MIDDLE_1800'),

        getSafeVocabObj('VOCAB_MIDDLE_400_IDIOMS'),

        getSafeVocabObj('VOCAB_ESSENTIAL_5000'),

        getSafeVocabObj('VOCAB_HIGH_3000'),

        getSafeVocabObj('VOCAB_HIGH_600_IDIOMS'),

        getSafeVocabObj('VOCAB_HIGH_500_IDIOMS'),

        getSafeVocabObj('VOCAB_REAL_LIFE_200'),

        getSafeVocabObj('VOCAB_NATIVE_500'),

        getSafeVocabObj('VOCAB_PRACTICAL_1000'),

        getSafeVocabObj('VOCAB_SITUATIONS_MASTER'),

        getSafeVocabObj('VOCAB_BIZ_NOUNS_500'),

        getSafeVocabObj('VOCAB_BIZ_WORKPLACE_500'),

        getSafeVocabObj('VOCAB_SITUATIONS_12K'),

        getSafeVocabObj('VOCAB_TV_SLANG_500'),

        getSafeVocabObj('VOCAB_TV_SLANG_1000'),

        getSafeVocabObj('VOCAB_MOVIE_QUOTES_1000'),

        getSafeVocabObj('VOCAB_SITCOM_COMEDY_1000'),

        getSafeVocabObj('VOCAB_CRIME_MEDICAL_1000'),

        getSafeVocabObj('VOCAB_SCIFI_ACTION_1000'),

        getSafeVocabObj('VOCAB_EXAM'),

        getSafeVocabObj('VOCAB_IDIOMS'),

        getSafeVocabObj('VOCAB_SITUATIONS'),

        getSafeVocabObj('VOCAB_POP_MEDIA'),

        getSafeVocabObj('VOCAB_TECH_BUSINESS'),

        getSafeVocabObj('VOCAB_JLPT_KOREAN')

      )

    }

  };

}



if (typeof window !== 'undefined') {

  if (!window.VOCABULARY_DATA || !window.VOCABULARY_DATA['EN_KO'] || Object.keys(window.VOCABULARY_DATA['EN_KO'].levels).length < 10) {

    window.VOCABULARY_DATA = buildFullVocabularyData();

  }

}



  // Refresh Custom Sub-Categories in Tab 1 Dropdown
  window.refreshCustomSubCategories = function() {
    const subSelect = document.getElementById('subCategorySelect');
    const mainSelect = document.getElementById('mainCategorySelect');
    if (!subSelect || !mainSelect) return;

    if (mainSelect.value === 'user_custom') {
      const CUSTOM_STORAGE_KEY = 'user_custom_files';
      let customLists = JSON.parse(localStorage.getItem(CUSTOM_STORAGE_KEY) || '[]');

      subSelect.innerHTML = '';
      if (customLists.length === 0) {
        const opt = document.createElement('option');
        opt.value = '';
        opt.textContent = '저장된 커스텀 단어장이 없습니다';
        subSelect.appendChild(opt);
      } else {
        customLists.forEach(item => {
          const opt = document.createElement('option');
          opt.value = item.id;
          opt.textContent = `${item.title || item.name} (${item.count || (item.items ? item.items.length : 0)}개)`;
          subSelect.appendChild(opt);
        });
      }
    }
  };
