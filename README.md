# What this bot can do?

- bot can send nudes (i'm not joking; see **'modules/channel_management'** folder :D )
- if you set cloudConvertApiKey in config file, it can convert files in another extention ( https://cloudconvert.com for more information )
- if you set dialogflow api key in config file, you'll get possibility to talk with it ( https://dialogflow.com )
- if you set yandexSpeechKit key in config file, it can translate voice-messages to text; speak voice messages (see **'modules/bot_commands/bot_say'**; https://tech.yandex.com )
if you get both dialogflow and yandex speech kit keys:
- if you set "botDialogMode: true" (see **'modules/bot_commands/settings'**) it can answer on your voice messages
- if you set "botDialogTextAnswers: false" (same way) it can even answer with voice messages on your voice messages or text messages wrote through (**'modules/bot_commands/talk_with_bot'**)
- and another things which more simple, but still can be useful and fun

bot use polling; so you can run it even on your pc; just get telegram bot token from BotFather and enjoy :)

# How to install?

- git clone https://github.com/Glacialix/telegramBot.git
- cd telegramBot
- npm install
- *download mongodb ( https://www.mongodb.com ) and run mongod.exe on localhost:27017 (optional, you can don't run it, but polls and like/dislike systems won't work)*
- write tokens/keys and id's in **'modules/secret/config.js'** file (open it for more info)
- npm start

***
1. i'm really sorry for that ffmpeg folder, but i guess it is better than download it separately
2. also there are some not used code parts in **'extra_parts'** folder; maybe someone find it interesting
3. and yes, there is more than 1k commits; it is bad practice, i know, but i used github to transfer data on my amazon hosting where this bot running and was tested while i developed it

*hope someone will find this bot interesting and useful!*
