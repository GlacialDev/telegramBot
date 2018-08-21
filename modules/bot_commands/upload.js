import variables from '../variables/variables'
import authCheck from '../functions/authCheck'
import uploader from '../objects/uploader'

let bot = variables.bot

export default function upload() {
    // позволяет загрузить файл на сервер
    bot.onText(/\/upload$/, (msg) => {
        if (authCheck(msg) != true || uploader.flag != 'enabled') return

        uploader.upload(msg)
    })
}