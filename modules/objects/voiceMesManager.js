import variables from '../variables/variables'
import config from '../secret/config'
import ffMpegAudioProcess from '../functions/ffMpegAudioProcess'

let bot = variables.bot
let fs = variables.fs
let yandexSpeech = variables.yandexSpeech

let voiceMesManager = {
  speaker: 'oksana',
  emotion: 'good',  
  speechConvert: (msg, match) => {
    let name = msg.from.first_name
    // грузим голосовое сообщение
    let filePath = bot.downloadFile(msg.voice.file_id, './data/download/voice/').then(
      (filePath) => {
        // делим путь
        let regExpList = filePath.split(/\\/)
        // вытягиваем имя файла
        let inputFileName = regExpList[regExpList.length - 1]
        // делим по точке на
        let regExpFormat = inputFileName.split(/\./)
        // расширение 
        let inputFormat = regExpFormat[regExpFormat.length - 1]
        // название
        let inputName = regExpFormat[regExpFormat.length - 2]
        // указываем необходимый формат
        let outputFormat = 'mp3'
        // получаем имя выходного файла
        let outputFileName = 'output_' + inputName + '.' + outputFormat

        ffMpegAudioProcess(inputFileName, outputFileName).then(() => {
          // передаем яндексу на расшифровку
          yandexSpeech.ASR({
            developer_key: config.yandexSpeechKitKey,
            file: `./data/download/voice/${outputFileName}`,
            filetype: 'audio/x-mpeg-3'
          }, function (err, httpResponse, xml) {
            if (err) {
              console.log(err);
            } else {
              let variantsList = xml.split(/<variant confidence="\d+.?\d+">(.+)<\/variant>/)
              // console.log(variantsList[0])
              let textFromSpeechList = variantsList[0].split(/>(.+)</)
              // console.log(textFromSpeechList)
              bot.sendMessage(msg.chat.id, name + ' говорит: ' + textFromSpeechList[1])
            }
          })
        }).then(() => {
          fs.unlink(`./data/download/voice/${inputFileName}`, (err) => {
            if (err) throw err;
            console.log(inputFileName + " deleted");
          });
          fs.unlink(`./data/download/voice/${outputFileName}`, (err) => {
            if (err) throw err;
            console.log(outputFileName + " deleted");
          });
        })
      }
    )
  },
  speechFromText: (text) => {
    return new Promise((resolve, reject) => {
      yandexSpeech.TTS({
        developer_key: config.yandexSpeechKitKey,
        text: text,
        speaker: voiceMesManager.speaker,
        emotion: voiceMesManager.emotion,
        file: './data/download/voice/botVoice.mp3'
      }, () => {
        resolve('./data/download/voice/botVoice.mp3')
      })
    }).catch((e) => {console.log(e)});
  }
}

export default voiceMesManager