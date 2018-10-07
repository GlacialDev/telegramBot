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

                fs.createReadStream(filePath)
                    .pipe(cloudconvert.convert({
                        inputformat: inputFormat,
                        outputformat: outputFormat
                    }))
                    .pipe(fs.createWriteStream('./data/download/voice/' + outputFileName))
                    .on('finish', function () {
                        bot.sendMessage(msg.chat.id, `./data/download/voice/${outputFileName}`)

                        yandexSpeech.ASR({
                            developer_key: config.yandexSpeechKitKey,  //get in Yandex Developer Center
                            file: `./data/download/voice/${outputFileName}`, //check format
                            filetype: 'audio/x-mpeg-3'  // ['audio/x-speex', 'audio/x-pcm;bit=16;rate=8000', 'audio/x-pcm;bit=16;rate=16000', 'audio/x-alaw;bit=13;rate=8000', 'audio/x-wav', 'audio/x-mpeg-3']
                        }, function (err, httpResponse, xml) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(httpResponse.statusCode, xml)
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