import bot from '../variables/variables'
import authCheck from '../functions/authCheck'

export default function send_to() {
    bot.onText(/\/sendto (\-[0-9]+|[0-9]+) (\S+.*)/, (msg, match) => {
        if (authCheck(msg) != true) return

        let id = match[1];
        let text = match[2];
        bot.sendMessage(id, text);
    })
}