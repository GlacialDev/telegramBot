# What this bot can do?

- bot can send nudes (i'm not joking; see 'modules/channel_management' folder :D )
- if you set cloudConvertApiKey in config file, it can convert files in another extention ( https://cloudconvert.com for more information )
- if you set dialogflow api key in config file, you'll get possibility to talk with it ( https://dialogflow.com/docs/reference/v2-auth-setup )
- if you set yandexSpeechKit key in config file, it can translate voice-messages to text; speak voice messages (see 'modules/bot_commands/bot_say'; https://tech.yandex.com/ )
if you get both dialogflow and yandex speech kit keys:
- if you set "botDialogMode: true" (see 'modules/bot_commands/settings) it can answer on your voice messages
- if you set "botDialogTextAnswers: false" (same way) it can even answer with voice messages on your voice messages or text messages wrote throug (modules/bot_commands/talk_with_bot)
- and another things which more simple, but still can be useful and fun

bot use polling; so you can run it even on your pc; just get telegram bot token from BotFather and enjoy :)

# How to install?

- git clone git://github.com/Glacialix/telegramBot.git
- download mongodb ( https://www.mongodb.com/ ) and run mongod.exe on localhost:27017 (optional, you can don't run it, but polls and like/dislike systems won't work)
- npm install
- npm start

- also dont forget to write tokens/keys and id's in 'modules/secret/config.js' file (open it for more info)

**i'm really sorry for that ffmpeg folder, but i guess it is better than download it separately**