import { bot, dialogflow } from '../../variables'

// dialogflow и гугл нейросети, которые говорят с тобой!

export default function talk(text, id) {
    let talkRequest = dialogflow.textRequest(text, {
      sessionId: 'Canadian_bot_talk_to_you'
    });
  
    talkRequest.on('response', function (response) {
      let answer = response.result.fulfillment.speech
      if (answer == '') bot.sendMessage(id, 'Я не знаю, что тебе на это ответить.');
      bot.sendMessage(id, answer);
    });
  
    talkRequest.on('error', function (error) {
      if (error) bot.sendMessage(id, 'Я не могу тебе ответить по техническим причинам.');
      console.log(error);
    });
  
    talkRequest.end();
  }