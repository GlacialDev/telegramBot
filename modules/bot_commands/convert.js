import variables from '../variables/variables'
import authCheck from '../functions/authCheck'

let bot = variables.bot
let fs = variables.fs
let cloudconvert = variables.cloudconvert

export default function convert() {
    bot.onText(/\/convert to (.+)/, (msg, match) => {
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