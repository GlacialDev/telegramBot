import authCheck from '../functions/authCheck'

export default function settings(bot, eroInterval, eroTimerStateFlag, downloadEnabledFlag) {
    bot.onText(/\/settings/, (msg) => {
        if (authCheck(msg) != true) return

        bot.sendMessage(msg.chat.id,
`Настройки:
- eroInterval: ${eroInterval / 3600000} ч. - ${eroTimerStateFlag}
- download: ${downloadEnabledFlag}`)
    });
}