import variables from '../variables/variables'
import config from '../secret/config'

let https = variables.https
let bot = variables.bot
let fs = variables.fs
let yandexSpeech = variables.yandexSpeech

let speechListener = {
    voice: (msg) => {
        let filePath = bot.downloadFile(msg.voice.file_id, './data/download/voice/')
            .then(
                (filePath) => {
                    console.log(filePath)
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