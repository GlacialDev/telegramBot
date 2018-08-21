import variables from '../variables/variables'
import authCheck from '../functions/authCheck';

let bot = variables.bot
let groupChat = variables.groupChat

export default function send_photo() {
    bot.onText(/\/photo (https?:\/\/\S+)/, (msg, match) => {
        if (authCheck(msg) != true) return

        let link = match[1];
        bot.sendPhoto(groupChat, link);
    })
}