/* ==========================================================================
   VOCALIZE DATA MODULE - Pop Culture, Slang, Movies & Netflix Drama
   100% Real-World Genuine Native Slang & Spoken Expressions
   NO dummy tags (#1, #2), NO cyclic loops
   ========================================================================== */

const VOCAB_POP_MEDIA = window.VOCAB_POP_MEDIA =  {
  tv_slang: {
    label: '🍿 미드 & 영화 단골 슬랭',
    words: [
      { target: 'Spill the tea', translation: '소문이나 비밀을 털어놓다', phonetic: '[스필 더 티]' },
      { target: 'Ghost someone', translation: '갑자기 연락을 끊고 잠수 타다', phonetic: '[고스트 섬원]' },
      { target: 'Flex', translation: '자랑하다 또는 재력을 과시하다', phonetic: '[플렉스]' },
      { target: 'Hit me up', translation: '나한테 연락해', phonetic: '[힛 미 업]' },
      { target: 'Out of the loop', translation: '소식이나 내용을 잘 모르는', phonetic: '[아웃 오브 더 루프]' },
      { target: 'No cap', translation: '거짓말 아니고 진짜야', phonetic: '[노 캡]' },
      { target: 'Salty', translation: '삐친 또는 꽁해 있는', phonetic: '[솔티]' },
      { target: 'Lowkey', translation: '은밀히 또는 은근히', phonetic: '[로우키]' },
      { target: 'Highkey', translation: '대놓고 또는 완전', phonetic: '[하이키]' },
      { target: 'GOAT', translation: '역대 최고 (Greatest Of All Time)', phonetic: '[고트]' },
      { target: 'Vibe check', translation: '분위기 파악 또는 기분 체크', phonetic: '[바이브 체크]' },
      { target: 'Slay', translation: '완전 찢었다 또는 대성공하다', phonetic: '[슬레이]' },
      { target: 'Rizz', translation: '이성을 사로잡는 매력', phonetic: '[리즈]' },
      { target: 'Bet', translation: '좋아 또는 수락해', phonetic: '[벳]' },
      { target: 'Period', translation: '이상 끝 또는 다른 말 필요 없음', phonetic: '[피리어드]' }
    ],
    idioms: [
      { target: 'Catch feelings', translation: '호감이 생기다 또는 좋아하게 되다', phonetic: '[캐치 필링스]' },
      { target: 'On fleek', translation: '완벽한 또는 아주 멋진', phonetic: '[온 플릭]' },
      { target: 'Hit the sack', translation: '잠자리에 들다', phonetic: '[힛 더 색]' },
      { target: 'Under the weather', translation: '몸 컨디션이 안 좋은', phonetic: '[언더 더 웨더]' },
      { target: 'Cut to the chase', translation: '본론으로 바로 들어가다', phonetic: '[컷 투 더 체이스]' }
    ],
    sentences: [
      { target: 'Come on, spill the tea! What happened on your date last night?', translation: '어서 비밀 좀 털어봐! 어젯밤 데이트에서 무슨 일 있었어?', phonetic: '' },
      { target: 'He totally ghosted me after our first meeting.', translation: '그 사람은 첫 만남 이후로 완전 잠수 탔어.', phonetic: '' },
      { target: 'I have a big presentation early tomorrow morning, so I am going to hit the sack.', translation: '내일 아침 일찍 중요한 발표가 있어서 난 이만 자러 갈게.', phonetic: '' },
      { target: 'No cap, this is the best movie I have ever watched in my life.', translation: '거짓말 아니고, 이거 내 인생 최고 영화야.', phonetic: '' },
      { target: 'Hit me up whenever you are free to hang out.', translation: '놀 시간 될 때 언제든 나한테 연락해.', phonetic: '' }
    ]
  },

  kpop_hallyu: {
    label: '🎵 K-Pop & 한류 문화 필수 용어',
    words: [
      { target: 'Bias', translation: '그룹 내 최애 멤버', phonetic: '[바이애스]' },
      { target: 'Title track', translation: '타이틀곡', phonetic: '[타이틀 트랙]' },
      { target: 'Comeback', translation: '새 앨범 컴백', phonetic: '[컴백]' },
      { target: 'Lightstick', translation: '응원봉', phonetic: '[라이트스틱]' }
    ],
    idioms: [
      { target: 'All-kill', translation: '음원 차트 올킬', phonetic: '[올킬]' }
    ],
    sentences: [
      { target: 'Who is your ultimate bias in this group?', translation: '이 그룹에서 너의 최애 멤버가 누구야?', phonetic: '' },
      { target: 'Their new title track achieved an instant all-kill on all music charts.', translation: '그들의 새 타이틀곡은 모든 음원 차트에서 즉시 올킬을 달성했습니다.', phonetic: '' }
    ]
  },

  anime_japan: {
    label: '⛩️ 애니메이션 & 일본 팝컬처 회화',
    words: [
      { target: 'やれやれ (Yare yare)', translation: '이런이런 또는 맙소사', phonetic: '[야레 야레]' },
      { target: 'すごい (Sugoi)', translation: '대단해 또는 엄청나', phonetic: '[스고이]' },
      { target: 'なるほど (Naruhodo)', translation: '과연 또는 그렇구나', phonetic: '[나루호도]' },
      { target: 'お疲れ様 (Otsukaresama)', translation: '수고하셨습니다', phonetic: '[오츠카레사마]' },
      { target: '大丈夫 (Daijoubu)', translation: '괜찮아 또는 문제없어', phonetic: '[다이죠-부]' }
    ],
    idioms: [
      { target: '任せて (Makasete)', translation: '나한테 맡겨', phonetic: '[마카세테]' }
    ],
    sentences: [
      { target: 'あきらめないで！最後まで頑張ろう！', translation: '포기하지 마! 끝까지 힘내자!', phonetic: '' },
      { target: '君なら絶対にできると信じてるよ！', translation: '너라면 틀림없이 해낼 수 있다고 믿고 있어!', phonetic: '' }
    ]
  }
};
