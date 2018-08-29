import variables from '../../variables/variables'
import adminCheck from '../../functions/adminCheck'
import eroTimerObj from '../objects/eroTimer'

let bot = variables.bot

export default function ero_stop_timer() {
    bot.onText(/\/ero_stop_timer/, (msg) => {
        if (adminCheck(msg) != true) {
            bot.sendMessage(msg.chat.id, 'Только для посвященных')
            return
        }

        eroTimerObj.ero_stop_timer(msg)
    });
}