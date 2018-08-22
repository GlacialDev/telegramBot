import variables from '../variables/variables'
import eroTimerObj from '../objects/eroTimer'

export default function botInit(flag) {
    variables.bot.sendMessage(variables.creator, `Бот инициализирован. dev-mode: ${flag}`)
    eroTimerObj.eroTimerInit(flag)
}