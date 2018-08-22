import variables from '../variables/variables'

let bot = variables.bot
let fs = variables.fs

let uploader = {
    flag: 'enabled',
    setFlag: (msg, match) => {
        uploader.flag = match[1]
        
        let response = ''

        switch (uploader.flag) {
            case 'enabled': response = 'Загрузка файлов разрешена'; break
            case 'disabled': response = 'Загрузка файлов запрещена'; break
        }
        bot.sendMessage(msg.chat.id, response)
    },
    upload: (msg) => {
        bot.sendMessage(msg.chat.id, 'Готов загрузить файл на сервер')

        return new Promise((resolve, reject) => {
            bot.on('document', (msg) => {
                let filename = msg.document.file_name
                let responseText
                let errorText

                let filePath = bot.downloadFile(msg.document.file_id, './data/download/').then(
                    (filePath) => {
                        fs.rename(filePath, './data/download/' + filename, (error, data) => {
                            if (error) throw error; // если возникла ошибка
                        })
                        responseText = 'Файл успешно загружен.'
                        resolve(responseText, filename)
                    },
                    (e) => {
                        errorText = 'Файл не загрузился, какая-то ошибка.'
                        console.log(e)
                        reject(errorText)
                    })
            })
        })
    },
    convert_to: (msg, match) => {
        
    }
}

export default uploader