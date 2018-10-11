import variables from '../variables/variables'
import adminCheck from '../functions/adminCheck'
import voiceMesManager from '../objects/voiceMesManager'

let bot = variables.bot

export default function bot_speech_emotion() {
  bot.onText(/speech_emotion (.+)/, (msg, match) => {
    if (adminCheck(msg) != true) return

    let set_emotion = match[1];

    switch (set_emotion) {
      case 'evil':
        voiceMesManager.emotion = 'evil'
        break;
      case 'good':
        voiceMesManager.emotion = 'good'
        break;
      case 'neutral':
        voiceMesManager.emotion = 'neutral'
        break;
      default:
        voiceMesManager.emotion = 'good'
        break;
    }

    bot.sendMessage(msg.chat.id, 'Буду разговаривать с эмоцией ' + voiceMesManager.emotion)
  });
} 