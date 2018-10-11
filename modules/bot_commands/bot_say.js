import variables from '../variables/variables'
import authCheck from '../functions/authCheck'
import voiceMesManager from '../objects/voiceMesManager'

let bot = variables.bot

export default function bot_say() {
    bot.onText(/!скажи (.+)/, (msg, match) => {
        if (authCheck(msg) != true) return

        let text = match[1];

        voiceMesManager.speechFromText(text).then((path) => {
            bot.sendVoice(msg.chat.id, path)
        })
    });
} 