import variables from '../variables/variables'
import adminCheck from "../functions/adminCheck";
import eroTimerObj from "../objects/eroTimer";

let bot = variables.bot

export default function add_more_ero() {
    bot.onText(/\/add_more_ero/, (msg) => {
        if (adminCheck(msg) != true) return

        eroTimerObj.add_more_ero(msg)
    });
}