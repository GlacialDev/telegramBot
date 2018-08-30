// то же самое, что в таймере, но вручную по команде /give_ero
import variables from '../../variables/variables'
import getEroPhotoLink from '../functions/getEroPhotoLink'
import adminCheck from '../../functions/adminCheck'
import pollManager from '../../objects/pollManager'
import config from '../../secret/config'

let bot = variables.bot

export default function ero_give_img() {
    bot.onText(/\/ero_give_img/, (msg) => {
        if (adminCheck(msg) != true) return
        
        getEroPhotoLink("./data/eroTimer/ero.txt").then(
            (link) => pollManager.createReaction(link, config.canadianEroId),
            (text) => bot.sendMessage(variables.creator, text)
        )
    });
} 