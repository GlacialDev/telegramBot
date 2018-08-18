import authCheck from '../functions/authCheck'
import { bot, eroInterval, eroTimerStateFlag, downloadEnabledFlag } from '../variables/variables'

export default function settings() {
    bot.onText(/\/settings/, (msg) => {
        if (authCheck(msg) != true) return

        bot.sendMessage(msg.chat.id,
`Настройки:
- eroInterval: ${eroInterval / 3600000} ч. - ${eroTimerStateFlag}
- download: ${downloadEnabledFlag}`)
    });
}