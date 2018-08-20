import variables from '../variables/variables'
import authCheck from '../functions/authCheck'

let bot = variables.bot

export default function echo() {
    bot.onText(/\/echo (.+)/, (msg, match) => {
        if (authCheck(msg) != true) return

        let text = match[1];
        bot.sendMessage(msg.chat.id, text);
    });
} 