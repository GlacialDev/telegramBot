import variables from '../variables/variables'
import uploader from '../objects/uploader'
import adminCheck from '../functions/adminCheck'

let bot = variables.bot

export default function upload_en_dis() {
    // включение и отключение возможности загрузки файлов
    bot.onText(/\/upload_(enabled|disabled)/, (msg, match) => {
        if (adminCheck(msg) != true) {
            bot.sendMessage(msg.chat.id, 'Только для посвященных')
            return
        }

        uploader.setFlag(msg, match)
    })
}