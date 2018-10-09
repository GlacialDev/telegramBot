import variables from '../variables/variables'
import authCheck from '../functions/authCheck'
import speechFromText from '../functions/speechFromText'

let bot = variables.bot

export default function bot_say() {
    bot.onText(/!скажи (.+)/, (msg, match) => {
        if (authCheck(msg) != true) return

        let text = match[1];
        console.log(text+' in bot_say')     
        speechFromText(text).then((   ) => {
            bot.sendMessage(msg.chat.id, 'zapisal')
            // bot.sendVoice(msg.chat.id, path)
        })
    });
} 