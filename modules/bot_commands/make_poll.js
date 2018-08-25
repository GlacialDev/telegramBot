import variables from '../variables/variables'
import authCheck from '../functions/authCheck'

let bot = variables.bot

export default function make_poll() {
    bot.onText(/\/make_poll (.+) answers (.+)/, (msg, match) => {
        if (authCheck(msg) != true) return

        let question = match[1]
        let answers = match[2].split('/')
        let poll = {
            title: question,
            buttons: [],
            votes: []
        }
        for (let i = 0; i < answers.length; i++) {
            poll.votes[i] = 0
            let objectBlanc = {
                text : `${answers[i]} - ${poll.votes[i]}`,
                callback_data : i
            }
            poll.buttons[i] = [objectBlanc]
        }
        let options = {
            reply_markup: JSON.stringify({
                inline_keyboard: poll.buttons,
                parse_mode: 'Markdown'
            })
        };

        bot.sendMessage(msg.chat.id, poll.title, options)

        bot.on('callback_query', function (msg) {
            let i = msg.data
            // let chatId = msg.chat.id
            if(msg.message_id)console.log(msg.message_id+' msg.message_id')
            if(msg.chat.id)console.log(msg.chat.id+' msg.chat.id')
            if(msg.inline_keyboard.id)console.log(msg.inline_keyboard.id+' msg.inline_keyboard.id')
            
            console.log(poll.votes[i]+' do')
            poll.votes[i] = poll.votes[i]+1
            console.log(poll.votes[i]+' posle')

            console.log(poll)

            // for (let i = 0; i < answers.length; i++) {
            //     let objectBlanc = {
            //         text : `${answers[i]} - ${poll.votes[i]}`,
            //         callback_data : i
            //     }
            //     poll.buttons[i] = [objectBlanc]
            // }
            // options = {
            //     reply_markup: JSON.stringify({
            //         inline_keyboard: poll.buttons,
            //         parse_mode: 'Markdown'
            //     })
            // };

            // bot.editMessageReplyMarkup(chatId, messageId, options.reply_markup)
          });
    })
}