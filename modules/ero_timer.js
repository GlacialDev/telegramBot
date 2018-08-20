import adminCheck from '../functions/adminCheck'
import authCheck from '../functions/authCheck'
import takePhotoFromBuffer from '../functions/takePhotoFromBuffer'
import stopTimer from '../functions/stopTimer'
import replacer from '../functions/replacer'
import { bot, fs, eroTimer, eroInterval, eroTimerStateFlag, groupChat, setEroTimerFlag, setEroInterval, setTimer} from '../../variables'


export default function ero_timer() {

    // из saveform.txt в ero.txt в нужном формате
    bot.onText(/\/ero_replacer/, (msg) => {
        if (adminCheck(msg) != true) {
            bot.sendMessage(msg.chat.id, 'Только для посвященных')
            return
        }

        replacer('./download/savefrom.txt', './list/ero.txt', msg.chat.id)
    })


}