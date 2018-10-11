import variables from '../variables/variables'
import adminCheck from '../functions/adminCheck'
import voiceMesManager from '../objects/voiceMesManager'

let bot = variables.bot

export default function bot_speech_emotion() {
  bot.onText(/speech_emotion (.+)/, (msg, match) => {
    if (adminCheck(msg) != true) return

    let set_speaker = match[1];

    switch (set_speaker) {
      case 'good':
        voiceMesManager.speaker = 'good'
        break;
      case 'evil':
        voiceMesManager.speaker = 'evil'
        break;
      case 'neutral':
        voiceMesManager.speaker = 'neutral'
        break;
      default:
        voiceMesManager.speaker = 'good'
        break;
    }

    bot.sendMessage(msg.chat.id, 'Буду разговаривать с эмоцией ' + voiceMesManager.emotion)
  });
} 