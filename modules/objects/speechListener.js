import variables from '../variables/variables'
import config from '../secret/config'

let https = variables.https
let bot = variables.bot
let fs = variables.fs
let yandexSpeech = variables.yandexSpeech

let speechListener = {
    voice: (msg) => {
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
                            resolve(data)
                        })
                    })
                })
            .then(
                (data) => {
                    // let post_options = {
                    //     method: 'POST',
                    //     host: 'asr.yandex.net',
                    //     path: `/asr_xml?uuid=${uuid}&key=${config.yandexSpeechKitKey}&topic=queries&lang=ru-RU&disableAntimat=true`,
                    //     headers: {
                    //         'Content-Type': 'audio/x-wav',
                    //         'Transfer-Encoding': 'chunked'
                    //     },
                    //     body: data
                    // }

                    // let post_req = https.request(post_options, (res) => {
                    //     console.log(res.body);
                    //     console.log('statusCode:', res.statusCode);
                    // });

                    // post_req.on('error', (e) => {
                    //     console.error(e.message);
                    // });
                    // post_req.end();


                    yandexSpeech.ASR({
                        developer_key: config.yandexSpeechKitKey,  //get in Yandex Developer Center
                        file: './data/download/voice/yandexSpeech.wav', //check format
                        filetype: 'audio/x-wav'  // ['audio/x-speex', 'audio/x-pcm;bit=16;rate=8000', 'audio/x-pcm;bit=16;rate=16000', 'audio/x-alaw;bit=13;rate=8000', 'audio/x-wav', 'audio/x-mpeg-3']
                    }, function (err, httpResponse, xml) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(httpResponse.statusCode, xml)
                        }
                    }
                    );
                },
            )
            .catch((error) => {
                console.log(error)
            })
    }
}

export default speechListener