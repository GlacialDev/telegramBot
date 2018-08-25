import variables from '../variables/variables'
import eroTimerObj from '../objects/eroTimer'
import pollManager from '../objects/pollManager'

let bot = variables.bot

export default function botInit(flag) {
    bot.sendMessage(variables.creator, `Бот инициализирован. dev-mode: ${flag}`)
    eroTimerObj.eroTimerInit(flag)

    bot.on('callback_query', function (msg) {
        let data = msg.data.split('_')
        if(data[0] == 'poll') pollManager.updatePoll(msg, data)
    })
}