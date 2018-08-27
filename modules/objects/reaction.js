import variables from '../variables/variables'
import emoji from 'node-emoji'

let bot = variables.bot
let E_thumbsup = emoji.get(':+1:')
let E_thumbsdown = emoji.get(':-1:')

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
                    text: E_thumbsup,
                    callback_data: 'reaction_'+this.id+'_'+0
                },
                {
                    text: E_thumbsdown,
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
        
        bot.sendMessage(msg.chat.id, 'Оцените', options)
    }
}

export default reaction