import variables from '../variables/variables'
import config from '../secret/config'

let bot = variables.bot
let fs = variables.fs
let cloudconvert = variables.cloudconvert
let yandexSpeech = variables.yandexSpeech

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
        if (uploader.flag != 'enabled') {
            bot.sendMessage(msg.chat.id, 'Загрузка файлов запрещена')
            return
        }
        bot.sendMessage(msg.chat.id, 'Готов загрузить файл на сервер')

        return new Promise((resolve, reject) => {
            bot.on('document', (msg) => {
                uploader.fileName = msg.document.file_name

                let filePath = bot.downloadFile(msg.document.file_id, './data/download/').then(
                    (filePath) => {
                        fs.rename(filePath, './data/download/' + uploader.fileName, (error, data) => {
                            if (error && error.code != 'ENOENT') {
                                console.log(error)
                                reject()
                            }; // если возникла ошибка
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
        // делим по точкам имя файла (чтобы затем отсечь формат от названия)
        let regExpList = inputfileName.split(/\./)
        let inputName = ''
        // вся эта штука с циклом нужна для того чтобы корректно обработать имя файла с несколькими точками
        // one.two.three.txt будет корректно переименовываться скажем в one.two.three.pdf
        for (let i = 0; i < regExpList.length - 1; i++) {
            inputName = inputName + regExpList[i] + '.'
        }
        let inputFormat = regExpList[regExpList.length - 1]
        let outputFormat = match[1]
        let outputFileName = inputName + outputFormat

        bot.sendMessage(msg.chat.id, 'Приступаю к конвертированию, придется немного подождать')
        fs.createReadStream('./data/download/' + inputfileName)
            .pipe(cloudconvert.convert({
                inputformat: inputFormat,
                outputformat: outputFormat
            }))
            .pipe(fs.createWriteStream('./data/converted/' + outputFileName))
            .on('finish', function () {
                bot.sendDocument(msg.chat.id, './data/converted/' + outputFileName)
                inputfileName = ''
            })
            .on('error', function (error) {
                if (error) console.log(error)
                bot.sendMessage(msg.chat.id, 'Случилась какая-то ошибка. Вероятнее всего, кончилось время конвертации')
            })
    },
    speechConvert: (msg, match) => {
        // грузим голосовое сообщение
        let filePath = bot.downloadFile(msg.voice.file_id, './data/download/voice/').then(
            (filePath) => {
                // делим по точкам имя файла (чтобы затем отсечь формат от названия)
                let regExpList = filePath.split(/\\/)
                let inputName = regExpList[regExpList.length - 1]
                let regExpFormat = inputName.split(/\./)
                let inputFormat = regExpFormat[regExpFormat.length - 1]
                let inputFileName = regExpFormat[regExpFormat.length - 2]
                let outputFormat = 'mp3'
                let outputFileName = inputFileName+'.'+outputFormat
                // конвертируем его в mp3
                fs.createReadStream(filePath)
                    .pipe(cloudconvert.convert({
                        inputformat: inputFormat,
                        outputformat: outputFormat
                    }))
                    .pipe(fs.createWriteStream('./data/download/voice/' + outputFileName))
                    .on('finish', function () {
                        // передаем яндексу на расшифровку
                        yandexSpeech.ASR({
                            developer_key: config.yandexSpeechKitKey,  
                            file: `./data/download/voice/${outputFileName}`,
                            filetype: 'audio/x-mpeg-3'  
                        }, function (err, httpResponse, xml) {
                            if (err) {
                                console.log(err);
                            } else {
                                let variantsList = xml.split(/<variant confidence="\d+.?\d+">(.+)<\/variant>/)
                                console.log(variantsList[0])
                                let textFromSpeechList = variantsList[0].split(/>(.+)</)
                                console.log(textFromSpeechList[0])
                                // bot.sendMessage(msg.chat.id, textFromSpeechList[0])
                            }
                        });
                    })
                    .on('error', function (error) {
                        if (error) console.log(error)
                        bot.sendMessage(msg.chat.id, 'Случилась какая-то ошибка. Вероятнее всего, кончилось время конвертации')
                    })
            }
        )
    }
}

export default uploader