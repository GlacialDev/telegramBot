import config from '../secret/config'
import eroTimerObj from './objects/eroTimer'

let channelManager = {
    canadianEroId: config.canadianEroId,

    initEroTimer: () => {
        eroTimerObj.eroTimerInit()
    }
}

export default channelManager