// import variables from '../variables/variables';
import poll from './poll'
import symbolStringGenerator from '../functions/symbolStringGenerator'

// let bot = variables.bot

let pollManager = {
    store: [],
    
    createPoll: (msg, match) => {
        let title = match[1]
        let answers = match[2].split('/')
        let id = symbolStringGenerator(15)
        let userIdList = []

        let pollObject = new poll(title, answers, id)
        pollManager.store.push([id, pollObject, userIdList])

        pollObject.make_poll(msg)
    },
    updatePoll: (msg, data) => {
        let id = data[1]
        let answerNumber = data[2]
        let userId = msg.from.id
        let clickedPoll
        let userVotes = [[],[]]

        for (let i = 0; i < pollManager.store.length; i++) {
            if (pollManager.store[i][0] == id) {
                clickedPoll = pollManager.store[i][1]
                pollUserList = pollManager.store[i][2]
                break
            }
        }

        if(userVotes[0].includes(userId)) {
            let i = userVotes[0].indexOf(userId)
            let lastAnswerNumber = userVotes[1][i]
            clickedPoll.votes[lastAnswerNumber]--
            clickedPoll.votes[answerNumber]++
        } else {
            userVotes[0].push(userId)
            userVotes[1].push(answerNumber)
            clickedPoll.votes[answerNumber]++
        }
        
        clickedPoll.update_poll(msg)
    }
}

export default pollManager