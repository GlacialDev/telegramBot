import variables from '../variables/variables'
import stopTimer from '../functions/stopTimer'
import takePhotoFromBuffer from '../functions/takePhotoFromBuffer'

let bot = variables.bot
let fs = variables.fs
let groupChat = variables.groupChat

let eroTimerObj = {
    eroTimer: null,
    eroInterval: 3600000 * 3,
    eroTimerStateFlag: 'enabled',

    how_much_ero: (msg) => {
        let array = null;
        let number = null;
        // открываем файл-буфер со ссылками
        fs.readFile("./data/eroTimer/ero.txt", "utf8", function (error, data) {
            if (error) throw error; // если возникла ошибка
            // разбиваем содержимое файла на массив
            array = data.split(' ');
            // считаем количество элементов
            number = array.length;
            bot.sendMessage(msg.chat.id, `У меня в запасе осталось ${number} картинок`)
        });
    },
    set_ero_timer: (msg, match) => {
        let hours = match[1]
        // чтобы картинки не улетали как бешенные :)
        if (hours < 1) {
            bot.sendMessage(msg.chat.id, 'Нельзя ставить время меньше 1 часа')
            return
        }
        // если переназначаем таймер, прошлый нужно остановить
        stopTimer(eroTimerObj.eroTimer)
        // значение интервала для таймера
        eroTimerObj.eroInterval = 3600000 * hours
        eroTimerObj.eroTimerStateFlag = 'enabled'
        // инициализация таймера
        eroTimerObj.eroTimer = setTimeout(() => {
            takePhotoFromBuffer("./list/ero.txt", groupChat, false)
        }, eroTimerObj.eroInterval)
        // если всё прошло успешно и без ошибок, далее следует сообщение в группу
        bot.sendMessage(groupChat, 'Буду присылать картинки каждые ' + hours + ' часов')
    },
    stop_ero_timer: (msg) => {
        stopTimer(eroTimerObj.eroTimer)
        eroTimerObj.eroTimerStateFlag = 'disabled'
        // при остановке таймера группа об этом оповещается
        bot.sendMessage(groupChat, 'Таймер картинок остановлен')
    },
    add_more_ero: (msg) => {
        // достать данные из './data/download/savefrom.txt'
        fs.readFile('./data/download/savefrom.txt', "utf8", function (error, data) {
            if (error) throw error; // если возникла ошибка
            let string = data
            // вставить данные в './data/eroTimer/ero.txt'
            fs.appendFile('./data/eroTimer/ero.txt', string + ' ', function (error) {
                if (error) throw error; // если возникла ошибка)
                // достать данные из './data/eroTimer/ero.txt' и отформатировать
                fs.readFile('./data/eroTimer/ero.txt', "utf8", function (error, data) {
                    if (error) throw error; // если возникла ошибка
                    let string2 = data.replace(/\s+/g, ' ')
                    // отформатированное записать обратно
                    fs.writeFile('./data/eroTimer/ero.txt', string2, function (error) {
                        if (error) throw error; // если возникла ошибка
                        bot.sendMessage(msg.chat.id, `Перемещение закончено`)
                    })
                })
            })
            // очистить файл './data/download/savefrom.txt'
            fs.writeFile('./data/download/savefrom.txt', '', function (error) {
                if (error) throw error; // если возникла ошибка
            })
        })
    },
    eroTimerInit: (flag) => {
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
        let additionalZero_min = date.getMinutes() < 10 ? '0' : ''
        let hourGMT3 = date.getHours() + 3
        let correctHour = hourGMT3 > 24 ? hourGMT3 - 24 : hourGMT3
        let additionalZero_hour = correctHour < 10 ? '0' : ''

        if(flag == false) bot.sendMessage(groupChat, `Картинки будут присланы в ${additionalZero_hour}${correctHour}:${additionalZero_min}${date.getMinutes()}, далее с интервалом в ${eroTimerObj.eroInterval / 3600000} ч.`)

        setTimeout(() => {
            takePhotoFromBuffer("./data/eroTimer/ero.txt", groupChat, false)
            eroTimerObj.eroTimer = setInterval(function () {
                takePhotoFromBuffer("./data/eroTimer/ero.txt", groupChat, false)
            }, eroTimerObj.eroInterval);
        }, dateDifference)
    }
}

export default eroTimerObj