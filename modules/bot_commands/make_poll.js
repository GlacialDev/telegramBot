import variables from '../variables/variables'
import authCheck from '../functions/authCheck'
import symbolStringGenerator from '../functions/symbolStringGenerator'
import poll from '../objects/poll'
import pollManager from '../objects/pollManager'

let bot = variables.bot

export default function make_poll() {
    bot.onText(/\/make_poll (.+) - ответы - (.+)/, (msg, match) => {
        if (authCheck(msg) != true) return

        pollManager.createPoll(msg, match)
    })

    bot.on('callback_query', function (msg) {
        let data = msg.data.split('_')
        if(data[0] == 'poll') pollManager.updatePoll(msg, data)
    })
}