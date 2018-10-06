import variables from '../variables/variables'

let https = variables.https
let bot = variables.bot
let fs = variables.fs

let speechListener = {
    voice: (msg) => {
        return new Promise((resolve, reject) => {
            let filePath = bot.downloadFile(msg.voice.file_id, './data/download/voice/').then(
                (filePath) => {
                    let options = {
                        method: 'POST',
                        host: 'asr.yandex.net',
                        contentType: msg.voice.mime_type,
                        transferEncoding: 'chunked',
                        data: ''
                    };

                    fs.createReadStream('./data/download/voice/yandexSpeech.oga')
                        .pipe(fs.createWriteStream(options.data, {encoding: 'base64'}))
                        .on('finish', () => {
                            console.log(options.data)
                            resolve(options)
                        })
                        .on('error', (error) => {
                            if (error) console.log(error)
                        })
                },
                (e) => {
                    reject(e)
                }
            )
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
        })
    }
}

export default speechListener