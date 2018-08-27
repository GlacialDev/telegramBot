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
                    callback_data: 'id_'+this.id+'_'+0
                },
                {
                    text: 'bad',
                    callback_data: 'id_'+this.id+'_'+1
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