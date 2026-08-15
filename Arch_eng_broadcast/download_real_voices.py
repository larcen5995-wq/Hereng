import os
import sys
from gtts import gTTS

print("=== STARTING DOWNLOADING REAL PHYSICAL MP3 VOICE FILES FOR BIBLE VERSES ===")

AUDIO_DIR = os.path.join(os.path.dirname(__file__), 'audio')
KO_DIR = os.path.join(AUDIO_DIR, 'korean')
EN_DIR = os.path.join(AUDIO_DIR, 'english')

os.makedirs(KO_DIR, exist_ok=True)
os.makedirs(EN_DIR, exist_ok=True)

# REAL BIBLE VERSES TO DOWNLOAD AS PHYSICAL MP3 FILES
BIBLE_AUDIO_DATA = [
    # 시편 23편
    { "key": "PSA_23_1", "ko": "여호와는 나의 목자시니 내게 부족함이 없으리로다", "en": "The LORD is my shepherd; I shall not want." },
    { "key": "PSA_23_2", "ko": "그가 나를 푸른 밭에 누이시며 쉬는 물 가로 인도하시는도다", "en": "He maketh me to lie down in green pastures: he leadeth me beside the still waters." },
    { "key": "PSA_23_3", "ko": "내 영혼을 소생시키시고 자기 이름을 위하여 의의 길로 인도하시는도다", "en": "He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake." },
    { "key": "PSA_23_4", "ko": "내가 사망의 음침한 골짜기로 다닐지라도 해를 두려워하지 않을 것은 주께서 나와 함께 하심이라", "en": "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me;" },
    { "key": "PSA_23_5", "ko": "내 평생에 선하심과 인자하심이 반드시 나를 따르리니 내가 여호와의 집에 영원히 살리로다", "en": "Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever." },

    # 요한복음 3장
    { "key": "JHN_3_16", "ko": "하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 그를 믿는 자마다 멸망하지 않고 영생을 얻게 하려 하심이라", "en": "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life." },
    { "key": "JHN_3_17", "ko": "하나님이 그 아들을 세상에 보내신 것은 세상을 심판하려 하심이 아니요 그로 말미암아 세상이 구원을 받게 하려 하심이라", "en": "For God sent not his Son into the world to condemn the world; but that the world through him might be saved." },

    # 창세기 1장
    { "key": "GEN_1_1", "ko": "태초에 하나님이 천지를 창조하시니라", "en": "In the beginning God created the heaven and the earth." },
    { "key": "GEN_1_2", "ko": "땅이 혼돈하고 공허하며 흑암이 깊음 위에 있고 하나님의 영은 수면 위에 운행하시니라", "en": "And the earth was without form, and void; and darkness was upon the face of the deep." },
    { "key": "GEN_1_3", "ko": "하나님이 이르시되 빛이 있으라 하시니 빛이 있었고", "en": "And God said, Let there be light: and there was light." },

    # 창세기 2장
    { "key": "GEN_2_1", "ko": "천지와 만물이 다 이루어지니라", "en": "Thus the heavens and the earth were finished, and all the host of them." },
    { "key": "GEN_2_2", "ko": "하나님이 그가 하시던 일을 일곱째 날에 마치시니 그가 하시던 모든 일을 마치고 일곱째 날에 안식하시니라", "en": "And on the seventh day God ended his work which he had made." },
    { "key": "GEN_2_3", "ko": "하나님이 그 일곱째 날을 복되게 하사 거룩하게 하셨으니 이는 하나님이 그 날에 안식하셨음이니라", "en": "And God blessed the seventh day, and sanctified it: because that in it he had rested from all his work." },

    # 마태복음 5장
    { "key": "MAT_5_1", "ko": "예수께서 무리를 보시고 산에 올라가 앉으시니 제자들이 나아온지라", "en": "And seeing the multitudes, he went up into a mountain: and when he was set, his disciples came unto him:" },
    { "key": "MAT_5_2", "ko": "입을 열어 가르쳐 이르시되", "en": "And he opened his mouth, and taught them, saying," },
    { "key": "MAT_5_3", "ko": "심령이 가난한 자는 복이 있나니 천국이 그들의 것임이요", "en": "Blessed are the poor in spirit: for theirs is the kingdom of heaven." }
]

for idx, item in enumerate(BIBLE_AUDIO_DATA, 1):
    ko_file = os.path.join(KO_DIR, f"{item['key']}.mp3")
    en_file = os.path.join(EN_DIR, f"{item['key']}.mp3")

    if not os.path.exists(ko_file):
        print(f"[{idx}/{len(BIBLE_AUDIO_DATA)}] Downloading Korean MP3: {item['key']}.mp3 ...")
        tts_ko = gTTS(text=item['ko'], lang='ko')
        tts_ko.save(ko_file)

    if not os.path.exists(en_file):
        print(f"[{idx}/{len(BIBLE_AUDIO_DATA)}] Downloading English MP3: {item['key']}.mp3 ...")
        tts_en = gTTS(text=item['en'], lang='en')
        tts_en.save(en_file)

print("=== ALL REAL PHYSICAL MP3 VOICE FILES DOWNLOADED SUCCESSFULLY! ===")
