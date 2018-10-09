import variables from '../variables/variables'
import config from '../secret/config'

let yandexSpeech = variables.yandexSpeech

export default function speechFromText(text) {
  return new Promise((resolve, reject) => {
    console.log(text+' in speechFromText promise')   
    yandexSpeech.TTS({
      developer_key: config.yandexSpeechKitKey,
      text: text,
      file: './data/download/voice/botVoice.mp3'
    }, () => {
      resolve('./data/download/voice/botVoice.mp3')
    });
  })
}