import authCheck from '../functions'

export default function id(telegramBot) {
    telegramBot.onText(/\/id/, (msg) => {
        if (authCheck(msg) != true) return
      
        telegramBot.sendMessage(msg.chat.id, msg.chat.id + ' - id этого чата');
        telegramBot.sendMessage(msg.chat.id, msg.from.id + ' - а это ваш id');
      })
} 