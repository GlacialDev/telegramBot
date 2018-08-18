import bot from '../../variables'
import authCheck from '../functions/authCheck'
import passGenerator from '../functions/passGenerator'

// простенький генератор пароля

export default function pass_gen() {
    bot.onText(/\/pass_gen ([0-9]+)/, (msg, match) => {
        if (authCheck(msg) != true) return

        let length = match[1]
        let pass = passGenerator(length)
        bot.sendMessage(msg.chat.id, 'Сгенерирован пароль: ' + pass)
    });
}