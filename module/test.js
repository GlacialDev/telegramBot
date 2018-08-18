export default function echo(telegramBot) {
    console.log('meow')
    telegramBot.onText(/\/echo (.+)/, (msg, match) => {
        // if (authCheck(msg) != true) return
        console.log(msg)
        console.log('meow')
        let text = match[1];
        bot.sendMessage(msg.chat.id, text);
      });
} 