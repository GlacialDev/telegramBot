import variables from '../variables/variables'

let bot = variables.bot

class poll {
    title = ''
    answers = []
    id = ''
    votes = []
    buttons = []

    constructor(title, answers, id) {
        this.title = title
        this.answers = answers
        this.id = id
    }

    make_poll(msg) {
        for (let i = 0; i < this.answers.length; i++) {
            this.votes[i] = 0
            let buttonObjBlank = {
                text: `${this.answers[i]} - ${this.votes[i]}`,
                callback_data: this.id+'_'+i
            }
            this.buttons[i] = [buttonObjBlank]
        }

        let options = {
            reply_markup: JSON.stringify({
                inline_keyboard: this.buttons,
                parse_mode: 'Markdown'
            })
        }

        bot.sendMessage(msg.chat.id, this.title, options)
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