export default function echo(bot) {
    bot.onText(/\/echo (.+)/, (msg, match) => {
        if (authCheck(msg) != true) return
        console.log(msg)
        let text = match[1];
        bot.sendMessage(msg.chat.id, text);
      });
} 