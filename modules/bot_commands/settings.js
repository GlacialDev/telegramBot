import variables from '../variables/variables'
import authCheck from '../functions/authCheck'
import eroTimerObj from '../channel_management/objects/eroTimer'
import uploader from '../objects/uploader';

let bot = variables.bot

export default function bot_settings() {
    bot.onText(/\/settings/, (msg) => {
        if (authCheck(msg) != true) return

        bot.sendMessage(msg.chat.id,
`Настройки:
- eroInterval: ${eroTimerObj.eroInterval / 3600000} ч. - ${eroTimerObj.eroTimerStateFlag}
- upload: ${uploader.flag}`)
    });
} 