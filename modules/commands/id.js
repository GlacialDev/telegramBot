import authCheck from '../functions/authCheck'

export default function id(bot) {
    bot.onText(/\/id/, (msg) => {
        if (authCheck(msg) != true) return
      
        bot.sendMessage(msg.chat.id, msg.chat.id + ' - id этого чата');
        bot.sendMessage(msg.chat.id, msg.from.id + ' - а это ваш id');
      })
} 