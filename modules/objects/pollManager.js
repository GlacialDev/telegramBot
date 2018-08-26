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
        // если в списке проголосовавших человек уже есть
        if(userVotes[0].includes(userId)) {
            let userPos = userVotes[0].indexOf(userId) // на той же позиции всегда находится и номер ответа
            let lastAnswerNumber = userVotes[1][userPos]
            // если он кликнул туда же, куда и в прошлый раз, убрать его голос
            if(lastAnswerNumber == answerNumber) {
                userVotes[0].splice(userPos, 1)
                userVotes[1].splice(userPos, 1)
                clickedPoll.votes[lastAnswerNumber]--
            // если он кликнул в другой вариант, перезаписать результат голосования
            } else {
                userVotes[0].splice(userPos, 1)
                userVotes[1].splice(userPos, 1)
                clickedPoll.votes[lastAnswerNumber]--
                userVotes[0].push(userId)
                userVotes[1].push(answerNumber)
                clickedPoll.votes[answerNumber]++
            }
        // если в списке голосовавших его не было, добавить
        } else {
            userVotes[0].push(userId)
            userVotes[1].push(answerNumber)
            clickedPoll.votes[answerNumber]++
        }
        
        clickedPoll.update_poll(msg)
    }
}

export default pollManager