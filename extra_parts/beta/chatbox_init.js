import variables from '../../modules/variables/variables'
import authCheck from '../../modules/functions/authCheck'
import chatBox from './chatBox'

let bot = variables.bot

export default function chatbox_init() {
    bot.onText(/\/chatbox_init (.+) with (.+)/, (msg, match) => {
        if (authCheck(msg) != true) return

        chatBox.init(msg, match)
        chatBox.ifAgreeAsk()

        bot.sendMessage(msg.from.id, 'Ждем согласия')
    });
}