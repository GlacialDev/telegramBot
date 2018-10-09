import variables from '../variables/variables'
import config from '../secret/config'

let yandexSpeech = variables.yandexSpeech

export default function speechFromText(text) {
  return new Promise((resolve, reject) => {
    yandexSpeech.TTS({
      developer_key: config.yandexSpeechKitKey,
      text: text,
      file: './data/download/voice/botVoice.mp3'
    }, () => {
      console.log('done')
      resolve()
    });
  })
}