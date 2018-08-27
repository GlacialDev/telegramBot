import variables from '../variables/variables'

let bot = variables.bot

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
            ],
            [
                {
                    text: 'good',
                    callback_data: 'reaction_'+this.id+'_'+2
                },
                {
                    text: 'bad',
                    callback_data: 'reaction_'+this.id+'_'+3
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