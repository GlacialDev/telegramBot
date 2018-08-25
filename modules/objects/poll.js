import variables from '../variables/variables'

let bot = variables.bot

class poll {
    title
    answers
    pollId

    constructor(title, answers, pollId) {
        poll.title = title
        poll.answers = answers
        poll.pollId = pollId
    }

    make_poll(msg) {
        let title = poll.title
        let answers = poll.answers
        let pollId = poll.pollID
        let buttons = []
        let votes = []
        
        for (let i = 0; i < answers.length; i++) {
            votes[i] = 0
            let objectBlanc = {
                text: `${answers[i]} - ${votes[i]}`,
                callback_data: pollId+'_'+i
            }
            buttons[i] = [objectBlanc]
        }
        let options = {
            reply_markup: JSON.stringify({
                inline_keyboard: buttons,
                parse_mode: 'Markdown'
            })
        };

        bot.sendMessage(msg.chat.id, title, options)
        
        bot.on('callback_query', function (msg) {
            let data = msg.data.split('_')
            let pollId = data[0]

            if (pollId != poll.pollId) return
            let i = data[1]
            let messageId = msg.message.message_id
            let chatId = msg.message.chat.id

            votes[i] = votes[i] + 1

            for (let i = 0; i < answers.length; i++) {
                let objectBlanc = {
                    text: `${answers[i]} - ${votes[i]}`,
                    callback_data: pollId+'_'+i
                }
                buttons[i] = [objectBlanc]
            }
            options = {
                reply_markup: JSON.stringify({
                    inline_keyboard: buttons
                })
            };

            bot.editMessageText(title, {
                message_id: messageId,
                chat_id: chatId,
                parse_mode: 'Markdown',
                reply_markup: options.reply_markup
            })
        });
    }
}

export default poll