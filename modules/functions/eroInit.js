import takePhotoFromBuffer from './takePhotoFromBuffer'
import { bot, creator, groupChat, eroTimer, eroInterval } from '../variables/variables'

// выставляет эро-таймер ровно на начало следующего часа

export default function eroInit() {
    let date = new Date;
    let dateNum1 = +date

    let hour = date.getHours()
    // let minutes = date.getMinutes()
    // let seconds = date.getSeconds()
    date.setHours(hour + 1)
    date.setMinutes(0)
    date.setSeconds(0)

    let dateNum2 = +date
    let dateDifference = dateNum2 - dateNum1
    let additionalZero = date.getMinutes() < 10 ? '0' : ''

    bot.sendMessage(creator, `Картинки будут присланы в ${date.getHours() + 3}:${additionalZero}${date.getMinutes()}, далее с интервалом в ${eroInterval / 3600000} ч.`, )

    setTimeout(() => {
        takePhotoFromBuffer("./list/ero.txt", groupChat, false)
        eroTimer = setInterval(function () {
            takePhotoFromBuffer("./list/ero.txt", groupChat, false)
        }, eroInterval);
    }, dateDifference)
}