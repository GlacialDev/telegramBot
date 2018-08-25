import variables from '../variables/variables'
import authCheck from '../functions/authCheck'
import symbolStringGenerator from '../functions/symbolStringGenerator'
import poll from '../objects/poll'

let bot = variables.bot

export default function make_poll() {
    bot.onText(/\/make_poll (.+) - ответы - (.+)/, (msg, match) => {
        if (authCheck(msg) != true) return

        let question = match[1]
        let answers = match[2].split('/')

        new poll(question, answers, symbolStringGenerator(15)).make_poll(msg)
    })
}