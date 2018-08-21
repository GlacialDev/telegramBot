import variables from '../variables/variables'
import downloader from '../objects/downloader'
import adminCheck from '../functions/adminCheck'

let bot = variables.bot

export default function download_en_dis() {
    // включение и отключение возможности загрузки файлов
    bot.onText(/\/download_(enabled|disabled)/, (msg, match) => {
        if (adminCheck(msg) != true) {
            bot.sendMessage(msg.chat.id, 'Только для посвященных')
            return
        }

        downloader.setFlag(msg, match)
    })
}