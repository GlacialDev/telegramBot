import variables from '../variables/variables'
import authCheck from '../functions/authCheck'
import uploader from '../objects/uploader'

let bot = variables.bot

export default function convert() {
    bot.onText(/\/convert_to (.+)/, (msg, match) => {
        if (authCheck(msg) != true) return

        uploader.upload(msg).then(
            () => {
                bot.sendMessage(msg.chat.id, 'Файл успешно загружен.')
                uploader.convert(msg, match)
            },
            () => bot.sendMessage(msg.chat.id, 'Файл не загрузился, какая-то ошибка.')
        )
    });
}