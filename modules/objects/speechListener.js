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
                    };

                    let req = https.request(options, function (res) {
                        console.log(res.statusCode);
                        res.on('data', function (d) {
                            fs.createWriteStream('./data/download/voice/yandexSpeech.oga')
                                .on('finish', function () {
                                    console.log(res)
                                })
                                .on('error', function (error) {
                                    if (error) console.log(error)
                                })
                        });
                    });
                    req.end();

                    req.on('error', function (e) {
                        console.error(e);
                    });

                    resolve('загрузил')
                },
                (e) => {
                    console.log(e)
                    reject('не загрузил')
                })
        })
    }
}

export default speechListener