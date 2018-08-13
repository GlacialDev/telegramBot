import config from './secret/config';

const crypto = require('crypto')
const format = require('biguint-format')
const https = require('https')
const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(config.token, { polling: true });
const apiai = require('apiai');
const botIsClever_HeCanTalk = apiai(config.dialogFlowClientAccesToken);
const groupChat = -307924393
const creator = 353140575

// --- начало объявления флагов и настроек --- //



// --- конец объявления флагов и настроек --- //
// --- начало объявления функций --- //

// проверка, внесен ли запрашивающий в список авторизованных лиц
function authCheck(message) {
  let id = message.from.id
  let array = config.authorizedUsers
  let ok = false;
  for (let i = 0; i < array.length; i++) {
    if (id === array[i]) { 
      ok = true
      return ok
    }
  }
}

function adminCheck(message) {
  let id = message.from.id
  let array = config.adminUsers
  let ok = false;
  for (let i = 0; i < array.length; i++) {
    if (id === array[i]) { 
      ok = true
      return ok
    }
  }
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
function takePhotoFromBuffer(path, sendTo, howMuchLeftFlag) {
  // открываем файл-буфер со ссылками
  fs.readFile(path, "utf8", function(error,data){
    if(error) throw error; // если возникла ошибка
    // разбиваем содержимое файла на массив и достаем оттуда одну ссылку
    let array = data.split(' ');
    let item = array.shift();
    // если ссылки кончились говорим что всё хана заправляйте новыми
    if (item == '') item = 'Картинки кончились :('
    bot.sendPhoto(sendTo, item)
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

// dialogflow и гугл нейросети, которые говорят с тобой!
function talk(text, id) {
  let talkRequest = botIsClever_HeCanTalk.textRequest(text, {
      sessionId: 'Canadian_bot_talk_to_you'
  });
  
  talkRequest.on('response', function(response) {
      let botTalk = response.result.fulfillment.speech
      bot.sendMessage(id, botTalk);
  });
  
  talkRequest.on('error', function(error) {
      console.log(error);
      bot.sendMessage(id, 'Кажется, я не понял, что ты имеешь в виду.');
  });
  
  talkRequest.end();
}
 
// --- конец объявления функций --- //
// --- начало логики бота --- //

// при начале работы выдает сообщение
bot.sendMessage(creator, 
`Бот инициализирован`);

bot.onText(/\/help/, (msg) => {
  if (authCheck(msg) != true) return
  let response = 
`Привет, ${msg.from.first_name}. Имеются следующие команды:\n
/echo (текст) - повторяет текст
/id - выдает id группового чата и ваш
/photo (url-ссылка на картинку) - пишете команду боту в лс, он шлет фото, размещенное по ссылке, в группу
/sendto (id) (текст) - пишете боту в лс id адресата и текст сообщения. При условии, что человек прописал у бота /start, ему придет сообщение с текстом от имени бота
/set_ero_timer (время) - установить таймер отсылки картинок, время в часах (админ-команда!)
/stop_ero_timer - остановить таймер отсылки картинок (админ-команда!)
/add_ero (url-ссылка на картинку) - отправляйте в лс боту девушек! а он потом их по таймеру будет выкидывать в группу :)
/how_much_ero - посмотреть сколько картинок осталось в очереди в таймере
/random - выбросить число от 0 до 100
/search (текст) - выполнить поиск картинки по запросу
/search_more - получить другую картинку по прошлому запросу (можно выполнять много раз)`
  bot.sendMessage(msg.chat.id, response);
});

bot.onText(/\/echo (.+)/, (msg, match) => {
  if (authCheck(msg) != true) return

  let text = match[1];
  bot.sendMessage(msg.chat.id, text);
});

bot.onText(/\/id/, (msg) => {
  if (authCheck(msg) != true) return

  bot.sendMessage(msg.chat.id, msg.chat.id+' - id этого чата');
  bot.sendMessage(msg.chat.id, msg.from.id+' - а это ваш id');
})

bot.onText(/\/photo (https?:\/\/\S+)/, (msg, match) => {
  if (authCheck(msg) != true) return

  let link = match[1];
  bot.sendPhoto(groupChat, link);
})

bot.onText(/\/sendto (\-[0-9]+|[0-9]+) (\S+.*)/, (msg, match) => {
  if (authCheck(msg) != true) return
  
  let id = match[1];
  let text = match[2];
  bot.sendMessage(id, text);
})

// таймер на выдачу картинок
let eroTimer = null
bot.onText(/\/set_ero_timer ([0-9]+)/, (msg, match) => {
  if (adminCheck(msg) != true) {
    bot.sendMessage(msg.chat.id, 'Только для посвященных')
    return
  }
  
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
    takePhotoFromBuffer("./list/ero.txt", groupChat, false)
  }, interval);
  // если всё прошло успешно и без ошибок, далее следует сообщение в группу
  bot.sendMessage(groupChat, 'Буду присылать картинки каждые '+hours+' часов')
});

bot.onText(/\/stop_ero_timer/, (msg) => {
  if (adminCheck(msg) != true) {
    bot.sendMessage(msg.chat.id, 'Только для посвященных')
    return
  }

  stopTimer(eroTimer)
  // при остановке таймера группа об этом оповещается
  bot.sendMessage(groupChat, 'Таймер картинок остановлен')
});

bot.onText(/\/add_ero (https?:\/\/\S+)/, (msg, match) => {
  if (authCheck(msg) != true) return

  let link = match[1];
  fs.appendFile("./list/images.txt", ' '+link, function(error){
    if(error) throw error; // если возникла ошибка)
    bot.sendMessage(msg.chat.id, 'Картинка добавлена в очередь!')
  });
});

bot.onText(/\/how_much_ero/, (msg) => {
  if (authCheck(msg) != true) return

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
});

// выкинуть случайное число от 0 до 100 (другой способ)
bot.onText(/\/random$/, (msg) => {
  if (authCheck(msg) != true) return

  let roundRoll =  Math.round(random(0,100))
  bot.sendMessage(msg.chat.id, msg.from.first_name+' выбросил '+roundRoll)
});

// поиск картинки по запросу с выдачей первого результата
bot.onText(/\/search (.+)/, (msg, match) => {
  if (authCheck(msg) != true) return

  let text = match[1];
  // обнуляю файл после предыдущего запроса
  fs.writeFileSync("./list/search.txt", '', function(error){
    if(error) throw error; // если возникла ошибка
  });
  search(text)

  bot.sendMessage(msg.chat.id, 'Ищу '+text+'. Результат ждите через 3 секунды');
  setTimeout(function() {
    takePhotoFromBuffer("./list/search.txt",  msg.chat.id, false)
  }, 3000);
});

// если нужно следующий результат
bot.onText(/\/search_more/, (msg) => {
  if (authCheck(msg) != true) return

  takePhotoFromBuffer("./list/search.txt", msg.chat.id, false)
});

bot.onText(/\/bot (.+)/, (msg, match) => {
  if (authCheck(msg) != true) return

  let text = match[1];
  let id = msg.chat.id;
  talk(text, id);
});

 // --- конец логики бота --- //