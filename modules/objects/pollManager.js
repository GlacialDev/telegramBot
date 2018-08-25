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
        let userVotes = [[],[]]

        let pollObject = new poll(title, answers, id)
        pollManager.store.push([id, pollObject, userVotes])

        pollObject.make_poll(msg)
    },
    updatePoll: (msg, data) => {
        let id = data[1]
        let answerNumber = data[2]
        let userId = msg.from.id
        let clickedPoll
        let userVotes

        for (let i = 0; i < pollManager.store.length; i++) {
            if (pollManager.store[i][0] == id) {
                clickedPoll = pollManager.store[i][1]
                userVotes = pollManager.store[i][2]
                break
            }
        }

        if(userVotes[0].includes(userId)) {
            let userPos = userVotes[0].indexOf(userId)
            let lastAnswerNumber = userVotes[1][i]
            let answerPos = lastAnswerNumber.indexof(lastAnswerNumber)

            if(lastAnswerNumber == answerNumber) {
                userVotes[0].splice(userPos, 1)
                userVotes[1].splice(answerPos, 1)
                clickedPoll.votes[lastAnswerNumber]--
                console.log('клик туда же где и был голос = убрать')
                console.log(userVotes)
            } else {
                userVotes[0].splice(userPos, 1)
                userVotes[1].splice(answerPos, 1)
                clickedPoll.votes[lastAnswerNumber]--
                userVotes[0].push(userId)
                userVotes[1].push(answerNumber)
                clickedPoll.votes[answerNumber]++
                console.log('клик в другое место = поменять мнение')
                console.log(userVotes)
            }
        } else {
            userVotes[0].push(userId)
            userVotes[1].push(answerNumber)
            clickedPoll.votes[answerNumber]++
            console.log('новый клик')
            console.log(userVotes)
        }
        
        clickedPoll.update_poll(msg)
    },

    addVote: () => {
        
    }
}

export default pollManager