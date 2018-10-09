import chatBox from '../objects/chatBox'
import variables from '../variables/variables'

let bot = variables.bot

export default function botTransit() {
    bot.on('message', (msg) => {
        chatBox.transitMessages(msg)
    })
}