import variables from '../variables/variables'
import settings from '../variables/settings'
import authCheck from '../functions/authCheck'

let bot = variables.bot

export default function bot_settings() {
    bot.onText(/\/settings/, (msg) => {
        if (authCheck(msg) != true) return

        let eroInterval = settings.eroInterval
        let eroTimerStateFlag = settings.eroTimerStateFlag
        let downloadEnabledFlag = settings.downloadEnabledFlag

        bot.sendMessage(msg.chat.id,
`Настройки:
- eroInterval: ${eroInterval / 3600000} ч. - ${eroTimerStateFlag}
- download: ${downloadEnabledFlag}`)
    });
} 