import variables from './modules/variables/variables'
import eroTimerObj from './modules/objects/eroTimer'

export default function botInit(flag) {
    variables.bot.sendMessage(variables.creator, `Бот инициализирован. dev-mode: ${flag}`)
    eroTimerObj.eroTimerInit(flag)
}