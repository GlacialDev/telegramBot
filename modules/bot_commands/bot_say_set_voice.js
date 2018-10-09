import variables from '../variables/variables'
import adminCheck from '../functions/adminCheck'

let bot = variables.bot

export default function bot_say() {
  bot.onText(/set_voice (.+)/, (msg, match) => {
    if (adminCheck(msg) != true) return

    let speaker = match[1];

    switch (speaker) {
      case 'jane':
        variables.yandexSpeaker = 'jane'
        break;
      case 'oksana':
        variables.yandexSpeaker = 'oksana'
        break;
      case 'alyss':
        variables.yandexSpeaker = 'alyss'
        break;
      case 'omazh':
        variables.yandexSpeaker = 'omazh'
        break;
      case 'zahar':
        variables.yandexSpeaker = 'zahar'
        break;
      case 'ermil':
        variables.yandexSpeaker = 'ermil'
        break;
      default:
        variables.yandexSpeaker = 'oksana'
        break;
    }

    bot.sendMessage(msg.chat.id, 'Буду разговаривать голосом '+speaker)
  });
} 