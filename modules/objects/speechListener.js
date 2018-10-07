import variables from '../variables/variables'
import config from '../secret/config'
import symbolStringGenerator from '../functions/symbolStringGenerator'

let https = variables.https
let bot = variables.bot
let fs = variables.fs

let speechListener = {
    voice: (msg) => {
        let uuid = symbolStringGenerator(32)
        let fileName = ''
        let file = bot.getFile(msg.voice.file_id)
            .then(
                (file) => {
                    fileName = file.file_path.substring(file.file_path.lastIndexOf('/') + 1)
                    // console.log(fileName)
                })
            .catch((error) => {
                console.log(error)
            })
        let filePath = bot.downloadFile(msg.voice.file_id, './data/download/voice/')
            .then(
                (filePath) => {
                    return new Promise((resolve, reject) => {
                        fs.readFile(filePath, (error, data) => {
                            if (error && error.code != 'ENOENT') {
                                console.log(error)
                                reject()
                            }; // если возникла ошибка
                            console.log(data)
                            resolve(data)
                        })
                    })
                })
            .then(
                (data) => {
                    bot.sendMessage(msg.chat.id, `Имя файла: ${fileName};\nСодержимое файла: ${data}`)
                    console.log(data)
                })
            .catch((error) => {
                console.log(error)
            })
        // .then( )
        // let post_options = {
        //     method: 'POST',
        //     host: 'asr.yandex.net',
        //     path: `/asr_xml?uuid=${uuid}&key=${config.yandexSpeechKitKey}&topic=queries&lang=ru-RU&disableAntimat=true`,
        //     headers: {
        //         'Content-Type': 'audio/x-wav'
        //     }
        // }

        // let post_req = https.request(post_options, function (res) {
        //     res.setEncoding('utf8');
        //     res.on('data', function (chunk) {
        //         console.log('Response: ' + chunk);
        //     });
        // });    
        // })
        // },
        // )
        // .then(
        //     (options) => {
        //         // let req = https.request(options, function (res) {
        //         //     console.log(res);
        //         // });
        //         // req.end();

        //         // req.on('error', function (e) {
        //         //     console.error(e);
        //         // });
        //         console.log(options)
        //     },
        //     (e) => console.log(e)
        // )
        // })
    }
}

export default speechListener