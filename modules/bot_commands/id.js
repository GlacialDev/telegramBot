import variables from '../variables/variables'
import authCheck from '../functions/authCheck'

let bot = variables.bot

export default function id() {
    bot.onText(/\/id/, (msg) => {
        if (authCheck(msg) != true) return
      
        bot.sendMessage(msg.chat.id, msg.chat.id + ' - id этого чата');
        bot.sendMessage(msg.chat.id, msg.from.id + ' - а это ваш id');
      })
} 