import variables from '../variables/variables'

let bot = variables.bot

class poll {
    title = ''
    answers = []
    id = ''
    buttons = []
    votes = []

    constructor(title, answers, id) {
        poll.title = title
        poll.answers = answers
        poll.id = id
    }

    make_poll(msg) {
        let title = poll.title
        let answers = poll.answers
        let id = poll.id
        let buttons = poll.buttons
        let votes = poll.votes

        for (let i = 0; i < answers.length; i++) {
            votes[i] = 0
            let objectBlanc = {
                text: `${answers[i]} - ${votes[i]}`,
                callback_data: id+'_'+i
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
    }

    // update_poll(msg) {
    //     let messageId = msg.message.message_id
    //     let chatId = msg.message.chat.id

    //     votes[i] = votes[i] + 1

    //     for (let i = 0; i < answers.length; i++) {
    //         let objectBlanc = {
    //             text: `${answers[i]} - ${votes[i]}`,
    //             callback_data: pollId+'_'+i
    //         }
    //         buttons[i] = [objectBlanc]
    //     }
    //     options = {
    //         reply_markup: JSON.stringify({
    //             inline_keyboard: buttons
    //         })
    //     };

    //     bot.editMessageText(title, {
    //         message_id: messageId,
    //         chat_id: chatId,
    //         parse_mode: 'Markdown',
    //         reply_markup: options.reply_markup
    //     })
    // }
}

export default poll