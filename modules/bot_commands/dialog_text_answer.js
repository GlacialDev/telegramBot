import variables from '../variables/variables'
import adminCheck from '../functions/adminCheck'

let bot = variables.bot

export default function dialog_text_answer() {
  // включение и отключение возможности загрузки файлов
  bot.onText(/\/dialog_text_answer (true|false)/, (msg, match) => {
    if (adminCheck(msg) != true) return

    let set_mode = match[1];

    switch (set_mode) {
      case 'true':
        variables.dialogflow_textMode = true
        bot.sendMessage(msg.chat.id, 'Буду отвечать текстом')
        break;
      case 'false':
        variables.dialogflow_textMode = false
        bot.sendMessage(msg.chat.id, 'Буду отвечать голосом')
        break;
      default:
        variables.dialogflow_textMode = true
        bot.sendMessage(msg.chat.id, 'Буду отвечать текстом')
        break;
    }
  })
}