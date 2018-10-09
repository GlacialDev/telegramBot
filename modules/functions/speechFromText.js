import variables from '../variables/variables'
import config from '../secret/config'

let yandexSpeech = variables.yandexSpeech

export default function speechFromText(text, speaker) {
  return new Promise((resolve, reject) => {
    yandexSpeech.TTS({
      developer_key: config.yandexSpeechKitKey,
      text: text,
      speaker: speaker,
      file: './data/download/voice/botVoice.mp3'
    }, () => {
      resolve('./data/download/voice/botVoice.mp3')
    })
  }).catch((e) => {console.log(e)});
}