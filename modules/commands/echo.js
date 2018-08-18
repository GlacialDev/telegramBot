import authCheck from '../functions'

export default function echo(telegramBot) {
    telegramBot.onText(/\/echo (.+)/, (msg, match) => {
        if (authCheck(msg) != true) return
        
        let text = match[1];
        telegramBot.sendMessage(msg.chat.id, text);
      });
} 