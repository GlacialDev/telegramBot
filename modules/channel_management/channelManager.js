import config from '../secret/config'
import eroTimer from './objects/eroTimer'

let channelManager = {
    canadianEroId: config.canadianEroId,

    initEroTimer: (flag) => {
        eroTimer.eroTimerInit(channelManager.canadianEroId, flag)
    }
}

export default channelManager