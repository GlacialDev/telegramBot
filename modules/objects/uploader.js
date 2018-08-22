import variables from '../variables/variables'

let bot = variables.bot
let fs = variables.fs
let cloudconvert = variables.cloudconvert

let uploader = {
    flag: 'enabled',
    fileName: '',
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
                uploader.fileName = msg.document.file_name

                let filePath = bot.downloadFile(msg.document.file_id, './data/download/').then(
                    (filePath) => {
                        fs.rename(filePath, './data/download/' + uploader.fileName, (error, data) => {
                            if (error) throw error; // если возникла ошибка
                        })
                        resolve(uploader.fileName)
                    },
                    (e) => {
                        console.log(e)
                        reject(uploader.fileName)
                    })
            })
        })
    },
    convert: (msg, match) => {
        let inputfileName = uploader.fileName
        let regExpList = inputfileName.split(/(.+)\.(.+)/)
        let inputName = regExpList[0]
        let inputFormat = regExpList[1]
        let outputFormat = match[1]
        let outputFileName = inputName + '.' + outputFormat

        bot.sendMessage(msg.chat.id, 'Приступаю к конвертированию, придется немного подождать')
        fs.createReadStream('./data/download/' + inputfileName)
        .pipe(cloudconvert.convert({
            inputformat: inputFormat,
            outputformat: outputFormat
        }))
        .pipe(fs.createWriteStream('./data/converted/' + outputFileName))
        .on('finish', function () {
            bot.sendDocument(msg.chat.id, './data/converted/' + outputFileName)
        })
        .on('error', function () {
            bot.sendMessage(msg.chat.id, 'Случилась какая-то ошибка. Конвертировать не удалось =/')
        })
    }
}

export default uploader