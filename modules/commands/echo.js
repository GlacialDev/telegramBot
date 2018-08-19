import authCheck from '../functions/authCheck'

export default function echo(bot) {
    bot.onText(/\/echo (.+)/, (msg, match) => {
        if (authCheck(msg) != true) return

        let text = match[1];
        bot.sendMessage(msg.chat.id, text);
    });
} 