import variables from './modules/variables/variables'
import config from './modules/secret/config'

import help from './modules/bot_commands/help'
help()
import echo from './modules/bot_commands/echo'
echo()
import id from './modules/bot_commands/id'
id()
import send_to from './modules/bot_commands/send_to'
send_to()
import send_photo from './modules/bot_commands/send_photo'
send_photo()
import remind_me from './modules/bot_commands/remind_me'
remind_me()
import pass_gen from './modules/bot_commands/pass_gen'
pass_gen()
import roll from './modules/bot_commands/roll'
roll()
import talk_with_bot from './modules/bot_commands/talk_with_bot'
// проверка на наличие ключа к апи диалогфлоу
if (variables.dialogflow) talk_with_bot()
import bot_settings from './modules/bot_commands/settings'
bot_settings()
import upload from './modules/bot_commands/upload'
upload()
import upload_en_dis from './modules/bot_commands/upload_en_dis'
upload_en_dis()
import convert from './modules/bot_commands/convert'
// проверка на наличие ключа к апи клаудконверта
if (variables.cloudconvert) convert()
import poll from './modules/bot_commands/poll'
poll()
import bot_say from './modules/bot_commands/bot_say'
// проверка на наличие яндекс спичкит ключа
if (config.yandexSpeechKitKey) bot_say()
import bot_speech_voice from './modules/bot_commands/bot_speech_voice'
bot_speech_voice()
import bot_speech_emotion from './modules/bot_commands/bot_speech_emotion'
bot_speech_emotion()
import dialog_text_answer from './modules/bot_commands/dialog_text_answer'
dialog_text_answer()
import bot_dialog_mode from './modules/bot_commands/bot_dialog_mode'
bot_dialog_mode()

// channel management 
import ero_set_timer from './modules/channel_management/ero_channel/commands/ero_set_timer'
ero_set_timer()
import ero_stop_timer from './modules/channel_management/ero_channel/commands/ero_stop_timer'
ero_stop_timer()
import ero_how_much from './modules/channel_management/ero_channel/commands/ero_how_much'
ero_how_much()
import ero_add_more from './modules/channel_management/ero_channel/commands/ero_add_more'
ero_add_more()
import ero_give_img from './modules/channel_management/ero_channel/commands/ero_give_img'
ero_give_img()


import botInit from './modules/functions/botInit'
botInit()

import test from './modules/bot_commands/test'
test()