import variables from '../variables/variables'
import symbolStringGenerator from '../functions/symbolStringGenerator'
import request from 'request'
import requestP from 'request-promise'
import emoji from 'node-emoji'
import pollStore from '../variables/api/pollStore'
pollStore();
import reactionStore from '../variables/api/pollStore'
reactionStore();

let bot = variables.bot

let pollManager = {
    // создать новый опрос
    createPoll: (title, answers) => {
        let id = symbolStringGenerator(15)
        // массив, содержащий массивы id голосовавших за каждый вариант
        let votedUsers = []
        // и массив, содержащий номер ответа голосовавшего
        let votedUsersAnswer = []
        // массив с кол-вом голосов за каждый вариант
        let votesAmount = []
        // кнопки опроса
        let buttons = []
        // заполняем votesAmount нулями, votedUsers кол-вом массивов соответствующим кол-ву вариантов
        // и выстраиваем кнопки опроса
        for (let i = 0; i < answers.length; i++) {
            votesAmount[i] = 0
            let buttonBlank = {
                text: `${answers[i]} - ${votesAmount[i]}`,
                callback_data: 'poll_' + id + '_' + i
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
            id: id,
            title: title,
            answers: answers,
            votes: { votedUsers: votedUsers, votedUsersAnswer: votedUsersAnswer, votesAmount: votesAmount }
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
            pollObject: pollObject,
            options: options_poll
        }
        return pollProperties
    },
    // обновить опрос
    updatePoll: (msg, data) => {
        let id = data[1]
        let userAnswer = data[2]
        let userId = msg.from.id
        let buttons = []

        requestP.get('http://localhost:3012/pollstore/' + id).then((pollObject) => {
            pollObject = JSON.parse(pollObject)
            let votes = pollObject.votes
            let votedUsers = votes.votedUsers
            let votedUsersAnswer = votes.votedUsersAnswer
            let votesAmount = votes.votesAmount
            let answers = pollObject.answers
            let title = pollObject.title
            // если в списке проголосовавших человек уже есть
            if (votedUsers.includes(userId)) {
                let userPos = votedUsers.indexOf(userId) // на той же позиции всегда находится и номер ответа
                let userLastAnswer = votedUsersAnswer[userPos]
                // если он кликнул туда же, куда и в прошлый раз, убрать его голос
                if (userLastAnswer == userAnswer) {
                    votedUsers.splice(userPos, 1)
                    votedUsersAnswer.splice(userPos, 1)
                    votesAmount[userLastAnswer]--
                    // если он кликнул в другой вариант, перезаписать результат голосования
                } else {
                    votedUsers.splice(userPos, 1)
                    votedUsersAnswer.splice(userPos, 1)
                    votesAmount[userLastAnswer]--
                    votedUsers.push(userId)
                    votedUsersAnswer.push(userAnswer)
                    votesAmount[userAnswer]++
                }
                // если в списке голосовавших его не было, добавить
            } else {
                votedUsers.push(userId)
                votedUsersAnswer.push(userAnswer)
                votesAmount[userAnswer]++
            }
            // выстраиваем кнопки опроса
            for (let i = 0; i < answers.length; i++) {
                let buttonBlank = {
                    text: `${answers[i]} - ${votesAmount[i]}`,
                    callback_data: 'poll_' + id + '_' + i
                }
                buttons[i] = [buttonBlank]
            }

            let options_poll = {
                reply_markup: JSON.stringify({
                    inline_keyboard: buttons
                })
            }
            let messageId = msg.message.message_id
            let chatId = msg.message.chat.id

            bot.editMessageText(title, {
                message_id: messageId,
                chat_id: chatId,
                parse_mode: 'Markdown',
                reply_markup: options_poll.reply_markup
            })

            let options_put = {
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                    answers: answers,
                    votes: { votedUsers: votedUsers, votedUsersAnswer: votedUsersAnswer, votesAmount: votesAmount }
                })
            }
            request.put('http://localhost:3012/pollstore/' + id, options_put);
        })
    },
    // создать новую реакцию
    createReaction: () => {
        let id = symbolStringGenerator(16)
        // массив, содержащий массивы id голосовавших за каждый вариант
        let votedUsers = []
        // и массив, содержащий номер ответа голосовавшего
        let votedUsersAnswer = []
        // массив с кол-вом голосов за каждый вариант
        let votesAmount = []
        // кнопки опроса
        let E_thumbsup = emoji.get(':+1:')
        let E_thumbsdown = emoji.get(':-1:')
        let answers = [E_thumbsup, E_thumbsdown]
        let buttons = []
        // строим инлайн-клаву
        let buttonArray = []
        for (let i = 0; i < answers.length; i++) {
            votesAmount[i] = 0
            let buttonBlank = {
                text: `${answers[i]} ${votesAmount[i]}`,
                callback_data: 'reaction_' + id + '_' + i
            }
            buttonArray.push(buttonBlank)
        }
        buttons.push(buttonArray)
        // формируем объект настроек для создания реакции в телеграме
        let options_reaction = {
            reply_markup: JSON.stringify({
                inline_keyboard: buttons
            }),
            parse_mode: 'Markdown'
        }
        // формируем объект реакции для записи в БД
        let reactionObject = {
            id: id,
            answers: answers,
            votes: { votedUsers: votedUsers, votedUsersAnswer: votedUsersAnswer, votesAmount: votesAmount }
        }
        // формируем настройки пост-запроса для добавления опроса в БД
        let options_post = {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reactionObject)
        }
        // и отправляем пост-запрос в БД
        console.log('pered post zaprosom')
        request.post('http://localhost:3012/reactionstore', options_post);
        console.log('posle post zaprosa')
        // возвращаем из метода все что нужно для того чтобы отослать реакцию в телегу
        let reactionProperties = {
            reactionObject: reactionObject,
            options: options_reaction
        }
        return reactionProperties
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