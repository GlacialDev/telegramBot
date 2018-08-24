import variables from '../variables/variables'
import authCheck from '../functions/authCheck'

let bot = variables.bot

export default function make_poll() {
    bot.onText(/\/make_poll (.+) answers (.+)/, (msg, match) => {
        if (authCheck(msg) != true) return

        let chat = msg.chat.id
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

        bot.sendMessage(chat, poll.title, options)

        bot.on('callback_query', function (msg) {
            let i = msg.data
            
            console.log(poll.votes[i]+' do')
            poll.votes[i] = poll.votes[i]++
            console.log(poll.votes[i]+' posle')

            console.log(poll)

            for (let i = 0; i < answers.length; i++) {
                let objectBlanc = {
                    text : `${answers[i]} - ${poll.votes[i]}`,
                    callback_data : i
                }
                poll.buttons[i] = [objectBlanc]
            }

            bot.editMessageReplyMarkup({inline_keyboard: poll.buttons})
          });
    })
}