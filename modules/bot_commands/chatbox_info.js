import variables from '../variables/variables'
import authCheck from '../functions/authCheck'
import chatBox from '../objects/chatBox'

let bot = variables.bot

export default function chatbox_init() {
    bot.onText(/\/chatbox_info/, (msg) => {
        if (authCheck(msg) != true) return

        chatBox.info()
    });
}