// import { bot, fs, downloadEnabledFlag, setDownloadFlag } from '../../variables'
import adminCheck from '../functions/adminCheck'
import authCheck from '../functions/authCheck'

export default function download(bot, fs) {
    // позволяет загрузить файл на сервер
    bot.onText(/\/download$/, (msg) => {
        if (authCheck(msg) != true || downloadEnabledFlag != 'enabled') return

        bot.sendMessage(msg.chat.id, 'Готов загрузить файл на сервер')

        return new Promise((resolve, reject) => {
            bot.on('document', (msg) => {
                let name = msg.document.file_name
                let responseText
                let errorText

                let filePath = bot.downloadFile(msg.document.file_id, './download/').then(
                    (filePath) => {
                        fs.rename(filePath, './download/' + name, (error, data) => {
                            if (error) throw error; // если возникла ошибка
                        })
                        responseText = 'Файл успешно загружен.'
                        resolve(responseText)
                    },
                    (e) => {
                        errorText = 'Файл не загрузился, какая-то ошибка.'
                        console.log(e)
                        reject(errorText)
                    })
            })
        }).then(
            (responseText) => bot.sendMessage(msg.chat.id, responseText),
            (errorText) => bot.sendMessage(msg.chat.id, errorText)
        )
    })

    // включение и отключение возможности загрузки файлов
    bot.onText(/\/download_(enabled|disabled)/, (msg, match) => {
        if (adminCheck(msg) != true) {
            bot.sendMessage(msg.chat.id, 'Только для посвященных')
            return
        }

        let response = ''
        setDownloadFlag(match[1])
        console.log(downloadEnabledFlag+' enabler-disabler')

        switch (downloadEnabledFlag) {
            case 'enabled': response = 'Загрузка файлов разрешена'; break
            case 'disabled': response = 'Загрузка файлов запрещена'; break
        }
        bot.sendMessage(msg.chat.id, response)
    })
}