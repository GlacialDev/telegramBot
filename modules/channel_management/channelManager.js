import config from '../secret/config'
import eroTimerObj from './objects/eroTimer'

let channelManager = {
    canadianEroId: config.canadianEroId,

    initEroTimer: (flag) => {
        eroTimerObj.eroTimerInit(channelManager.canadianEroId, flag)
    }
}

export default channelManager