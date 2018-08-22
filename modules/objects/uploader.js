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
                        resolve()
                    },
                    (e) => {
                        console.log(e)
                        reject()
                    })
            })
        })
    },
    convert: (msg, match) => {
        let inputfileName = uploader.fileName
        let regExpList = inputfileName.split(/\./)
        console.log(regExpList)
        let inputName = ''
        for (let i = 0; i < regExpList.length-1; i++) {
            inputName = inputName+regExpList[i]+'.'
        }
        console.log(inputName)
        let inputFormat = regExpList[regExpList.length-1]
        console.log(inputFormat)
        let outputFormat = match[1]
        console.log(outputFormat)
        let outputFileName = inputName + outputFormat
        console.log(outputFileName)

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