// то же самое, что в таймере, но вручную по команде /ero_give_img
import variables from '../../../variables/variables'
import getEroPhotoLink from '../functions/getEroPhotoLink'
import adminCheck from '../../../functions/adminCheck'
import pollManager from '../../../objects/pollManager'
import config from '../../../secret/config'

let bot = variables.bot

export default function ero_give_img() {
    bot.onText(/\/ero_give_img/, (msg) => {
        if (adminCheck(msg) != true) return
        
        getEroPhotoLink("./data/eroTimer/ero.txt").then(
            (link) => {
                let reactionProps = pollManager.createReaction()
                bot.sendPhoto(config.canadianEroId, link, reactionProps.options)
            },
            (text) => bot.sendMessage(variables.creator, text)
        )
    });
} 