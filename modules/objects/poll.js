import variables from '../variables/variables'

let bot = variables.bot

let poll = {
    title: '',
    answers: [],
    constructor(title, answers) {
        this.title = title
        this.answers = answers
    }, 

    make_poll(msg) {
        let title = poll.title
        let answers = poll.answers
        let buttons = []
        let votes = []
        console.log('makepoll after let')
        for (let i = 0; i < answers.length; i++) {
            votes[i] = 0
            let objectBlanc = {
                text: `${answers[i]} - ${votes[i]}`,
                callback_data: i
            }
            buttons[i] = [objectBlanc]
        }
        let options = {
            reply_markup: JSON.stringify({
                inline_keyboard: buttons,
                parse_mode: 'Markdown'
            })
        };

        console.log('makepoll after options')
        bot.sendMessage(msg.chat.id, title, options)

        console.log('makepoll after sendmessage')
        bot.on('callback_query', function (msg) {
            let i = msg.data
            let messageId = msg.message.message_id
            let chatId = msg.message.chat.id

            votes[i] = votes[i] + 1

            for (let i = 0; i < answers.length; i++) {
                let objectBlanc = {
                    text: `${answers[i]} - ${votes[i]}`,
                    callback_data: i
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