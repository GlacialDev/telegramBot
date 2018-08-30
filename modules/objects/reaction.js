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

    make_reaction(msg, chatId) {
        let sendTo = chatId || msg.chat.id

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
        console.log(msg)
        let messageId = msg.message.message_id
        let chatId = msg.message.chat.id
        let inlineId = msg.id
        console.log(inlineId)

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

        bot.editMessageReplyMarkup({
            chat_id: chatId,
            message_id: messageId,
            reply_markup: options.reply_markup
        })
    }
}

export default reaction