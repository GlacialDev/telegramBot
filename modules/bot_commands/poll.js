import variables from '../variables/variables'
import authCheck from '../functions/authCheck'
import pollManager from '../objects/pollManager'

let bot = variables.bot

export default function poll() {
    bot.onText(/\/poll (.+) - (.+)/, (msg, match) => {
        if (authCheck(msg) != true) return
        let title = match[1]
        let answers = match[2].split('/')

        let pollProps = pollManager.createPoll(title, answers)
        bot.sendMessage(msg.chat.id, pollProps.pollObject.title, pollProps.options)
    })
}