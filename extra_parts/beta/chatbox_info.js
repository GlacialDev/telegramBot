import variables from '../../modules/variables/variables'
import authCheck from '../../modules/functions/authCheck'
import chatBox from './chatBox'

let bot = variables.bot

export default function chatbox_info() {
    bot.onText(/\/chatbox_info/, (msg) => {
        if (authCheck(msg) != true) return

        chatBox.info()
    });
}