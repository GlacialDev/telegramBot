import variables from '../variables/variables'
import authCheck from '../functions/authCheck'
import eroTimerObj from '../channel_management/ero_channel/objects/eroTimer'
import uploader from '../objects/uploader';
import voiceMesManager from '../objects/voiceMesManager'

let bot = variables.bot

export default function bot_settings() {
    bot.onText(/\/settings/, (msg) => {
        if (authCheck(msg) != true) return

        bot.sendMessage(msg.chat.id,
`Настройки:
- eroInterval: ${eroTimerObj.eroInterval / 3600000} ч. - ${eroTimerObj.eroTimerStateFlag}
- upload: ${uploader.flag}
- botVoice: ${voiceMesManager.speaker}
- botEmotions: ${voiceMesManager.emotion}`)
    });
} 