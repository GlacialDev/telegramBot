import variables from '../variables/variables'
import pollManager from '../objects/pollManager'
import channelManager from '../channel_management/channelManager'

let bot = variables.bot

export default function botInit(flag) {
    bot.sendMessage(variables.creator, `Бот инициализирован. dev-mode: ${flag}`)
    channelManager.initEroTimer(flag)

    bot.on('callback_query', function (msg) {
        let data = msg.data.split('_')
        if(data[0] == 'poll') pollManager.updatePoll(msg, data)
    })
}