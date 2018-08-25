import variables from '../variables/variables'
import authCheck from '../functions/authCheck'
import symbolStringGenerator from '../functions/symbolStringGenerator'
import poll from '../objects/poll'

let bot = variables.bot

export default function make_poll() {
    let pollStore = []

    bot.onText(/\/make_poll (.+) - ответы - (.+)/, (msg, match) => {
        if (authCheck(msg) != true) return

        let title = match[1]
        let answers = match[2].split('/')
        let id = symbolStringGenerator(15)
        let votes = []
        let buttons = [
            [{ text: 'да - 0', callback_data: 'dasdpph9brtj4ul_0' }],
            [{ text: 'нет - 0', callback_data: 'dasdpph9brtj4ul_1' }],
            [{ text: 'не знаю - 0', callback_data: 'dasdpph9brtj4ul_2' }],
            [{ text: 'а может пошел ты - 0', callback_data: 'dasdpph9brtj4ul_3' }]
        ]

        // for (let i = 0; i < answers.length; i++) {
        //     votes[i] = 0
        //     let buttonObjBlank = {
        //         text: `${answers[i]} - ${votes[i]}`,
        //         callback_data: id+'_'+i
        //     }
        //     buttons[i] = buttonObjBlank
        // }

        let options = {
            reply_markup: JSON.stringify({
                inline_keyboard: buttons,
                parse_mode: 'Markdown'
            })
        }

        bot.sendMessage(msg.chat.id, title, options)

        // let pollObject = new poll(title, answers, id, votes, buttons)
        // console.log(pollObject)

        // pollStore.push([id, pollObject])
        // console.log(pollStore)

        // pollObject.make_poll(msg)
    })

    bot.on('callback_query', function (msg) {
        let data = msg.data.split('_')
        let id = data[0]
        let answerNumber = data[1]
        console.log(data)
    })
}