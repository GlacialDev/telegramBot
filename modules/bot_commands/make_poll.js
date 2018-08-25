import variables from '../variables/variables'
import authCheck from '../functions/authCheck'
import pollManager from '../objects/pollManager'

let bot = variables.bot

export default function make_poll() {
    bot.onText(/\/make_poll (.+) - ответы - (.+)/, (msg, match) => {
        if (authCheck(msg) != true) return

        pollManager.createPoll(msg, match)
    })
}