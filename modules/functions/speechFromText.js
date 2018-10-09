import variables from '../variables/variables'

let yandexSpeech = variables.yandexSpeech

export default function speechFromText(text) {
  return new Promise((resolve, reject) => {
    yandexSpeech.TTS({
      text: text,
      file: './data/download/voice/botVoice.mp3'
    }, () => {
      resolve('./data/download/voice/botVoice.mp3')
    });
  })
}