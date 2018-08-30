import variables from '../variables/variables'
import emoji from 'node-emoji'

let bot = variables.bot
let E_thumbsup = emoji.get(':+1:')
let E_thumbsdown = emoji.get(':-1:')

class reaction {
    link = ''
    id = ''
    votes = []
    answers = [E_thumbsup, E_thumbsdown]
    buttons = []

    constructor(link, id) {
        this.link = link
        this.id = id
    }

    make_reaction(chatId) {
        let sendTo = chatId

        let buttonArray = []
        for (let i = 0; i < this.answers.length; i++) {
            this.votes[i] = 0
            let buttonObjBlank = {
                text: `${this.answers[i]} ${this.votes[i]}`,
                callback_data: 'reaction_'+this.id+'_'+i
            }
            buttonArray.push(buttonObjBlank)
        }
        this.buttons.push(buttonArray)


        let options = {
            reply_markup: JSON.stringify({
                inline_keyboard: this.buttons
            }),
            parse_mode: 'Markdown'
        }
        
        bot.sendPhoto(sendTo, this.link, options)
    }

    update_reaction(msg) {
        let messageId = msg.message.message_id
        let chatId = msg.message.chat.id

        this.buttons = []
        let buttonArray = []
        for (let i = 0; i < this.answers.length; i++) {
            let buttonObjBlank = {
                text: `${this.answers[i]} ${this.votes[i]}`,
                callback_data: 'reaction_'+this.id+'_'+i
            }
            buttonArray.push(buttonObjBlank)
        }
        this.buttons.push(buttonArray)

        let options = {
            reply_markup: JSON.stringify({
                inline_keyboard: this.buttons
            })
        }

        bot.editMessageReplyMarkup(options.reply_markup, {
            chat_id: chatId,
            message_id: messageId
        })
    }
}

export default reaction