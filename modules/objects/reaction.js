import variables from '../variables/variables'
import emoji from 'node-emoji'

let bot = variables.bot
let E_thumbsup = emoji.get(':+1:')
let E_thumbsdown = emoji.get(':-1:')

class reaction {
    id = ''
    votes = []
    answers = [E_thumbsup, E_thumbsdown]
    buttons = []

    constructor(id) {
        this.id = id
    }

    make_reaction(msg) {
        // let buttonArray = []

        // for (let i = 0; i < this.answers.length; i++) {
        //     this.votes[i] = 0
        //     let buttonObjBlank = {
        //         text: `${this.answers[i]} - ${this.votes[i]}`,
        //         callback_data: 'reaction_'+this.id+'_'+i
        //     }
        //     buttonArray.push(buttonObjBlank)
        // }
        // this.buttons.push(buttonArray)


        this.buttons = [
            [
                {
                    text: '1 (0)',
                    callback_data: 'reaction_'+this.id+'_'+0
                },
                {
                    text: '2 (0)',
                    callback_data: 'reaction_'+this.id+'_'+0
                },
                {
                    text: '3 (0)',
                    callback_data: 'reaction_'+this.id+'_'+0
                },
                {
                    text: '4 (0)',
                    callback_data: 'reaction_'+this.id+'_'+0
                },
                {
                    text: '5 (0)',
                    callback_data: 'reaction_'+this.id+'_'+0
                },
            ],
            [
                {
                    text: '6 (0)',
                    callback_data: 'reaction_'+this.id+'_'+0
                },
                {
                    text: '7 (0)',
                    callback_data: 'reaction_'+this.id+'_'+0
                },
                {
                    text: '8 (0)',
                    callback_data: 'reaction_'+this.id+'_'+0
                },
                {
                    text: '9 (0)',
                    callback_data: 'reaction_'+this.id+'_'+0
                },
                {
                    text: '10 (0)',
                    callback_data: 'reaction_'+this.id+'_'+0
                },
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