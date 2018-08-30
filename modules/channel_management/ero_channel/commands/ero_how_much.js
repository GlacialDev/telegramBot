import variables from '../../../variables/variables'
import eroTimerObj from '../objects/eroTimer'
import adminCheck from '../../../functions/adminCheck';

let bot = variables.bot

export default function ero_how_much() {
    bot.onText(/\/ero_how_much/, (msg) => {
        if (adminCheck(msg) != true) return

        eroTimerObj.ero_how_much(msg)
    });
}