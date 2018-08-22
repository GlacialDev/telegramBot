import variables from '../variables/variables'
import authCheck from '../functions/authCheck'
import chatBox from '../objects/chatBox'

let bot = variables.bot

export default function chatbox_init() {
    bot.onText(/\/chatbox_init (.+) with (.+)/, (msg, match) => {
        if (authCheck(msg) != true) return

        chatBox.init(msg, match)
        chatBox.ifAgreeAsk()

        bot.sendMessage(msg.from.id, 'Ждем согласия')
    });
}