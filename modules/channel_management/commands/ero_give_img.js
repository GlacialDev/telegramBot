// то же самое, что в таймере, но вручную по команде /give_ero
import variables from '../../variables/variables'
import getEroPhotoLink from '../../functions/getEroPhotoLink'
import adminCheck from '../../functions/adminCheck';

import pollManager from '../../objects/pollManager'
import config from '../../secret/config'
import getEroPhotoLink from '../../functions/getEroPhotoLink';

let bot = variables.bot

export default function ero_give_img() {
    bot.onText(/\/ero_give_img/, (msg) => {
        if (adminCheck(msg) != true) return
        
        getEroPhotoLink().then(
            (link) => pollManager.createReaction(msg, `Оцените <a href=${link}>девочку</a>`, config.canadianEroId),
            () => bot.sendMessage(variables.creator, 'Эро-картинки кончились!')
        )
    });
} 