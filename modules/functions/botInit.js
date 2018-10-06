import variables from '../variables/variables'
import pollManager from '../objects/pollManager'
import channelManager from '../channel_management/channelManager'
import uploader from '../objects/uploader'

let bot = variables.bot
let server = variables.server
let db = variables.db

export default function botInit() {
    bot.sendMessage(variables.creator, `Бот инициализирован.`)
    channelManager.initEroTimer()

    db.connect('mongodb://localhost:27017', 'second', (err) => {
        if (err) {
            return console.log(err)
        }
        server.listen(3012, () => {
            console.log('API listen started')
        })
    })

    bot.on('callback_query', function (msg) {
        let data = msg.data.split('_')
        if (data[0] == 'poll') pollManager.updatePoll(msg, data)
        if (data[0] == 'reaction') pollManager.updateReaction(msg, data)
    })

    bot.on('message', (msg) => {
        console.log(msg)
        if(msg.voice) {
            console.log('in if msg.voice')
            uploader.voice(msg).then((text) => {
                bot.sendMessage(msg.chat.id, text)
            })
        }
    })
}
