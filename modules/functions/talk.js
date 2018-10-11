import variables from '../variables/variables'
import voiceMesManager from '../objects/voiceMesManager'

let dialogflow = variables.dialogflow
let bot = variables.bot

export default function talk(text, id) {
  let talkRequest = dialogflow.textRequest(text, {
    sessionId: 'Canadian_bot_talk_to_you'
  });

  talkRequest.on('response', function (response) {
    let answer = response.result.fulfillment.speech
    if (answer == '') {
      // если ответа нету
      if (variables.dialogflow_textMode) {
          bot.sendMessage(id, 'Я не знаю, что тебе на это ответить.');
        } else {
          voiceMesManager.speechFromText('Я не знаю, что тебе на это ответить.').then((path) => {
            bot.sendVoice(id, path)
          })
        }
    } else {
      // если ответ есть, проверка на то, как надо ответить - голосом или текстом
      if (variables.dialogflow_textMode) {
        bot.sendMessage(id, answer);
      } else {
        voiceMesManager.speechFromText(answer).then((path) => {
          bot.sendVoice(id, path)
        })
      }
    }
  });

  talkRequest.on('error', function (error) {
    if (error) bot.sendMessage(id, 'Я не могу тебе ответить по техническим причинам.');
    console.log(error);
  });

  talkRequest.end();
}
