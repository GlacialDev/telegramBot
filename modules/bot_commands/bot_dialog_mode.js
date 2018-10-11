import variables from '../variables/variables'
import adminCheck from '../functions/adminCheck'

let bot = variables.bot

export default function bot_dialog_mode() {
  // включение и отключение возможности загрузки файлов
  bot.onText(/\/bot_dialog_mode (true|false)/, (msg, match) => {
    if (adminCheck(msg) != true) return

    let set_mode = match[1];

    switch (set_mode) {
      case 'true':
        variables.dialogflow_voiceConvMode = true
        bot.sendMessage(msg.chat.id, 'Буду отвечать в ответ на ваши голосовые')
        break;
      case 'false':
        variables.dialogflow_voiceConvMode = false
        bot.sendMessage(msg.chat.id, 'Буду переводить ваши голосовые в текст')
        break;
      default:
        variables.dialogflow_voiceConvMode = false
        bot.sendMessage(msg.chat.id, 'Буду переводить ваши голосовые в текст')
        break;
    }
  })
}