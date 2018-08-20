import variables from '../variables/variables'
import authCheck from '../functions/authCheck'

let bot = variables.bot
let fs = variables.fs

export default function how_much_ero() {
    bot.onText(/\/how_much_ero/, (msg) => {
        if (authCheck(msg) != true) return

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
    });
}