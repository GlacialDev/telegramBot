import variables from '../variables/variables'
import adminCheck from '../functions/adminCheck'
import voiceMesManager from '../objects/voiceMesManager'

let bot = variables.bot

export default function bot_speech_voice() {
  bot.onText(/speech_voice (.+)/, (msg, match) => {
    if (adminCheck(msg) != true) return

    let set_speaker = match[1];

    switch (set_speaker) {
      case 'jane':
        voiceMesManager.speaker = 'jane'
        break;
      case 'oksana':
        voiceMesManager.speaker = 'oksana'
        break;
      case 'alyss':
        voiceMesManager.speaker = 'alyss'
        break;
      case 'omazh':
        voiceMesManager.speaker = 'omazh'
        break;
      case 'zahar':
        voiceMesManager.speaker = 'zahar'
        break;
      case 'ermil':
        voiceMesManager.speaker = 'ermil'
        break;
      default:
        voiceMesManager.speaker = 'oksana'
        break;
    }

    bot.sendMessage(msg.chat.id, 'Буду разговаривать голосом ' + voiceMesManager.speaker)
  });
} 