import variables from '../variables/variables'
import settings from '../variables/settings'
import authCheck from '../functions/authCheck'

let bot = variables.bot

export default function bot_settings() {
    bot.onText(/\/settings/, (msg) => {
        if (authCheck(msg) != true) return

        bot.sendMessage(msg.chat.id,
`Настройки:
- eroInterval: ${settings.eroInterval / 3600000} ч. - ${settings.eroTimerStateFlag}
- download: ${settings.downloadEnabledFlag}`)
    });
} 