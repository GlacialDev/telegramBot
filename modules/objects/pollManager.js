import reaction from './reaction'
import symbolStringGenerator from '../functions/symbolStringGenerator'
import request from 'request'
import requestP from 'request-promise'

import pollStore from '../variables/api/pollStore'
pollStore();

let pollManager = {
    // хранилища опросов
    pollStore: [],
    reactionStore: [],

    // создать новый опрос
    createPoll: (id, title, answers) => {
        // массив с подсчетом голосов за каждый вариант
        let votesAmount = []
        // массив, содержащий массивы id голосовавших за каждый вариант
        let votedUsers = []
        // кнопки опроса
        let buttons = []
        // заполняем votesAmount нулями, votedUsers кол-вом массивов соответствующим кол-ву вариантов
        // и выстраиваем кнопки опроса
        for (let i = 0; i < answers.length; i++) {
            votesAmount[i] = 0
            votedUsers[i] = []
            let buttonBlank = {
                text: `${answers[i]} - ${votesAmount[i]}`,
                callback_data: 'poll_'+id+'_'+i
            }
            buttons[i] = [buttonBlank]
        }
        // формируем объект настроек для создания опроса в телеграме
        let options_poll = {
            reply_markup: JSON.stringify({
                inline_keyboard: buttons
            }),
            parse_mode: 'Markdown'
        }
        // формируем объект опроса для записи в БД
        let pollObject = {
            id : id,
            title : title,
            answers : answers,
            votes : { votesAmount : votesAmount, votedUsers : votedUsers }
        }
        // формируем настройки пост-запроса для добавления опроса в БД
        let options_post = {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pollObject)
        }
        // и отправляем пост-запрос в БД
        request.post('http://localhost:3012/pollstore', options_post);
        // возвращаем из метода все что нужно для того чтобы отослать опрос в телегу
        let pollProperties = {
            pollObject : pollObject, 
            options : options_poll
        }
        return pollProperties
    },
    // обновить опрос
    updatePoll: (msg, data) => {
        let id = data[1]
        let answerNumber = data[2]
        let userId = msg.from.id
        // let clickedPoll
        // let userVotes
        let result
        
        console.log('v update')
        requestP.get('http://localhost:3012/pollstore/' + id).then((pollObject) => {
            result = JSON.parse(pollObject)
            console.log(result)

            // clickedPoll = result.poll
            // userVotes = result.userVotes

            // for (let i = 0; i < pollManager.pollStore.length; i++) {
            //     if (pollManager.pollStore[i][0] == id) {
            //         clickedPoll = pollManager.pollStore[i][1]
            //         userVotes = pollManager.pollStore[i][2]
            //         break
            //     }
            // }
            // если в списке проголосовавших человек уже есть
            // if (userVotes[0].includes(userId)) {
            //     let userPos = userVotes[0].indexOf(userId) // на той же позиции всегда находится и номер ответа
            //     let lastAnswerNumber = userVotes[1][userPos]
            //     // если он кликнул туда же, куда и в прошлый раз, убрать его голос
            //     if (lastAnswerNumber == answerNumber) {
            //         userVotes[0].splice(userPos, 1)
            //         userVotes[1].splice(userPos, 1)
            //         clickedPoll.votes[lastAnswerNumber]--
            //         // если он кликнул в другой вариант, перезаписать результат голосования
            //     } else {
            //         userVotes[0].splice(userPos, 1)
            //         userVotes[1].splice(userPos, 1)
            //         clickedPoll.votes[lastAnswerNumber]--
            //         userVotes[0].push(userId)
            //         userVotes[1].push(answerNumber)
            //         clickedPoll.votes[answerNumber]++
            //     }
            //     // если в списке голосовавших его не было, добавить
            // } else {
            //     userVotes[0].push(userId)
            //     userVotes[1].push(answerNumber)
            //     clickedPoll.votes[answerNumber]++
            // }

            // clickedPoll.update_poll(msg)

            // let options_put = {
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         poll: clickedPoll,
            //         userVotes: userVotes
            //     })
            // }

            // request.put('http://localhost:3012/pollstore', options_put);
        })
    },
    createReaction: (link, sendTo) => {
        let id = symbolStringGenerator(16)
        let userVotes = [[], []]

        let reactionObject = new reaction(link, id)
        pollManager.reactionStore.push([id, reactionObject, userVotes])

        reactionObject.make_reaction(sendTo)
    },
    updateReaction: (msg, data) => {
        let id = data[1]
        let answerNumber = data[2]
        let userId = msg.from.id
        let clickedReaction
        let userVotes

        // ищем нужный опрос (потому что их может работать одновременно несколько) по id опроса
        // и запоминаем его, а также кто за что в нем голосовал (userVotes)
        for (let i = 0; i < pollManager.reactionStore.length; i++) {
            if (pollManager.reactionStore[i][0] == id) {
                clickedReaction = pollManager.reactionStore[i][1]
                userVotes = pollManager.reactionStore[i][2]
                break
            }
        }
        // если в списке проголосовавших человек уже есть
        if (userVotes[0].includes(userId)) {
            let userPos = userVotes[0].indexOf(userId) // на той же позиции всегда находится и номер ответа
            let lastAnswerNumber = userVotes[1][userPos]
            // если он кликнул туда же, куда и в прошлый раз, убрать его голос
            if (lastAnswerNumber == answerNumber) {
                userVotes[0].splice(userPos, 1)
                userVotes[1].splice(userPos, 1)
                clickedReaction.votes[lastAnswerNumber]--
                // если он кликнул в другой вариант, перезаписать результат голосования
            } else {
                userVotes[0].splice(userPos, 1)
                userVotes[1].splice(userPos, 1)
                clickedReaction.votes[lastAnswerNumber]--
                userVotes[0].push(userId)
                userVotes[1].push(answerNumber)
                clickedReaction.votes[answerNumber]++
            }
            // если в списке голосовавших его не было, добавить
        } else {
            userVotes[0].push(userId)
            userVotes[1].push(answerNumber)
            clickedReaction.votes[answerNumber]++
        }

        clickedReaction.update_reaction(msg)
    },
}

export default pollManager