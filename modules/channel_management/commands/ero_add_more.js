import variables from '../../variables/variables'
import adminCheck from "../../functions/adminCheck";
import eroTimerObj from "../objects/eroTimer";

let bot = variables.bot

export default function ero_add_more() {
    bot.onText(/\/ero_add_more/, (msg) => {
        if (adminCheck(msg) != true) return

        eroTimerObj.ero_add_more(msg)
    });
}