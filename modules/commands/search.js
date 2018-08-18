import authCheck from '../functions/authCheck'
import search from '../functions/search'
import takePhotoFromBuffer from '../functions/takePhotoFromBuffer'
import { bot, fs } from '../variables/variables'

export default function search() {
    // поиск картинки по запросу с выдачей первого результата
    bot.onText(/\/search (.+)/, (msg, match) => {
        if (authCheck(msg) != true) return

        let text = match[1];
        // обнуляю файл после предыдущего запроса
        fs.writeFileSync("./list/search.txt", '', function (error) {
            if (error) throw error; // если возникла ошибка
        });
        search(text)

        bot.sendMessage(msg.chat.id, 'Ищу ' + text + '. Результат ждите через 3 секунды');
        setTimeout(function () {
            takePhotoFromBuffer("./list/search.txt", msg.chat.id, false)
        }, 3000);
        });

        // если нужно следующий результат
        bot.onText(/\/search_more/, (msg) => {
        if (authCheck(msg) != true) return

        takePhotoFromBuffer("./list/search.txt", msg.chat.id, false)
    });
}