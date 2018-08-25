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
            let messageId = msg.message.message_id
            let chatId = msg.message.chat.id
            
            poll.votes[i] = poll.votes[i]+1

            for (let i = 0; i < answers.length; i++) {
                let objectBlanc = {
                    text : `${answers[i]} - ${poll.votes[i]}`,
                    callback_data : i
                }
                poll.buttons[i] = [objectBlanc]
            }
            options = {
                reply_markup: JSON.stringify({
                    inline_keyboard: poll.buttons
                })
            };

            bot.editMessageReplyMarkup({
                message_id: messageId,
                parse_mode: 'Markdown',
                reply_markup: options.reply_markup
            })
          });
    })
}