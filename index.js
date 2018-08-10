import token from './token';

const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token(), { polling: true });
const groupChat = -307924393
const creator = 353140575

// --- начало объявления флагов --- //

let writeWhoAskFlag = true;
// команда для переключения флага через бота
bot.onText(/\/flag_whoask ([0-1])/, (message, match) => {
  if(match[1] == 1) writeWhoAskFlag = true
  else if(match[1] == 0) writeWhoAskFlag = false
  bot.sendMessage(message.chat.id, `Флаг writeWhoAskFlag = ${writeWhoAskFlag}`);
});

// --- конец объявления флагов --- //
// --- начало объявления функций --- //

// функция записывает id_имя человека в название и содержимое .txt файла на сервере
function writeWhoAsk(message) {
  let text = message.from.id+' : '+message.from.first_name;
  fs.writeFile(`id_name/${message.from.id}_${message.from.first_name}.txt`, text, function(error){
    if(error) throw error; // если возникла ошибка
  });
}

// остановка таймера
function stopTimer(timerName) {
  clearInterval(timerName)
  timerName = null
}

// --- конец объявления функций --- //
// --- начало логики бота --- //

// при начале работы выдает сообщение
bot.sendMessage(creator, 
`Бот инициализирован со следующими настройками:
flag writeWhoAskFlag = ${writeWhoAskFlag}`)

bot.onText(/\/help/, (msg) => {
  let response = 
`Привет, ${message.from.first_name}. Имеются следующие команды:\n
/echo (text) - повторяет текст
/id - выдает id группового чата и ваш
/photo (url-ссылка на картинку) - пишете команду боту в лс, он шлет фото, размещенное по ссылке, в группу
/sendto (id) (text) - пишете боту в лс id адресата и текст сообщения. При условии, что человек прописал у бота /start, ему придет сообщение с текстом от имени бота
/set_date_timer (number) (number) - пишете команду, желаемый часовой пояс (числом, например +3) и желаемую периодичность оповещений в минутах
/stop_date_timer - остановить таймер
/add_ero (url-ссылка на картинку) - отправляйте в лс боту телочек! а он потом их по таймеру будет выкидывать в группу :)`
  bot.sendMessage(message.chat.id, response);
  if (writeWhoAskFlag) writeWhoAsk(msg);
});

bot.onText(/\/echo (.+)/, (msg, match) => {
  let resp = match[1];
  bot.sendMessage(msg.chat.id, resp);
  if (writeWhoAskFlag) writeWhoAsk(msg);
});

bot.onText(/\/id/, (msg) => {
  bot.sendMessage(msg.chat.id, msg.chat.id+' - id этого чата');
  bot.sendMessage(msg.chat.id, msg.from.id+' - а это ваш id');
  if (writeWhoAskFlag) writeWhoAsk(msg);
})

bot.onText(/\/photo (https?:\/\/\S+)/, (msg, match) => {
  let resp = match[1];
  bot.sendPhoto(groupChat, resp);
  if (writeWhoAskFlag) writeWhoAsk(msg);
})

bot.onText(/\/sendto (\-[0-9]+|[0-9]+) (\S+.*)/, (msg, match) => {
  let id = match[1];
  let text = match[2];
  bot.sendMessage(id, text);
  if (writeWhoAskFlag) writeWhoAsk(msg);
})

// таймер на дату
let timer = null
bot.onText(/\/set_date_timer (\-[0-9]+|0|\+[0-9]+) (\-[0-9]+|[0-9]+)/, (msg, match) => {
  // если переназначаем таймер, прошлый нужно остановить
  stopTimer(timer)
  let gmt = match[1]
  let minutes = match[2]
  // нельзя ставить интервал таймера меньше чем на минуту
  if (minutes < 1) {
    bot.sendMessage(groupChat, 'Нельзя ставить время меньше 1 минуты, это может плохо кончиться для всех :(')
    stopTimer(timer)
    return
  }
  // смещение на часовой пояс
  let offset = 1000 * 3600 * gmt
  // интервал таймера
  let interval = 1000*60*minutes
  // инициализация таймера
  timer = setInterval(function() {
    // вычисление значения текущего времени в указанном часовом поясе
    let time = +new Date() + offset;
    // и отправка результата в группу
    bot.sendMessage(groupChat, new Date(time));
  }, interval);
  // оповещение о том что всё прошло без ошибок
  bot.sendMessage(groupChat, 'Буду присылать время по часовому поясу gmt'+gmt+' каждые '+minutes+' минут')

  if (writeWhoAskFlag) writeWhoAsk(msg);
});

bot.onText(/\/stop_date_timer/, (msg) => {
  stopTimer(timer)
  bot.sendMessage(groupChat, 'Таймер остановлен')

  if (writeWhoAskFlag) writeWhoAsk(msg);
});

// картинки по расписанию
// переменная таймера
let eroTimer = null
bot.onText(/\/set_ero_timer ([0-9]+)/, (msg, match) => {
  // если переназначаем таймер, прошлый нужно остановить
  stopTimer(eroTimer)
  let hours = match[1]
  // чтобы картинки не улетали как бешенные :)
  if (hours < 1) {
    bot.sendMessage(msg.chat.id, 'Нельзя ставить время меньше 1 часа')
    stopTimer(timer)
    return
  }
  // значение интервала для таймера
  let interval = 1000*60*60*hours
  // инициализация таймера
  eroTimer = setInterval(function() {
    let array = null;
    let item = null;
    let string = null;
    let number = null;
    // открываем файл-буфер со ссылками
    fs.readFile("./list/images.txt", "utf8", function(error,data){
      if(error) throw error; // если возникла ошибка
      // разбиваем содержимое файла на массив и достаем оттуда одну ссылку
      array = data.split(' ');
      item = array.shift();
      number = array.length;
      // если ссылки кончились говорим что всё хана заправляйте новыми
      if (item == '') item = 'Картинки кончились :('
      bot.sendMessage(groupChat, item)
      bot.sendMessage(groupChat, `У меня в запасе осталось ${number} картинок`)
      // массив без элемента который мы достали pop()-ом преобразуем в строку
      string = array.join(' ')
      // и грузим обратно в файл-буффер
      fs.writeFile("./list/images.txt", string, function(error){
        if(error) throw error; // если возникла ошибка)
      });
    });
  }, interval);
  // если всё прошло успешно и без ошибок, далее следует сообщение в группу
  bot.sendMessage(groupChat, 'Буду присылать картинки каждые '+hours+' часов')
});

bot.onText(/\/stop_ero_timer/, (msg) => {
  stopTimer(eroTimer)
  // при остановке таймера группа об этом оповещается
  bot.sendMessage(groupChat, 'Таймер картинок остановлен')
});

bot.onText(/\/add_ero (https?:\/\/\S+)/, (msg, match) => {
  let link = match[1];
  fs.appendFile("./list/images.txt", ' '+link, function(error){
    if(error) throw error; // если возникла ошибка)
    bot.sendMessage(msg.chat.id, 'Картинка добавлена в очередь!')
  });
  
  if (writeWhoAskFlag) writeWhoAsk(msg);
});

bot.onText(/\/how_much_ero/, (msg) => {
  let array = null;
  let number = null;
  // открываем файл-буфер со ссылками
  fs.readFile("./list/images.txt", "utf8", function(error,data) {
    if(error) throw error; // если возникла ошибка
    // разбиваем содержимое файла на массив
    array = data.split(' ');
    // считаем количество элементов
    number = array.length;
    bot.sendMessage(msg.chat.id, `У меня в запасе осталось ${number} картинок`)
  });
  if (writeWhoAskFlag) writeWhoAsk(msg);
});

// --- конец логики бота --- //