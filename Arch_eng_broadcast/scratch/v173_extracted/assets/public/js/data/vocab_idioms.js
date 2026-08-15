/* ==========================================================================
   VOCALIZE DATA MODULE - Idioms & Phrasal Verbs
   100% Genuine Real-World Words, Idioms, & Sentences
   NO dummy tags (#1, #2), NO cyclic loops
   ========================================================================== */

const VOCAB_IDIOMS = window.VOCAB_IDIOMS =  {
  idioms_elem: {
    label: '📌 초등 기초 숙어',
    words: [
      { target: "Look at", translation: "~를 바라보다", phonetic: "[룩 애트]" },
      { target: "Wake up", translation: "일어나다", phonetic: "[웨이크 업]" },
      { target: "Get up", translation: "잠자리에서 일어나다", phonetic: "[겟 업]" },
      { target: "Sit down", translation: "앉다", phonetic: "[싯 다운]" },
      { target: "Stand up", translation: "일어서다", phonetic: "[스탠드 업]" },
      { target: "Turn on", translation: "전등이나 기기를 켜다", phonetic: "[턴 온]" },
      { target: "Turn off", translation: "전등이나 기기를 끄다", phonetic: "[턴 오프]" }
    ],
    idioms: [
      { target: "Listen to", translation: "~를 듣다", phonetic: "[리슨 투]" },
      { target: "Good at", translation: "~를 잘하다", phonetic: "[굿 애트]" },
      { target: "Talk to", translation: "~와 이야기하다", phonetic: "[톡 투]" }
    ],
    sentences: [
      { target: "Please look at the blackboard when the teacher is speaking.", translation: "선생님이 말씀하실 때 칠판을 보세요." },
      { target: "I wake up at seven o\'clock every morning.", translation: "나는 매일 아침 7시에 일어납니다." }
    ]
  },

  idioms_mid: {
    label: '📌 중등 시험 숙어',
    words: [
      { target: "Look forward to", translation: "~를 간절히 기대하다", phonetic: "[룩 포워드 투]" },
      { target: "Break down", translation: "고장 나다", phonetic: "[브레이크 다운]" },
      { target: "Take place", translation: "개최되다 또는 발생하다", phonetic: "[테이크 플레이스]" },
      { target: "Give up", translation: "포기하다", phonetic: "[기브 업]" },
      { target: "Find out", translation: "알아내다", phonetic: "[파인드 아웃]" }
    ],
    idioms: [
      { target: "Put off", translation: "미루다 또는 연기하다", phonetic: "[풋 오프]" },
      { target: "Keep up with", translation: "~를 따라잡다", phonetic: "[킵 업 위드]" }
    ],
    sentences: [
      { target: "Never put off until tomorrow what you can do today.", translation: "오늘 할 수 있는 일을 내일로 미루지 마세요." },
      { target: "We are looking forward to meeting your family next week.", translation: "우리는 다음 주에 당신의 가족을 만나기를 기대하고 있습니다." }
    ]
  },

  idioms_high: {
    label: '📌 고등/TOEIC 숙어',
    words: [
      { target: "Bring about", translation: "초래하다 또는 야기하다", phonetic: "[브링 어바웃]" },
      { target: "On behalf of", translation: "~를 대표하여", phonetic: "[온 비해프 오브]" },
      { target: "Carry out", translation: "수행하다", phonetic: "[캐리 아웃]" },
      { target: "Result in", translation: "결과적으로 ~을 초래하다", phonetic: "[리절트 인]" },
      { target: "Take into account", translation: "~를 고려하다", phonetic: "[테이크 인투 어카운트]" }
    ],
    idioms: [
      { target: "In terms of", translation: "~의 측면에서", phonetic: "[인 텀즈 오브]" },
      { target: "By virtue of", translation: "~ 덕분에 또는 ~에 의해", phonetic: "[바이 버츄 오브]" }
    ],
    sentences: [
      { target: "The research team was able to carry out the complex experiment successfully.", translation: "연구팀은 복잡한 실험을 성공적으로 수행할 수 있었습니다." },
      { target: "I am delivering this speech on behalf of our entire department.", translation: "저는 저희 부서 전체를 대표하여 이 연설을 하고 있습니다." }
    ]
  },

  idioms_daily: {
    label: '📌 비즈니스/일상 관용구',
    words: [
      { target: "Call it a day", translation: "오늘 일을 마무리하다", phonetic: "[콜잇 어 데이]" },
      { target: "Hit the nail on the head", translation: "정곡을 찌르다", phonetic: "[힛 더 네일 온 더 헤드]" },
      { target: "Piece of cake", translation: "식은 죽 먹기", phonetic: "[피스 오브 케이크]" },
      { target: "Break the ice", translation: "어색한 분위기를 누그러뜨리다", phonetic: "[브레이크 디 아이스]" },
      { target: "Under the weather", translation: "몸 컨디션이 안 좋은", phonetic: "[언더 더 웨더]" }
    ],
    idioms: [
      { target: "Bite the bullet", translation: "이를 악물고 참다", phonetic: "[바이트 더 불릿]" },
      { target: "Burn the midnight oil", translation: "밤새워 공부하다 또는 일하다", phonetic: "[번 더 미드나이트 오일]" }
    ],
    sentences: [
      { target: "It is getting late, so let us call it a day and go home.", translation: "늦었으니 오늘 일을 여기서 마무리하고 집으로 갑시다." },
      { target: "Her suggestion really hit the nail on the head regarding our budget issue.", translation: "그녀의 제안은 우리 예산 문제와 관련하여 정말 정곡을 찔렀습니다." }
    ]
  }
};
