export default function echo(telegramBot) {
    telegramBot.onText(/\/echo (.+)/, (msg, match) => {
        // if (authCheck(msg) != true) return
      
        let text = match[1];
        bot.sendMessage(msg.chat.id, text);
      });
} 