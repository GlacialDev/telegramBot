import variables from '../variables/variables'

let bot = variables.bot

class poll {
    title = ''
    answers = []
    id = ''
    votes = []
    buttons = []

    constructor(title, answers, id, votes, buttons) {
        this.title = title
        this.answers = answers
        this.id = id
        this.votes = votes
        this.buttons = buttons
    }

    make_poll(msg) {
        let options = {
            // reply_markup: JSON.stringify({
            //     inline_keyboard: buttons,
            //     parse_mode: 'Markdown'
            // })
            reply_markup: {
                inline_keyboard: [[
                    {
                        text: "A",
                        callback_data: "A1"            
                    }, 
                    {
                        text: "B",
                        callback_data: "C1"            
                    }]
                ]
            }
    }
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