import variables from '../variables/variables'
import authCheck from '../functions/authCheck'
import symbolStringGenerator from '../functions/symbolStringGenerator'
import poll from '../objects/poll'

let bot = variables.bot

export default function make_poll() {
    let pollStore = []

    bot.onText(/\/make_poll (.+) - ответы - (.+)/, (msg, match) => {
        if (authCheck(msg) != true) return

        let title = match[1]
        let answers = match[2].split('/')
        let id = symbolStringGenerator(15)

        let pollObject = new poll(title, answers, id)

        pollStore.push([id, pollObject])

        pollObject.make_poll(msg)
    })

    bot.on('callback_query', function (msg) {
        let data = msg.data.split('_')
        let id = data[0]
        let answerNumber = data[1]
        console.log(data)

        let clickedPoll
        for (let i = 0; i < pollStore.length; i++) {
            console.log(pollstore)
        }
        
    })
}