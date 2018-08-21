import variables from '../variables/variables'
import authCheck from '../functions/authCheck'

import eroTimerObj from '../objects/eroTimer'

let bot = variables.bot
let fs = variables.fs

export default function how_much_ero() {
    bot.onText(/\/how_much_ero/, (msg) => {
        if (authCheck(msg) != true) return

        let number = eroTimerObj.how_much_ero(msg)
    });
}