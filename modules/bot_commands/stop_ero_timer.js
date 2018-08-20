import variables from '../variables/variables'
import settings from '../variables/settings'
import adminCheck from '../functions/adminCheck'
import stopTimer from '../functions/stopTimer'

let bot = variables.bot
let groupChat = variables.groupChat
let eroTimer = settings.eroTimer
let eroTimerStateFlag = settings.eroTimerStateFlag

export default function stop_ero_timer() {
    bot.onText(/\/stop_ero_timer/, (msg) => {
        if (adminCheck(msg) != true) {
            bot.sendMessage(msg.chat.id, 'Только для посвященных')
            return
        }

        stopTimer(eroTimer)
        eroTimerStateFlag = 'disabled'
        // при остановке таймера группа об этом оповещается
        bot.sendMessage(groupChat, 'Таймер картинок остановлен')
    });
}