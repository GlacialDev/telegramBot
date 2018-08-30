import config from '../secret/config'
import eroTimerObj from './objects/eroTimer'

let channelManager = {
    canadianEroId: config.canadianEroId,

    initEroTimer: () => {
        eroTimerObj.eroTimerInit(channelManager.canadianEroId)
    }
}

export default channelManager