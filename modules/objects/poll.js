import variables from '../variables/variables'

let bot = variables.bot

let poll = {
    question: '',
    answers: [],
    poll: {
        title: poll.question,
        buttons: [],
        votes: []
    },
    constructor(question, answers) {
        this.question = question
        this.answers = answers
    }, 
    make_poll() {
        let poll = poll.poll
        let answers = poll.answers

        for (let i = 0; i < answers.length; i++) {
            poll.votes[i] = 0
            let objectBlanc = {
                text: `${answers[i]} - ${poll.votes[i]}`,
                callback_data: i
            }
            poll.buttons[i] = [objectBlanc]
        }
        let options = {
            reply_markup: JSON.stringify({
                inline_keyboard: poll.buttons,
                parse_mode: 'Markdown'
            })
        };

        bot.sendMessage(msg.chat.id, poll.title, options)

        bot.on('callback_query', function (msg) {
            let i = msg.data
            let messageId = msg.message.message_id
            let chatId = msg.message.chat.id

            poll.votes[i] = poll.votes[i] + 1

            for (let i = 0; i < answers.length; i++) {
                let objectBlanc = {
                    text: `${answers[i]} - ${poll.votes[i]}`,
                    callback_data: i
                }
                poll.buttons[i] = [objectBlanc]
            }
            options = {
                reply_markup: JSON.stringify({
                    inline_keyboard: poll.buttons
                })
            };

            bot.editMessageText(poll.title, {
                message_id: messageId,
                chat_id: chatId,
                parse_mode: 'Markdown',
                reply_markup: options.reply_markup
            })
        });
    }
}

export default poll