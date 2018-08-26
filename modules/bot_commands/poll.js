import variables from '../variables/variables'
import authCheck from '../functions/authCheck'
import pollManager from '../objects/pollManager'

let bot = variables.bot

export default function poll() {
    bot.onText(/\/poll (.+) - (.+)/, (msg, match) => {
        if (authCheck(msg) != true) return

        pollManager.createPoll(msg, match)
    })
}