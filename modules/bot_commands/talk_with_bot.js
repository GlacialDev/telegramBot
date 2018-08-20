import variables from '../variables/variables'
import authCheck from '../functions/authCheck'

let bot = variables.bot
let dialogflow = variables.dialogflow

// говорить с ботом

export default function talk_with_bot() {
    bot.onText(/!бот, (.+)/, (msg, match) => {
        if (authCheck(msg) != true) return

        let text = match[1];
        let id = msg.chat.id;
        talk(text, id);
    });
}

let talk = function (text, id) {
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