import variables from '../variables/variables'
import authCheck from '../functions/authCheck'
import uploader from '../objects/uploader'

let bot = variables.bot
let U = new uploader

export default function convert() {
    bot.onText(/\/convert to (.+)/, (msg, match) => {
        if (authCheck(msg) != true) return

        U.upload(msg).then(
            () => {
                bot.sendMessage(msg.chat.id, 'Файл успешно загружен.')
                U.convert(msg, match)
            },
            () => bot.sendMessage(msg.chat.id, 'Файл не загрузился, какая-то ошибка.')
        )
    });
}