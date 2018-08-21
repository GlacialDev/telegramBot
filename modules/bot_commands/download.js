import variables from '../variables/variables'
import authCheck from '../functions/authCheck'
import downloader from '../objects/downloader'

let bot = variables.bot

export default function download() {
    // позволяет загрузить файл на сервер
    bot.onText(/\/download$/, (msg) => {
        if (authCheck(msg) != true || downloader.flag != 'enabled') return

        downloader.download(msg)
    })
}