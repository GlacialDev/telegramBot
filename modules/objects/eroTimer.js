import variables from '../variables/variables'
import stopTimer from '../functions/stopTimer'

let bot = variables.bot
let fs = variables.fs
let groupChat = variables.groupChat

let eroTimerObj = {
    eroTimer : null,
    eroInterval : 3600000*3,
    eroTimerStateFlag : 'disabled',

    how_much_ero : () => {
        console.log('how much ero start')
        let array = null;
        let number = null;
        // открываем файл-буфер со ссылками
        fs.readFileSync("./data/eroTimer/ero.txt", "utf8", function (error, data) {
            
            console.log('how much ero fs')
            if (error) throw error; // если возникла ошибка
            // разбиваем содержимое файла на массив
            array = data.split(' ');
            // считаем количество элементов
            number = array.length;
        });
        console.log('how much ero after fs')
        return console.log(number);
    },
    set_ero_timer : (hours) => {
        // чтобы картинки не улетали как бешенные :)
        if (hours < 1) {
            bot.sendMessage(msg.chat.id, 'Нельзя ставить время меньше 1 часа')
            return
        }
        // если переназначаем таймер, прошлый нужно остановить
        stopTimer(eroTimer)
        // значение интервала для таймера
        eroInterval = 3600000*hours
        eroTimerStateFlag = 'enabled'
        // инициализация таймера
        eroTimer = setTimeout(() => {
            takePhotoFromBuffer("./list/ero.txt", groupChat, false)
        }, eroInterval)
        // если всё прошло успешно и без ошибок, далее следует сообщение в группу
        bot.sendMessage(groupChat, 'Буду присылать картинки каждые ' + hours + ' часов')
    },
    stop_ero_timer : () => {
        stopTimer(eroTimer)
        eroTimerStateFlag = 'disabled'
        // при остановке таймера группа об этом оповещается
        bot.sendMessage(groupChat, 'Таймер картинок остановлен')
    }
}

export default eroTimerObj