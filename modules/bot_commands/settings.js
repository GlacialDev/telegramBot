import variables from '../variables/variables'
import authCheck from '../functions/authCheck'
import eroTimerObj from '../objects/eroTimer'
import downloader from '../objects/downloader';

let bot = variables.bot

export default function bot_settings() {
    bot.onText(/\/settings/, (msg) => {
        if (authCheck(msg) != true) return

        bot.sendMessage(msg.chat.id,
`Настройки:
- eroInterval: ${eroTimerObj.eroInterval / 3600000} ч. - ${eroTimerObj.eroTimerStateFlag}
- download: ${downloader.flag}`)
    });
} 