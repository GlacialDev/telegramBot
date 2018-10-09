import variables from '../variables/variables'
import authCheck from '../functions/authCheck'
import speechFromText from '../functions/speechFromText'

let bot = variables.bot

export default function bot_say() {
    bot.onText(/!скажи (.+)/, (msg, match) => {
        if (authCheck(msg) != true) return

        let text = match[1];
        let speaker = ['jane', 'oksana', 'alyss', 'omazh', 'zahar', 'ermil']
    
        // let min = 0
        // let max = speaker.length - 1
        // let roll = Math.random() * (max - min) + min
        // let roundRoll = Math.round(roll)

        speechFromText(text, speaker[2]).then((path) => {
            bot.sendVoice(msg.chat.id, path)
        })

        // speechFromText(text, speaker[0]).then((path) => {
        //     bot.sendVoice(msg.chat.id, path)
        // })
    });
} 