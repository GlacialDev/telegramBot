import variables from '../variables/variables'

let bot = variables.bot

export default function id() {
    bot.onText(/\/id/, (msg) => {      
        bot.sendMessage(msg.chat.id, msg.chat.id + ' - id этого чата');
        bot.sendMessage(msg.chat.id, msg.from.id + ' - а это ваш id');
      })
} 