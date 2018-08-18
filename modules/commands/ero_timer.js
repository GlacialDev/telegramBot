import adminCheck from '../functions/adminCheck'
import authCheck from '../functions/authCheck'
import takePhotoFromBuffer from '../functions/takePhotoFromBuffer'
import stopTimer from '../functions/stopTimer'
import replacer from '../functions/replacer'
import { bot, fs, eroTimer, eroInterval, eroTimerStateFlag, groupChat, setEroTimerFlag, setEroInterval, setTimer} from '../../variables'


export default function ero_timer() {
    // таймер на выдачу картинок
    bot.onText(/\/set_ero_timer ([0-9]+)/, (msg, match) => {
        if (adminCheck(msg) != true) {
            bot.sendMessage(msg.chat.id, 'Только для посвященных')
            return
        }

        let hours = match[1]
        // чтобы картинки не улетали как бешенные :)
        if (hours < 1) {
            bot.sendMessage(msg.chat.id, 'Нельзя ставить время меньше 1 часа')
            return
        }
        // если переназначаем таймер, прошлый нужно остановить
        stopTimer(eroTimer)
        // значение интервала для таймера
        setEroInterval(1000 * 60 * 60 * hours)
        setEroTimerFlag('enabled')
        // инициализация таймера
        setTimer(eroTimer, eroInterval)
        // если всё прошло успешно и без ошибок, далее следует сообщение в группу
        bot.sendMessage(groupChat, 'Буду присылать картинки каждые ' + hours + ' часов')
    });

    bot.onText(/\/stop_ero_timer/, (msg) => {
        if (adminCheck(msg) != true) {
            bot.sendMessage(msg.chat.id, 'Только для посвященных')
            return
        }

        stopTimer(eroTimer)
        setEroTimerFlag('disabled')
        // при остановке таймера группа об этом оповещается
        bot.sendMessage(groupChat, 'Таймер картинок остановлен')
    });

    // из saveform.txt в ero.txt в нужном формате
    bot.onText(/\/ero_replacer/, (msg) => {
        if (adminCheck(msg) != true) {
            bot.sendMessage(msg.chat.id, 'Только для посвященных')
            return
        }

        replacer('./download/savefrom.txt', './list/ero.txt', msg.chat.id)
    })

    bot.onText(/\/how_much_ero/, (msg) => {
        if (authCheck(msg) != true) return

        let array = null;
        let number = null;
        // открываем файл-буфер со ссылками
        fs.readFile("./list/ero.txt", "utf8", function (error, data) {
            if (error) throw error; // если возникла ошибка
            // разбиваем содержимое файла на массив
            array = data.split(' ');
            // считаем количество элементов
            number = array.length;
            bot.sendMessage(msg.chat.id, `У меня в запасе осталось ${number} картинок`)
        });
    });
}