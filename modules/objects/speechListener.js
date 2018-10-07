import variables from '../variables/variables'
import config from '../secret/config'

let bot = variables.bot
let yandexSpeech = variables.yandexSpeech

let speechListener = {
    voice: (msg) => {
        let path = uploader.speechConvert(msg)

        yandexSpeech.ASR({
            developer_key: config.yandexSpeechKitKey,  //get in Yandex Developer Center
            file: path, //check format
            filetype: 'audio/x-mpeg-3'  // ['audio/x-speex', 'audio/x-pcm;bit=16;rate=8000', 'audio/x-pcm;bit=16;rate=16000', 'audio/x-alaw;bit=13;rate=8000', 'audio/x-wav', 'audio/x-mpeg-3']
        }, function (err, httpResponse, xml) {
            if (err) {
                console.log(err);
            } else {
                console.log(httpResponse.statusCode, xml)
            }
        }
        );
    }
}

export default speechListener