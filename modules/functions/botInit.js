import variables from '../variables/variables'
import pollManager from '../objects/pollManager'
import channelManager from '../channel_management/channelManager'

let bot = variables.bot
let server = variables.server
let db = variables.db

export default function botInit(flag) {
    bot.sendMessage(variables.creator, `Бот инициализирован. dev-mode: ${flag}`)
    channelManager.initEroTimer()

    bot.on('callback_query', function (msg) {
        let data = msg.data.split('_')
        if (data[0] == 'poll') pollManager.updatePoll(msg, data)
        if (data[0] == 'reaction') pollManager.updateReaction(msg, data)
    })

    db.connect('mongodb://localhost:27017', 'second', (err) => {
        if (err) {
            return console.log(err)
        }
        server.listen(3012, () => {
            console.log('API listen started')
        })
    })
}