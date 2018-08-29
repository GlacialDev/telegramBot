// то же самое, что в таймере, но вручную по команде /give_ero
import variables from '../../variables/variables'
import takePhotoFromBuffer from '../../functions/takePhotoFromBuffer'
import adminCheck from '../../functions/adminCheck';

import pollManager from '../../objects/pollManager'
import config from '../../secret/config'

let bot = variables.bot

export default function ero_give_img() {
    bot.onText(/\/ero_give_img/, (msg) => {
        if (adminCheck(msg) != true) return

        // takePhotoFromBuffer("./data/eroTimer/ero.txt", config.canadianEroId, false)
        pollManager.createReaction(msg, 'Оцените девочку[https://www.highreshdwallpapers.com/wp-content/uploads/2013/12/Snow-Tiger.jpg]', config.canadianEroId)
    });
} 