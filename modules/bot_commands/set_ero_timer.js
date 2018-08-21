import variables from '../variables/variables'
import adminCheck from '../functions/adminCheck'
import eroTimerObj from '../objects/eroTimer'

let bot = variables.bot

export default function set_ero_timer() {
    // таймер на выдачу картинок
    bot.onText(/\/set_ero_timer ([0-9]+)/, (msg, match) => {
        if (adminCheck(msg) != true) {
            bot.sendMessage(msg.chat.id, 'Только для посвященных')
            return
        }

        eroTimerObj.set_ero_timer(msg, match);
    });
}