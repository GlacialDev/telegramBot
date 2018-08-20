// то же самое, что в таймере, но вручную по команде /give_ero
import variables from '../variables/variables'
import authCheck from '../functions/authCheck'
import takePhotoFromBuffer from '../functions/takePhotoFromBuffer'

let bot = variables.bot

export default function give_ero() {
    bot.onText(/\/give_ero/, (msg) => {
        if (authCheck(msg) != true) return

        takePhotoFromBuffer("./list/ero.txt", msg.chat.id, true)
    });
} 