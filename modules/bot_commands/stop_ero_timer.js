import variables from '../variables/variables'
import adminCheck from '../functions/adminCheck'
import eroTimerObj from '../objects/eroTimer'

let bot = variables.bot

export default function stop_ero_timer() {
    bot.onText(/\/stop_ero_timer/, (msg) => {
        if (adminCheck(msg) != true) {
            bot.sendMessage(msg.chat.id, 'Только для посвященных')
            return
        }

        eroTimerObj.stop_ero_timer(msg)
    });
}