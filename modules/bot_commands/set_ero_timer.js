import variables from '../variables/variables'
import settings from '../variables/settings'
import adminCheck from '../functions/adminCheck'
import stopTimer from '../functions/stopTimer'

let bot = variables.bot
let groupChat = variables.groupChat
let eroTimer = settings.eroTimer
let eroInterval = settings.eroInterval
let eroTimerStateFlag = settings.eroTimerStateFlag



export default function set_ero_timer() {
    // таймер на выдачу картинок
    bot.onText(/\/set_ero_timer ([0-9]+)/, (msg, match) => {
        if (adminCheck(msg) != true) {
            bot.sendMessage(msg.chat.id, 'Только для посвященных')
            return
        }

        let hours = match[1]
        // чтобы картинки не улетали как бешенные :)
        if (hours < 1) {
            bot.sendMessage(msg.chat.id, 'Нельзя ставить время меньше 1 часа')
            return
        }
        // если переназначаем таймер, прошлый нужно остановить
        stopTimer(eroTimer)
        // значение интервала для таймера
        eroInterval = 3600000*hours
        eroTimerStateFlag = 'enabled'
        // инициализация таймера
        eroTimer = setTimeout(() => {
            takePhotoFromBuffer("./list/ero.txt", groupChat, false)
        }, eroInterval)
        // если всё прошло успешно и без ошибок, далее следует сообщение в группу
        bot.sendMessage(groupChat, 'Буду присылать картинки каждые ' + hours + ' часов')
    });
}