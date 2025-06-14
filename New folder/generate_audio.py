from gtts import gTTS
import os

# Your phrase list: "filename": "Japanese text"
phrases = {
    "konnichiwa": "こんにちは",
    "ohayou_gozaimasu": "おはようございます",
    "konbanwa": "こんばんは",
    "sayounara": "さようなら",
    "arigatou": "ありがとう",
    "sumimasen": "すみません",
    "itadakimasu": "いただきます",
    "gochisousama_deshita": "ごちそうさまでした",
    "mizu_wo_kudasai": "水をください",
    "menyuu_wo_kudasai": "メニューをください",
    "tasukete": "助けて",
    "keisatsu_wo_yondete_kudasai": "警察を呼んでください",
    "byouin_wa_doko_desu_ka": "病院はどこですか？",
    "guai_ga_warui_desu": "具合が悪いです"
}

output_dir = "audio"
os.makedirs(output_dir, exist_ok=True)

for filename, text in phrases.items():
    tts = gTTS(text=text, lang='ja')
    tts.save(f"{output_dir}/{filename}.mp3")

print("✅ Audio files generated!")
