/* ==========================================================================
   VOCALIZE DATA MODULE - Essential Elementary Expressions (50 Units Rephrased & Shuffled)
   150 Real Practical Sentences derived from 50 Essential Elementary Curriculum Units
   Copyright-safe rephrased and randomized ordering for optimal retrieval practice
   ========================================================================== */

function buildEssentialElementary50UnitsDataset() {
  const unitsData = [
    { unit: "Unit 01", topic: "Greeting & Self Introduction (인사와 자기소개)", sentences: [
      { target: "Hello! My name is Alex.", translation: "안녕하세요! 제 이름은 알렉스입니다." },
      { target: "Hi there, I am a new fifth grade student.", translation: "안녕, 나는 새 5학년 학생이야." },
      { target: "Nice to meet you, my friend.", translation: "만나서 반가워, 내 친구야." }
    ]},
    { unit: "Unit 02", topic: "Asking How Someone Is (안부 묻기)", sentences: [
      { target: "How are you doing today?", translation: "오늘 어떻게 지내세요?" },
      { target: "I am doing great, thank you.", translation: "잘 지내고 있어요, 고마워요." },
      { target: "How is your day going so far?", translation: "오늘 하루 어떻게 보내고 있나요?" }
    ]},
    { unit: "Unit 03", topic: "Asking Age (나이 묻기)", sentences: [
      { target: "How old are you this year?", translation: "올해 몇 살인가요?" },
      { target: "I am ten years old.", translation: "저는 열 살입니다." },
      { target: "My younger brother is eight years old.", translation: "내 남동생은 여덟 살이야." }
    ]},
    { unit: "Unit 04", topic: "Asking Object Names (물건 이름 묻기)", sentences: [
      { target: "What is this object on the desk?", translation: "책상 위에 있는 이 물건은 무엇인가요?" },
      { target: "It is a yellow wooden pencil.", translation: "노란색 나무 연필입니다." },
      { target: "Is this your new school bag?", translation: "이것이 너의 새 책가방이니?" }
    ]},
    { unit: "Unit 05", topic: "Asking Colors (색깔 묻기)", sentences: [
      { target: "What color is your new bicycle?", translation: "너의 새 자전거는 무슨 색이니?" },
      { target: "My bicycle is bright blue.", translation: "내 자전거는 밝은 파란색이야." },
      { target: "I like red and pink flowers.", translation: "나는 빨간색과 분홍색 꽃을 좋아해." }
    ]},
    { unit: "Unit 06", topic: "Asking Weather (날씨 묻기)", sentences: [
      { target: "How is the weather outside today?", translation: "오늘 바깥 날씨가 어때요?" },
      { target: "It is sunny and warm outside.", translation: "밖은 화창하고 따뜻해요." },
      { target: "Take an umbrella because it is raining.", translation: "비가 오고 있으니 우산을 챙기렴." }
    ]},
    { unit: "Unit 07", topic: "Asking Days of the Week (요일 묻기)", sentences: [
      { target: "What day of the week is it today?", translation: "오늘은 무슨 요일인가요?" },
      { target: "Today is Friday, my favorite day.", translation: "오늘은 내가 가장 좋아하는 금요일이야." },
      { target: "We have gym class every Wednesday.", translation: "우리는 수요일마다 체육 수업이 있어." }
    ]},
    { unit: "Unit 08", topic: "Asking Time (시간 묻기)", sentences: [
      { target: "What time is it right now?", translation: "지금 몇 시인가요?" },
      { target: "It is exactly seven o'clock.", translation: "정확히 7시입니다." },
      { target: "It is time to eat breakfast.", translation: "아침 식사할 시간이야." }
    ]},
    { unit: "Unit 09", topic: "Polite Classroom Commands (교실 기본 지시어)", sentences: [
      { target: "Please stand up quietly when called.", translation: "이름이 불리면 조용히 일어서세요." },
      { target: "Sit down and open your textbook.", translation: "앉아서 교과서를 펼치렴." },
      { target: "Raise your hand to ask a question.", translation: "질문이 있으면 손을 드세요." }
    ]},
    { unit: "Unit 10", topic: "Safety & Rules (안전 및 수칙)", sentences: [
      { target: "Please do not run in the hallway.", translation: "복도에서 뛰지 마세요." },
      { target: "Walk slowly and carefully on the stairs.", translation: "계단에서는 천천히 조심해서 걸으세요." },
      { target: "Keep your classroom clean and safe.", translation: "교실을 깨끗하고 안전하게 유지하자." }
    ]},
    { unit: "Unit 11", topic: "Counting Quantity (개수 세기)", sentences: [
      { target: "How many apples are in the basket?", translation: "바구니에 사과가 몇 개 있나요?" },
      { target: "There are five fresh red apples.", translation: "신선한 빨간 사과가 5개 있어요." },
      { target: "Count the colorful balloons together.", translation: "알록달록한 풍선들을 함께 세어 보자." }
    ]},
    { unit: "Unit 12", topic: "Expressing Abilities (할 수 있는 능력)", sentences: [
      { target: "I can swim across the pool.", translation: "나는 수영장 건너편까지 수영할 수 있어." },
      { target: "She can ride a bicycle very well.", translation: "그녀는 자전거를 아주 잘 탈 수 있어." },
      { target: "He can play the piano nicely.", translation: "그는 피아노를 멋지게 칠 수 있어." }
    ]},
    { unit: "Unit 13", topic: "Expressing Limitations (할 수 없는 것)", sentences: [
      { target: "I cannot dance very well yet.", translation: "나는 아직 춤을 잘 추지 못해." },
      { target: "He cannot play basketball today.", translation: "그는 오늘 농구를 하지 못해." },
      { target: "Don't worry, practice makes perfect.", translation: "걱정마, 연습하면 완벽해져." }
    ]},
    { unit: "Unit 14", topic: "Expressing Food Likes (좋아하는 음식)", sentences: [
      { target: "I really like delicious cheese pizza.", translation: "나는 맛있는 치즈 피자를 정말 좋아해." },
      { target: "My favorite food is warm spaghetti.", translation: "내가 가장 좋아하는 음식은 따뜻한 스파게티야." },
      { target: "We love eating ice cream in summer.", translation: "우리는 여름에 아이스크림 먹는 것을 좋아해." }
    ]},
    { unit: "Unit 15", topic: "Expressing Dislikes (싫어하는 활동)", sentences: [
      { target: "I do not like fishing in the river.", translation: "나는 강에서 낚시하는 것을 좋아하지 않아." },
      { target: "She dislikes eating spicy peppers.", translation: "그녀는 매운 고추 먹는 것을 싫어해." },
      { target: "He prefers indoor board games.", translation: "그는 실내 보드게임을 더 선호해." }
    ]},
    { unit: "Unit 16", topic: "Expressing Emotions (기분과 감정)", sentences: [
      { target: "I am so happy to see you again.", translation: "너를 다시 만나서 정말 기뻐." },
      { target: "We feel excited about our field trip.", translation: "우리는 소풍에 대해 기대되고 신나." },
      { target: "Smile brightly and have a great day.", translation: "환하게 웃으며 좋은 하루 보내렴." }
    ]},
    { unit: "Unit 17", topic: "Asking People (사람 묻기)", sentences: [
      { target: "Who is that girl standing over there?", translation: "저기 서 있는 저 소녀는 누구니?" },
      { target: "She is our new English teacher.", translation: "그녀는 우리의 새 영어 선생님이셔." },
      { target: "Meet my best friend Minho.", translation: "내 최고의 친구 민호를 소개할게." }
    ]},
    { unit: "Unit 18", topic: "Asking Current Actions (현재 동작 묻기)", sentences: [
      { target: "What are you doing right now?", translation: "너 지금 무엇을 하고 있니?" },
      { target: "I am drawing a picture of a cat.", translation: "나는 고양이 그림을 그리고 있어." },
      { target: "They are playing soccer in the yard.", translation: "그들은 마당에서 축구를 하고 있어." }
    ]},
    { unit: "Unit 19", topic: "Expressing Wants (원하는 것 묻기)", sentences: [
      { target: "What do you want to eat for lunch?", translation: "점심으로 무엇을 먹고 싶니?" },
      { target: "I want a warm sandwich and milk.", translation: "따뜻한 샌드위치와 우유를 원해요." },
      { target: "She wants to buy a storybook.", translation: "그녀는 동화책을 사고 싶어해." }
    ]},
    { unit: "Unit 20", topic: "Proposing Activities (활동 제안하기)", sentences: [
      { target: "Let us play soccer after school.", translation: "방과 후에 축구 하자." },
      { target: "Shall we ride bikes together?", translation: "우리 함께 자전거 탈까?" },
      { target: "Let's build a sandcastle on the beach.", translation: "해변에서 모래성을 쌓자." }
    ]},
    { unit: "Unit 21", topic: "Asking Location of Items (물건 위치 묻기)", sentences: [
      { target: "Where is my favorite wristwatch?", translation: "내가 가장 좋아하는 손목시계가 어디 있지?" },
      { target: "Where did I put my pencil case?", translation: "내 필통을 어디에 두었지?" },
      { target: "Look inside your school backpack.", translation: "너의 책가방 안을 들여다보렴." }
    ]},
    { unit: "Unit 22", topic: "Describing Locations (위치 설명하기)", sentences: [
      { target: "They are on top of the study table.", translation: "그것들은 공부 책상 위에 있어." },
      { target: "Your books are inside the desk drawer.", translation: "네 책들은 책상 서랍 안에 있어." },
      { target: "The cat is sleeping under the chair.", translation: "고양이가 의자 아래에서 자고 있어." }
    ]},
    { unit: "Unit 23", topic: "Asking Prices (가격 묻기)", sentences: [
      { target: "How much is this toy car?", translation: "이 장난감 자동차는 얼마인가요?" },
      { target: "It costs five dollars and fifty cents.", translation: "5달러 50센트입니다." },
      { target: "That yellow pencil is very cheap.", translation: "저 노란 연필은 아주 저렴해요." }
    ]},
    { unit: "Unit 24", topic: "Asking Ownership (소유권 묻기)", sentences: [
      { target: "Is this blue backpack yours?", translation: "이 파란색 배낭이 네 것이니?" },
      { target: "Is this your black umbrella?", translation: "이 검은색 우산이 너의 것이니?" },
      { target: "Check the name tag on the bag.", translation: "가방의 이름표를 확인해 보렴." }
    ]},
    { unit: "Unit 25", topic: "Clarifying Non-ownership (내 것이 아님을 말하기)", sentences: [
      { target: "This green umbrella is not mine.", translation: "이 초록색 우산은 내 것이 아니야." },
      { target: "It belongs to my friend Sujin.", translation: "이것은 내 친구 수진이의 거야." },
      { target: "Mine is in my classroom.", translation: "내 것은 내 교실에 있어." }
    ]},
    { unit: "Unit 26", topic: "Asking Origin & Country (출신 국가 묻기)", sentences: [
      { target: "Where are you from originally?", translation: "당신은 원래 어디 출신인가요?" },
      { target: "I am from Seoul, South Korea.", translation: "나는 대한민국 서울 출신이야." },
      { target: "She comes from Sydney, Australia.", translation: "그녀는 호주 시드니에서 왔어." }
    ]},
    { unit: "Unit 27", topic: "Asking School Grade (학년 묻기)", sentences: [
      { target: "What grade are you in at school?", translation: "학교에서 몇 학년이니?" },
      { target: "I am in the fifth grade now.", translation: "나는 이제 5학년이야." },
      { target: "My sister is a third grader.", translation: "내 여동생은 3학년이야." }
    ]},
    { unit: "Unit 28", topic: "Asking Favorite Subjects (좋아하는 과목)", sentences: [
      { target: "What is your favorite subject?", translation: "네가 가장 좋아하는 과목은 무엇이니?" },
      { target: "I like science class best.", translation: "나는 과학 수업을 가장 좋아해." },
      { target: "Math is fun when we solve puzzles.", translation: "퍼즐을 풀 때 수학은 재미있어." }
    ]},
    { unit: "Unit 29", topic: "Describing Appearances (외모 묘사)", sentences: [
      { target: "She has long brown wavy hair.", translation: "그녀는 긴 갈색 웨이브 머리를 가졌어." },
      { target: "He wears silver glasses and a smile.", translation: "그는 은색 안경을 쓰고 미소를 지어." },
      { target: "My brother is tall and friendly.", translation: "내 형은 키가 크고 친절해." }
    ]},
    { unit: "Unit 30", topic: "Giving Directions & Places (장소 위치 안내)", sentences: [
      { target: "The library is in front of the bakery.", translation: "도서관은 빵집 앞에 있어." },
      { target: "The police station is next to the park.", translation: "경찰서는 공원 옆에 있어." },
      { target: "Walk straight for two blocks.", translation: "두 블록 동안 직진하세요." }
    ]},
    { unit: "Unit 31", topic: "Asking Free Time Hobbies (취미 활동 묻기)", sentences: [
      { target: "What do you usually do in your free time?", translation: "자유 시간에 주로 무엇을 하나요?" },
      { target: "I like reading fun comic books.", translation: "나는 재미있는 만화책 읽는 것을 좋아해." },
      { target: "He plays soccer with his neighbors.", translation: "그는 이웃들과 축구를 해." }
    ]},
    { unit: "Unit 32", topic: "Vacation Plans (방학 계획 묻기)", sentences: [
      { target: "What will you do during summer vacation?", translation: "여름 방학 동안 무엇을 할 거니?" },
      { target: "I am going to visit my grandparents.", translation: "나는 할머니 할아버지를 뵈러 갈 거야." },
      { target: "We will travel to Jeju Island.", translation: "우리는 제주도로 여행을 갈 거야." }
    ]},
    { unit: "Unit 33", topic: "Asking Past Activities (과거 행동 묻기)", sentences: [
      { target: "What did you do yesterday afternoon?", translation: "어제 오후에 무엇을 했니?" },
      { target: "I played computer games with brother.", translation: "남동생과 컴퓨터 게임을 했어." },
      { target: "She finished her homework early.", translation: "그녀는 숙제를 일찍 끝냈어." }
    ]},
    { unit: "Unit 34", topic: "Asking Reasons (이유 묻기)", sentences: [
      { target: "Why are you feeling so happy today?", translation: "오늘 왜 그렇게 기분이 좋으니?" },
      { target: "Because I got a perfect score on the test.", translation: "시험에서 만점을 받았기 때문이야." },
      { target: "We celebrate a special family day.", translation: "우리는 특별한 가족의 날을 축하해." }
    ]},
    { unit: "Unit 35", topic: "Asking Permission (허락 구하기)", sentences: [
      { target: "May I take a photo here?", translation: "여기서 사진을 찍어도 될까요?" },
      { target: "Can I use your colored pencils?", translation: "네 색연필을 써도 될까?" },
      { target: "Sure, feel free to use them.", translation: "그럼, 편하게 사용해." }
    ]},
    { unit: "Unit 36", topic: "Asking Possession (누구의 물건인지 묻기)", sentences: [
      { target: "Whose soccer ball is lying on the floor?", translation: "바닥에 놓인 축구공은 누구의 것이니?" },
      { target: "Whose red jacket is this?", translation: "이 빨간 재킷은 누구의 것이니?" },
      { target: "It belongs to the gym teacher.", translation: "체육 선생님의 것입니다." }
    ]},
    { unit: "Unit 37", topic: "Describing Illness (Symptoms) (아픈 증상 말하기)", sentences: [
      { target: "I have a headache and fever today.", translation: "오늘 두통과 열이 있어요." },
      { target: "My stomach hurts a little bit.", translation: "배가 조금 아파요." },
      { target: "Rest well and drink warm water.", translation: "잘 쉬고 따뜻한 물을 마시렴." }
    ]},
    { unit: "Unit 38", topic: "Giving Health Advice (건강 조언하기)", sentences: [
      { target: "Drink some warm lemon tea.", translation: "따뜻한 레몬차를 마시렴." },
      { target: "Get plenty of sleep at night.", translation: "밤에 수면을 충분히 취하렴." },
      { target: "Wash your hands frequently.", translation: "손을 자주 씻으렴." }
    ]},
        { unit: "Unit 39", topic: "Dates & Months (날짜 말하기)", sentences: [
      { target: "Today is March seventh.", translation: "오늘은 3월 7일입니다.", phonetic: "[투데이 이즈 마치 세븐스]" },
      { target: "My birthday is May fifteenth.", translation: "내 생일은 5월 15일이야.", phonetic: "[마이 버스데이 이즈 메이 피프틴스]" },
      { target: "Children's Day is May fifth.", translation: "어린이날은 5월 5일입니다.", phonetic: "[칠드런스 데이 이즈 메이 피프스]" }
    ]},
    { unit: "Unit 40", topic: "Future Intentions (미래 계획 말하기)", sentences: [
      { target: "We are going to plant green trees.", translation: "우리는 푸른 나무를 심을 예정입니다.", phonetic: "[위 아 고잉 투 플랜트 그린 트리스]" },
      { target: "I am going to bake chocolate cookies.", translation: "나는 초콜릿 쿠키를 구울 거야.", phonetic: "[아이 앰 고잉 투 베이크 초콜릿 쿠키스]" },
      { target: "They will join the art club.", translation: "그들은 미술 동아리에 가입할 거야.", phonetic: "[데이 위 조인 디 아트 클럽]" }
    ]},
    { unit: "Unit 41", topic: "Comparatives (비교급 표현)", sentences: [
      { target: "I am taller than my younger brother.", translation: "나는 남동생보다 키가 더 커.", phonetic: "[아이 앰 톨러 댄 마이 영거 브라더]" },
      { target: "An elephant is bigger than a lion.", translation: "코끼리는 사자보다 더 커.", phonetic: "[앤 엘리펀트 이즈 비거 댄 어 라이언]" },
      { target: "A cheetah runs faster than a horse.", translation: "치타는 말보다 더 빠르게 달려.", phonetic: "[어 치타 런스 패스터 댄 어 호스]" }
    ]},
    { unit: "Unit 42", topic: "Ordering & Polite Requests (음식 주문 및 요청)", sentences: [
      { target: "What would you like to order today?", translation: "오늘 무엇을 주문하시겠어요?", phonetic: "[왓 우드 유 라이크 투 오더 투데이]" },
      { target: "I would like a glass of orange juice.", translation: "오렌지 주스 한 잔 주세요.", phonetic: "[아이 우드 라이크 어 글래스 오브 오렌지 주스]" },
      { target: "Here is your fresh juice.", translation: "여기 신선한 주스가 있습니다.", phonetic: "[히어 이즈 유어 프레시 주스]" }
    ]},
    { unit: "Unit 43", topic: "Asking Frequency (수행 빈도 묻기)", sentences: [
      { target: "How often do you exercise each week?", translation: "매주 얼마나 자주 운동하나요?", phonetic: "[하우 오프튼 두 유 엑서사이즈 이치 위크]" },
      { target: "I practice piano twice a week.", translation: "나는 일주일에 두 번 피아노를 연습해요.", phonetic: "[아이 프랙티스 피아노 트와이스 어 위크]" },
      { target: "She visits the library every Saturday.", translation: "그녀는 토요일마다 도서관에 방문해요.", phonetic: "[쉬 비지츠 더 라이브러리 에브리 새터데이]" }
    ]},
    { unit: "Unit 44", topic: "Expressing Obligations (의무와 권고 표현)", sentences: [
      { target: "You should wear a helmet when biking.", translation: "자전거를 탈 때는 헬멧을 써야 해.", phonetic: "[유 슈드 웨어 어 헬멧 웬 바이킹]" },
      { target: "We must protect the forest environment.", translation: "우리는 산림 환경을 보호해야 합니다.", phonetic: "[위 머스트 프로텍트 더 포레스트 엔바이런먼트]" },
      { target: "Students ought to follow traffic rules.", translation: "학생들은 교통 법규를 준수해야 합니다.", phonetic: "[스튜던츠 오트 투 팔로우 트래픽 룰스]" }
    ]},
    { unit: "Unit 45", topic: "Describing Past Actions (과거 동작 묘사)", sentences: [
      { target: "I watched an exciting movie yesterday.", translation: "나는 어제 흥미진진한 영화를 보았어.", phonetic: "[아이 워치드 앤 익사이팅 무비 예스터데이]" },
      { target: "They traveled to Jeju Island last month.", translation: "그들은 지난달에 제주도를 여행했습니다.", phonetic: "[데이 트래블드 투 제주 아일랜드 라스트 먼스]" },
      { target: "We prepared a surprise birthday party.", translation: "우리는 깜짝 생일 파티를 준비했어요.", phonetic: "[위 프리패어드 어 서프라이즈 버스데이 파티]" }
    ]},
    { unit: "Unit 46", topic: "Hopes & Dreams (장래 희망과 꿈)", sentences: [
      { target: "My dream is to become a space scientist.", translation: "내 꿈은 우주 과학자가 되는 거야.", phonetic: "[마이 드림 이즈 투 비컴 어 스페이스 사이언티스트]" },
      { target: "I hope to travel all around the world.", translation: "나는 전 세계를 여행하길 희망합니다.", phonetic: "[아이 호프 투 트래블 올 어라운드 더 월드]" },
      { target: "She wants to design beautiful clothes.", translation: "그녀는 예쁜 옷을 디자인하고 싶어해요.", phonetic: "[쉬 원츠 투 디자인 뷰티풀 클로스]" }
    ]},
    { unit: "Unit 47", topic: "Asking for Permission (허락 구하기)", sentences: [
      { target: "May I open the window for fresh air?", translation: "환기를 위해 창문을 열어도 될까요?", phonetic: "[메이 아이 오픈 더 윈도우 포 프레시 에어]" },
      { target: "Can I borrow your colored pencils?", translation: "네 색연필을 빌릴 수 있을까?", phonetic: "[캔 아이 보로우 유어 컬러드 펜슬스]" },
      { target: "Could we take a short break now?", translation: "지금 잠시 쉬어도 될까요?", phonetic: "[쿠드 위 테이크 어 쇼트 브레이크 나우]" }
    ]},
    { unit: "Unit 48", topic: "Sharing Opinions (의견 나누기)", sentences: [
      { target: "In my opinion, reading books is great.", translation: "내 생각엔 책을 읽는 것이 참 좋아.", phonetic: "[인 마이 오피니언 리딩 북스 이즈 그레이트]" },
      { target: "I agree with your brilliant idea.", translation: "나는 너의 훌륭한 의견에 동의해.", phonetic: "[아이 어그리 위드 유어 브릴리언트 아이디어]" },
      { target: "That sounds like a wonderful plan.", translation: "그것 참 멋진 계획처럼 들리네요.", phonetic: "[댓 사운즈 라이크 어 원더풀 플랜]" }
    ]},
    { unit: "Unit 49", topic: "Making Suggestions (제안 및 권유하기)", sentences: [
      { target: "Why don't we play soccer together?", translation: "우리 함께 축구하는 건 어때?", phonetic: "[와이 돈트 위 플레이 사커 투게더]" },
      { target: "Let's visit the science museum tomorrow.", translation: "내일 과학 박물관에 방문하자.", phonetic: "[렛츠 비지트 더 사이언스 뮤지엄 투모로우]" },
      { target: "How about having some fruit salad?", translation: "과일 샐러드를 먹는 건 어때요?", phonetic: "[하우 어바웃 해빙 섬 프루트 샐러드]" }
    ]},
    { unit: "Unit 50", topic: "Expressing Feelings (감정 종합 표현)", sentences: [
      { target: "I feel incredibly happy and grateful today.", translation: "오늘 너무 행복하고 감사한 기분이야.", phonetic: "[아이 필 인크레더블리 해피 앤 그레이트풀 투데이]" },
      { target: "We are proud of your great effort.", translation: "우리는 너의 위대한 노력이 자랑스러워.", phonetic: "[위 아 프라우드 오브 유어 그레이트 에포트]" },
      { target: "Everything will be perfectly fine soon.", translation: "곧 모든 것이 완벽하게 좋아질 거야.", phonetic: "[에브리씽 위 비 퍼펙틀리 파인 순]" }
    ]}
  ]
};
