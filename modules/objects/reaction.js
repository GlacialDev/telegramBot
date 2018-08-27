import variables from '../variables/variables'
import emoji from 'node-emoji'

let bot = variables.bot

let goodEmoji = emoji.get(':+1:')
let badEmoji = emoji.get(':-1:')

class reaction {
    id = ''
    votes = []
    buttons = []

    constructor(id) {
        this.id = id
    }

    make_reaction(msg) {
        this.buttons = [
            [
                {
                    text: 'good',
                    callback_data: 'reaction_'+this.id+'_'+0
                },
                {
                    text: 'bad',
                    callback_data: 'reaction_'+this.id+'_'+1
                }
            ]
        ]
        let options = {
            reply_markup: JSON.stringify({
                inline_keyboard: this.buttons,
                parse_mode: 'Markdown'
            })
        }
        console.log('make_reaction')
        console.log(goodEmoji+' '+badEmoji)
        bot.sendMessage(msg.chat.id, 'Оцените', options)
    }
}

export default reaction