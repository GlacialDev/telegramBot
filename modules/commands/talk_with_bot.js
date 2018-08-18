import bot from '../../variables'
import authCheck from '../functions/authCheck'
import talk from '../functions/talk'

// говорить с ботом

export default function talk_with_bot() {
    bot.onText(/!бот, (.+)/, (msg, match) => {
        if (authCheck(msg) != true) return

        let text = match[1];
        let id = msg.chat.id;
        talk(text, id);
    });
}