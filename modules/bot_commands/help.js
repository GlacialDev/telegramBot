import variables from '../variables/variables'
import authCheck from '../functions/authCheck'
import adminCheck from '../functions/adminCheck'

let bot = variables.bot

export default function help() {
    bot.onText(/\/help/, (msg) => {
        if (authCheck(msg) != true) return
        let response =
`Привет, ${msg.from.first_name}. Имеются следующие команды:\n
- /admin_help - админ-команды (доступна админам)
- /settings - настройки и флаги бота
- /echo (текст) - повторяет текст
- /id - выдает id группового чата и ваш
- /send_photo (url-ссылка на картинку) - пишете команду боту в лс, он шлет фото, размещенное по ссылке, в группу
- /send_to (id) (текст) - пишете боту в лс id адресата и текст сообщения. При условии, что человек прописал у бота /start, ему придет сообщение с текстом от имени бота
- /how_much_ero - посмотреть сколько картинок осталось в очереди в таймере
- /roll - выбросить число от 0 до 100
- /roll (число1) (число2) - выбросить число от (числа1) до (числа2)
- /remind_me (текст) через (число) (минут/дней/часов - можно в любом склонении) - напомнит вам в личку через заданное время то что вы написали в (тексте), при условии, что вы прописали у бота /start
- /pass_gen (число) - генерирует пароль длиной в (число) символов
- /convert_to (расширение без точки) - конвертирует файл, который вы загрузите боту, в указанное расширение. Например: /convert_to pdf
- /poll (вопрос) - (варианты ответа через "/"). Пример: /poll опрос работает? - да/нет/не знаю/может быть
- !бот, (текст) - поговорить с ботом
- !cкажи (текст) - попросить бота озвучить текст`
        bot.sendMessage(msg.chat.id, response);
    });

    bot.onText(/\/admin_help/, (msg) => {
        if (adminCheck(msg) != true) return
        let response =
`Привет, ${msg.from.first_name}. Имеются следующие команды:\n
- /set_ero_timer (время) - установить таймер отсылки картинок, время в часах
- /stop_ero_timer - остановить таймер отсылки картинок
- /add_more_ero - из savefrom списка в список таймера
- /upload_(enabled/disabled)  - вкл./откл. возможность загрузки файлов на сервер
- /speech_voice (имя) - выбрать боту голос. Доступные имена: jane, oksana, alyss, omazh, zahar, ermil
- /speech_emotion (имя) - выбрать боту речевые эмоции. Доступные эмоции: good, evil, neutral
- /dialog_text_answer (true|false) - ответы на команду !бот, при true - текстом, при false - голосом`
        bot.sendMessage(msg.chat.id, response);
    });

}