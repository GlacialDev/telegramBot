import variables from '../variables/variables'

let yandexSpeech = variables.yandexSpeech

export default function speechFromText(text) {
  return new Promise((resolve, reject) => {
    console.log(text+' in speechFromText promise')   
    yandexSpeech.TTS({
      text: text,
      file: './data/download/voice/botVoice.mp3'
    }, () => {
      resolve('./data/download/voice/botVoice.mp3')
    });
  })
}