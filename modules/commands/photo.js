import bot from '../../variables'
import authCheck from '../functions/authCheck'

export default function photo() {
    bot.onText(/\/photo (https?:\/\/\S+)/, (msg, match) => {
        if (authCheck(msg) != true) return

        let link = match[1];
        bot.sendPhoto(groupChat, link);
    })
}