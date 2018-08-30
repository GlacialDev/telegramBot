import config from '../secret/config'
import eroTimerObj from './ero_channel/objects/eroTimer'

let channelManager = {
    canadianEroId: config.canadianEroId,

    initEroTimer: () => {
        eroTimerObj.eroTimerInit()
    }
}

export default channelManager