import variables from '../variables/variables'
import authCheck from '../functions/authCheck'
import chatBox from '../objects/chatBox'

let bot = variables.bot

export default function chatbox_end() {
    bot.onText(/\/chatbox_end/, (msg) => {
        if (authCheck(msg) != true) return

        chatBox.reset()
    });
}