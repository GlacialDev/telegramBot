import variables from '../variables/variables'
import authCheck from '../functions/authCheck'
import symbolStringGenerator from '../functions/symbolStringGenerator'
import poll from '../objects/poll'
import pollManager from '../objects/pollManager'

let bot = variables.bot

export default function make_poll() {
    // let pollStore = []
    
    let pollManager = new pollManager

    bot.onText(/\/make_poll (.+) - ответы - (.+)/, (msg, match) => {
        if (authCheck(msg) != true) return

        let title = match[1]
        let answers = match[2].split('/')
        let id = symbolStringGenerator(15)

        // let pollObject = new poll(title, answers, id)
        // pollStore.push([id, pollObject])

        // pollObject.make_poll(msg)

        pollManager.createPoll(title, answers, id, msg)
    })

    bot.on('callback_query', function (msg) {
        let data = msg.data.split('_')
        if(data[0] == 'poll') {
            let id = data[1]
            let answerNumber = data[2]
            let clickedPoll
    
            for (let i = 0; i < pollStore.length; i++) {
                if (pollStore[i][0] == id) {
                    clickedPoll = pollStore[i][1]
                    break
                }
            }
            
            clickedPoll.votes[answerNumber]++
            clickedPoll.update_poll(msg)
        }
    })
}