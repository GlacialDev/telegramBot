import variables from '../variables/variables'
import authCheck from '../functions/authCheck'
import poll from '../objects/poll'

let bot = variables.bot

export default function make_poll() {
    bot.onText(/\/make_poll (.+) - ответы - (.+)/, (msg, match) => {
        if (authCheck(msg) != true) return

        let question = match[1]
        let answers = match[2].split('/')
        console.log(question + ' makepoll() after command')
        console.log(answers + ' makepoll() after command')

        let pollObj = new poll(question, answers)
        pollObj.make_poll(msg)
    })
}