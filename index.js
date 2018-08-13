import config from './secret/config';

const crypto = require('crypto')
const format = require('biguint-format')
const https = require('https')
const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(config.token, { polling: true });
const groupChat = -307924393
const creator = 353140575

// --- начало объявления флагов и настроек --- //

let writeWhoAskFlag = true;
// команда для переключения флага через бота
bot.onText(/\/flag_whoask ([0-1])/, (message, match) => {
  if(match[1] == 1) writeWhoAskFlag = true
  else if(match[1] == 0) writeWhoAskFlag = false
  bot.sendMessage(message.chat.id, `Флаг writeWhoAskFlag = ${writeWhoAskFlag}`);
});

// --- конец объявления флагов и настроек --- //
// --- начало объявления функций --- //

// функция записывает id_имя человека в название и содержимое .txt файла на сервере
function writeWhoAsk(message) {
  let text = message.from.id+' : '+message.from.first_name;
  fs.writeFile(`id_name/${message.from.id}_${message.from.first_name}.txt`, text, function(error){
    if(error) throw error; // если возникла ошибка
  });
}

// проверка, внесен ли запрашивающий в список авторизованных лиц
function authCheck(message) {
  let id = message.from.id
  config.authorizedUsers.forEach(function(item, i, array) {
    console.log(id +' '+item)
    if (id = item) {
      console.log('true')
      return true
    }
  });
}

// остановка таймера
function stopTimer(timerName) {
  clearInterval(timerName)
  timerName = null
}

// функции для генерации случайных чисел
function randomC (qty) {
  let x= crypto.randomBytes(qty);
  return format(x, 'dec');
}
function random (low, high) {
  return randomC(4)/Math.pow(2,4*8) * (high - low) + low;
}

// достать ссылку из .txt файла (path), отослать по id (where) 
// и сообщать об оставшемся кол-ве картинок в буфере (howMuchLeft)
function takeFromBuffer(path, sendTo, howMuchLeftFlag) {
  // открываем файл-буфер со ссылками
  fs.readFile(path, "utf8", function(error,data){
    if(error) throw error; // если возникла ошибка
    // разбиваем содержимое файла на массив и достаем оттуда одну ссылку
    let array = data.split(' ');
    let item = array.shift();
    // если ссылки кончились говорим что всё хана заправляйте новыми
    if (item == '') item = 'Картинки кончились :('
    bot.sendMessage(sendTo, item)
    // если требуется сообщить оставшееся количество картинок в буфере
    if (howMuchLeftFlag) {
      let number = array.length;
      bot.sendMessage(sendTo, `У меня в запасе осталось ${number} картинок`)
    }
    // массив без элемента который мы достали shift-ом преобразуем в строку
    let string = array.join(' ')
    // и грузим обратно в файл-буфер
    fs.writeFile(path, string, function(error){
      if(error) throw error; // если возникла ошибка)
    });
  });
}

// функция поиска изображений через api поисковика Bing
// все как в тамошней документации кроме пары вещей где комментарии
function search(requestMes) {
  let subscriptionKey = config.azureKey;
  let host = 'api.cognitive.microsoft.com';
  let path = '/bing/v7.0/images/search';
  let term = requestMes;

  let response_handler = function (response) {
    let body = '';
    response.on('data', function (d) {
        body += d;
    });
    response.on('end', function () {
      console.log('\nRelevant Headers:\n');
      for (var header in response.headers)
          // header keys are lower-cased by Node.js
          if (header.startsWith("bingapis-") || header.startsWith("x-msedge-"))
              console.log(header + ": " + response.headers[header]);
      // в этом месте парсю тело запроса и вытаскиваю массив со свойствами (одно из них мне нужно чтобы скинуть картинку в чат)
      let jsonAnswer = JSON.parse(body);
      let valueArray = jsonAnswer.value;
      // вытаскиваю ссылку на картинку в буфер
      valueArray.forEach(function(item, i, valueArray) {
        fs.appendFileSync("./list/search.txt", item.contentUrl+' ', function(error){
          if(error) throw error; // если возникла ошибка)
        });
      });
    });
    response.on('error', function (e) {
      console.log('Error: ' + e.message);
    });
  };

  let bing_image_search = function (search) {
    console.log('Searching images for: ' + term);
    let request_params = {
          method : 'GET',
          hostname : host,
          path : path + '?q=' + encodeURIComponent(search),
          headers : {
              'Ocp-Apim-Subscription-Key' : subscriptionKey,
          }
    };

    let req = https.request(request_params, response_handler);
    req.end();
  }

  if (subscriptionKey.length === 32) {
    bing_image_search(term);
  } else {
    console.log('Invalid Bing Search API subscription key!');
    console.log('Please paste yours into the source code.');
  }
}
 
// --- конец объявления функций --- //
// --- начало логики бота --- //

// при начале работы выдает сообщение
bot.sendMessage(creator, 
`Бот инициализирован со следующими настройками:
flag writeWhoAskFlag = ${writeWhoAskFlag}`);

bot.onText(/\/help/, (msg) => {
  let response = 
`Привет, ${msg.from.first_name}. Имеются следующие команды:\n
/echo (текст) - повторяет текст
/id - выдает id группового чата и ваш
/photo (url-ссылка на картинку) - пишете команду боту в лс, он шлет фото, размещенное по ссылке, в группу
/sendto (id) (текст) - пишете боту в лс id адресата и текст сообщения. При условии, что человек прописал у бота /start, ему придет сообщение с текстом от имени бота
/set_date_timer (число) (число) - пишете команду, желаемый часовой пояс (числом, например +3) и желаемую периодичность оповещений в минутах
/stop_date_timer - остановить таймер
/add_ero (url-ссылка на картинку) - отправляйте в лс боту девушек! а он потом их по таймеру будет выкидывать в группу :)
/how_much_ero - посмотреть сколько картинок осталось в очереди в таймере
/random - выбросить число от 0 до 100
/search (текст) - выполнить поиск картинки по запросу
/search_result - получить результат поиска (можно выполнять много раз)`
  bot.sendMessage(msg.chat.id, response);
  if (writeWhoAskFlag) writeWhoAsk(msg);
});

bot.onText(/\/echo (.+)/, (msg, match) => {
  if (authCheck(msg)) {
    let text = match[1];
    bot.sendMessage(msg.chat.id, text);
    if (writeWhoAskFlag) writeWhoAsk(msg);
  }
});

bot.onText(/\/id/, (msg) => {
  bot.sendMessage(msg.chat.id, msg.chat.id+' - id этого чата');
  bot.sendMessage(msg.chat.id, msg.from.id+' - а это ваш id');
  if (writeWhoAskFlag) writeWhoAsk(msg);
})

bot.onText(/\/photo (https?:\/\/\S+)/, (msg, match) => {
  let link = match[1];
  bot.sendPhoto(groupChat, link);
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
  let offset = 1000*60*60*gmt
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

// таймер на выдачу картинок
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
    takeFromBuffer("./list/ero.txt", groupChat, true)
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
  fs.readFile("./list/ero.txt", "utf8", function(error,data) {
    if(error) throw error; // если возникла ошибка
    // разбиваем содержимое файла на массив
    array = data.split(' ');
    // считаем количество элементов
    number = array.length;
    bot.sendMessage(msg.chat.id, `У меня в запасе осталось ${number} картинок`)
  });

  if (writeWhoAskFlag) writeWhoAsk(msg);
});

// выкинуть случайное число от 0 до 100 (другой способ)
bot.onText(/\/random$/, (msg) => {
  let roundRoll =  Math.round(random(0,100))
  bot.sendMessage(msg.chat.id, msg.from.first_name+' выбросил '+roundRoll)

  if (writeWhoAskFlag) writeWhoAsk(msg);
});

// поиск картинки по запросу с выдачей первого результата
bot.onText(/\/search (.+)/, (msg, match) => {
  let text = match[1];
  bot.sendMessage(msg.chat.id, 'Ищу '+text+'. Результат ждите через 3 секунды');
  // обнуляю файл после предыдущего запроса
  fs.writeFileSync("./list/search.txt", '', function(error){
    if(error) throw error; // если возникла ошибка
  });
  search(text)

  setTimeout(function() {
    takeFromBuffer("./list/search.txt",  msg.chat.id, false)
  }, 3000);
  
  if (writeWhoAskFlag) writeWhoAsk(msg);
});

// если нужно следующий результат
bot.onText(/\/search_more/, (msg) => {
  takeFromBuffer("./list/search.txt", msg.chat.id, false)
  if (writeWhoAskFlag) writeWhoAsk(msg);
});

 // --- конец логики бота --- //