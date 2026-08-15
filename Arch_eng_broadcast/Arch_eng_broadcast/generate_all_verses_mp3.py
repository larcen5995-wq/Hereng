import os
from gtts import gTTS

print("=== GENERATING HIGH-QUALITY MP3 VOICE FILES FOR ALL REAL BIBLE DATA ===")

AUDIO_DIR = os.path.join(os.path.dirname(__file__), 'audio')
KO_DIR = os.path.join(AUDIO_DIR, 'korean')
EN_DIR = os.path.join(AUDIO_DIR, 'english')

os.makedirs(KO_DIR, exist_ok=True)
os.makedirs(EN_DIR, exist_ok=True)

# ALL REAL BIBLE VERSES IN THE APP
ALL_VERSES = [
    # 창세기 1장
    { "key": "GEN_1_1", "ko": "태초에 하나님이 천지를 창조하시니라", "en": "In the beginning God created the heaven and the earth." },
    { "key": "GEN_1_2", "ko": "땅이 혼돈하고 공허하며 흑암이 깊음 위에 있고 하나님의 영은 수면 위에 운행하시니라", "en": "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters." },
    { "key": "GEN_1_3", "ko": "하나님이 이르시되 빛이 있으라 하시니 빛이 있었고", "en": "And God said, Let there be light: and there was light." },
    { "key": "GEN_1_4", "ko": "빛이 하나님 보시기에 좋았더라 하나님이 빛과 어둠을 나누사", "en": "And God saw the light, that it was good: and God divided the light from the darkness." },
    { "key": "GEN_1_5", "ko": "하나님이 빛을 낮이라 부르시고 어둠을 밤이라 부르시니라 저녁이 되고 아침이 되니 이는 첫째 날이니라", "en": "And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day." },

    # 창세기 2장
    { "key": "GEN_2_1", "ko": "천지와 만물이 다 이루어지니라", "en": "Thus the heavens and the earth were finished, and all the host of them." },
    { "key": "GEN_2_2", "ko": "하나님이 그가 하시던 일을 일곱째 날에 마치시니 그가 하시던 모든 일을 마치고 일곱째 날에 안식하시니라", "en": "And on the seventh day God ended his work which he had made; and he rested on the seventh day from all his work which he had made." },
    { "key": "GEN_2_3", "ko": "하나님이 그 일곱째 날을 복되게 하사 거룩하게 하셨으니 이는 하나님이 그 창조하시며 만들시던 모든 일을 마치시고 그 날에 안식하셨음이니라", "en": "And God blessed the seventh day, and sanctified it: because that in it he had rested from all his work which God created and made." },
    { "key": "GEN_2_4", "ko": "이것이 천지가 창조될 때에 하늘과 땅의 내력이니 여호와 하나님이 땅과 하늘을 만들시던 날에", "en": "These are the generations of the heavens and of the earth when they were created, in the day that the LORD God made the earth and the heavens." },
    { "key": "GEN_2_5", "ko": "여호와 하나님이 땅에 비를 내리지 아니하셨고 땅을 갈 사람도 없었으므로 들에는 목초가 아직 없었고 밭에는 채소가 나지 아니하였으며", "en": "And every plant of the field before it was in the earth, and every herb of the field before it grew: for the LORD God had not caused it to rain upon the earth, and there was not a man to till the ground." },

    # 요한복음 1장
    { "key": "JHN_1_1", "ko": "태초에 말씀이 계시니라 이 말씀이 하나님과 함께 계셨으니 이 말씀은 곧 하나님이시니라", "en": "In the beginning was the Word, and the Word was with God, and the Word was God." },
    { "key": "JHN_1_2", "ko": "그가 태초에 하나님과 함께 계셨고", "en": "The same was in the beginning with God." },
    { "key": "JHN_1_3", "ko": "만물이 그로 말미암아 지은 바 되었으니 지은 것이 하나도 그가 없이는 된 것이 없느니라", "en": "All things were made by him; and without him was not any thing made that was made." },
    { "key": "JHN_1_4", "ko": "그 안에 생명이 있었으니 이 생명은 사람들의 빛이라", "en": "In him was life; and the life was the light of men." },
    { "key": "JHN_1_5", "ko": "빛이 어둠에 비치되 어둠이 깨닫지 못하더라", "en": "And the light shineth in darkness; and the darkness comprehended it not." },

    # 요한복음 3장
    { "key": "JHN_3_16", "ko": "하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 그를 믿는 자마다 멸망하지 않고 영생을 얻게 하려 하심이라", "en": "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life." },
    { "key": "JHN_3_17", "ko": "하나님이 그 아들을 세상에 보내신 것은 세상을 심판하려 하심이 아니요 그로 말미암아 세상이 구원을 받게 하려 하심이라", "en": "For God sent not his Son into the world to condemn the world; but that the world through him might be saved." },
    { "key": "JHN_3_18", "ko": "그를 믿는 자는 심판을 받지 아니하는 것이요 믿지 아니하는 자는 하나님의 독생자의 이름을 믿지 아니하므로 벌써 심판을 받은 것이니라", "en": "He that believeth on him is not condemned: but he that believeth not is condemned already, because he hath not believed in the name of the only begotten Son of God." },

    # 시편 23편
    { "key": "PSA_23_1", "ko": "여호와는 나의 목자시니 내게 부족함이 없으리로다", "en": "The LORD is my shepherd; I shall not want." },
    { "key": "PSA_23_2", "ko": "그가 나를 푸른 밭에 누이시며 쉬는 물 가로 인도하시는도다", "en": "He maketh me to lie down in green pastures: he leadeth me beside the still waters." },
    { "key": "PSA_23_3", "ko": "내 영혼을 소생시키시고 자기 이름을 위하여 의의 길로 인도하시는도다", "en": "He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake." },
    { "key": "PSA_23_4", "ko": "내가 사망의 음침한 골짜기로 다닐지라도 해를 두려워하지 않을 것은 주께서 나와 함께 하심이라 주의 지팡이와 막대기가 나를 안위하시나이다", "en": "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me." },
    { "key": "PSA_23_5", "ko": "내 평생에 선하심과 인자하심이 반드시 나를 따르리니 내가 여호와의 집에 영원히 살리로다", "en": "Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever." },

    # 마태복음 5장
    { "key": "MAT_5_1", "ko": "예수께서 무리를 보시고 산에 올라가 앉으시니 제자들이 나아온지라", "en": "And seeing the multitudes, he went up into a mountain: and when he was set, his disciples came unto him:" },
    { "key": "MAT_5_2", "ko": "입을 열어 가르쳐 이르시되", "en": "And he opened his mouth, and taught them, saying," },
    { "key": "MAT_5_3", "ko": "심령이 가난한 자는 복이 있나니 천국이 그들의 것임이요", "en": "Blessed are the poor in spirit: for theirs is the kingdom of heaven." },
    { "key": "MAT_5_4", "ko": "애통하는 자는 복이 있나니 그들이 위로를 받을 것임이요", "en": "Blessed are they that mourn: for they shall be comforted." },
    { "key": "MAT_5_5", "ko": "온유한 자는 복이 있나니 그들이 땅을 기업으로 받을 것임이요", "en": "Blessed are the meek: for they shall inherit the earth." },

    # 로마서 8장
    { "key": "ROM_8_1", "ko": "그러므로 이제 그리스도 예수 안에 있는 자에게는 결코 정죄함이 없나니", "en": "There is therefore now no condemnation to them which are in Christ Jesus." },
    { "key": "ROM_8_2", "ko": "이는 그리스도 예수 안에 있는 생명의 성령의 법이 죄와 사망의 법에서 너를 해방하였음이라", "en": "For the law of the Spirit of life in Christ Jesus hath made me free from the law of sin and death." },
    { "key": "ROM_8_3", "ko": "우리가 알거니와 하나님을 사랑하는 자 곧 그의 뜻대로 부르심을 입은 자들에게는 모든 것이 합력하여 선을 이루느니라", "en": "And we know that all things work together for good to them that love God." }
]

for idx, item in enumerate(ALL_VERSES, 1):
    ko_file = os.path.join(KO_DIR, f"{item['key']}.mp3")
    en_file = os.path.join(EN_DIR, f"{item['key']}.mp3")

    if not os.path.exists(ko_file):
        print(f"[{idx}/{len(ALL_VERSES)}] Generating Korean Audio: {item['key']}.mp3")
        gTTS(text=item['ko'], lang='ko').save(ko_file)

    if not os.path.exists(en_file):
        print(f"[{idx}/{len(ALL_VERSES)}] Generating English Audio: {item['key']}.mp3")
        gTTS(text=item['en'], lang='en').save(en_file)

print("=== ALL PHYSICAL MP3 VOICE AUDIO FILES GENERATED 100% SUCCESSFULLY! ===")
