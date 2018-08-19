import config from './secret/config';

const https = require('https')
const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(config.token, { polling: true });
const apiai = require('apiai');
const dialogflow = apiai(config.dialogFlowClientAccessToken);
const cloudconvert = new (require('cloudconvert'))(config.cloudConvertApiKey);
const groupChat = -307924393
const creator = 353140575

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
// проверка, является ли запрашивающий админом 
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
// достать ссылку из .txt файла (path), отослать по id (where) 
// и сообщать об оставшемся кол-ве картинок в буфере (howMuchLeft)
function takePhotoFromBuffer(path, sendTo, howMuchLeftFlag) {
  // открываем файл-буфер со ссылками
  fs.readFile(path, "utf8", function (error, data) {
    if (error) throw error; // если возникла ошибка
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
    fs.writeFile(path, string, function (error) {
      if (error) throw error; // если возникла ошибка)
    });
  });
}
// dialogflow и гугл нейросети, которые говорят с тобой!
function talk(text, id) {
  let talkRequest = dialogflow.textRequest(text, {
    sessionId: 'Canadian_bot_talk_to_you'
  });

  talkRequest.on('response', function (response) {
    let answer = response.result.fulfillment.speech
    if (answer == '') bot.sendMessage(id, 'Я не знаю, что тебе на это ответить.');
    bot.sendMessage(id, answer);
  });

  talkRequest.on('error', function (error) {
    if (error) bot.sendMessage(id, 'Я не могу тебе ответить по техническим причинам.');
    console.log(error);
  });

  talkRequest.end();
}
// заменяет несимвольные разделители или много пробелов одним пробелом 
// и передает полученную строку в другой файл, о чем затем оповещает
function replacer(path1, path2, id) {
  // достать данные из path1
  fs.readFile(path1, "utf8", function (error, data) {
    if (error) throw error; // если возникла ошибка
    let string = data
    // вставить данные в path2
    fs.appendFile(path2, string + ' ', function (error) {
      if (error) throw error; // если возникла ошибка)
      // достать данные из path2 и отформатировать
      fs.readFile(path2, "utf8", function (error, data) {
        if (error) throw error; // если возникла ошибка
        let string2 = data.replace(/\s+/g, ' ')
        // отформатированное записать обратно
        fs.writeFile(path2, string2, function (error) {
          if (error) throw error; // если возникла ошибка
          bot.sendMessage(id, `Перемещение закончено`)
        })
      })
    })
    // очистить файл path1
    fs.writeFile(path1, '', function (error) {
      if (error) throw error; // если возникла ошибка
    })
  })
}
// генерирует пароль
function passGenerator(length, charSet) {
  charSet = charSet || 'abcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
      let randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz,randomPoz+1);
  }
  return randomString;
}
// выставляет эро-таймер ровно на начало следующего часа
function eroInit() {
  let date = new Date;
  let dateNum1 = +date

  let hour = date.getHours()
  // let minutes = date.getMinutes()
  // let seconds = date.getSeconds()
  date.setHours(hour+1)
  date.setMinutes(0)
  date.setSeconds(0)

  let dateNum2 = +date
  let dateDifference = dateNum2 - dateNum1
  let additionalZero_min = date.getMinutes()<10?'0':''
  let hourGMT3 = date.getHours()+3
  let correctHour = hourGMT3>24?hourGMT3-24:hourGMT3
  let additionalZero_hour = correctHour<10?'0':''

  bot.sendMessage(groupChat, `Картинки будут присланы в ${additionalZero_hour}${correctHour}:${additionalZero_min}${date.getMinutes()}, далее с интервалом в ${eroInterval/3600000} ч.`, )

  setTimeout(() => {
    takePhotoFromBuffer("./list/ero.txt", groupChat, false)
    eroTimer = setInterval(function () {
      takePhotoFromBuffer("./list/ero.txt", groupChat, false)
    }, eroInterval);
  }, dateDifference)
}

// --- конец объявления функций --- //
// --- начало объявления флагов и настроек --- //

let eroInterval = 3600000*3
let eroTimerStateFlag = 'enabled'
let downloadEnabledFlag = 'enabled'

// выдает настройки бота
bot.onText(/\/settings/, (msg) => {
  if (authCheck(msg) != true) return

  bot.sendMessage(msg.chat.id, 
`Настройки:
- eroInterval: ${eroInterval/3600000} ч. - ${eroTimerStateFlag}
- download: ${downloadEnabledFlag}`)
});

// --- конец объявления флагов и настроек --- //
// --- начало логики бота --- //

// при начале работы выдает сообщение и стартует eroTimer
bot.sendMessage(creator, `Бот инициализирован`)
let eroTimer
eroInit()

// позволяет загрузить файл на сервер
bot.onText(/\/download$/, (msg) => {
  if (authCheck(msg) != true || downloadEnabledFlag != 'enabled') return

  bot.sendMessage(msg.chat.id, 'Готов загрузить файл на сервер')

  return new Promise((resolve, reject) => {
    bot.on('document', (msg) => {    
      let name = msg.document.file_name
      let responseText
      let errorText

      let filePath = bot.downloadFile(msg.document.file_id, './download/').then(
        (filePath) =>  {
          fs.rename(filePath, './download/'+name, (error, data) => {
            if (error) throw error; // если возникла ошибка
          })
          responseText = 'Файл успешно загружен.'
          resolve(responseText)
        }, 
        (e) => { 
          errorText = 'Файл не загрузился, какая-то ошибка.'
          console.log(e) 
          reject(errorText)
      })
    })
  }).then(
    (responseText) => bot.sendMessage(msg.chat.id, responseText),
    (errorText) =>bot.sendMessage(msg.chat.id, errorText)
  )
})

// включение и отключение возможности загрузки файлов
bot.onText(/\/download_(enabled|disabled)/, (msg, match) => {
  if (adminCheck(msg) != true) {
    bot.sendMessage(msg.chat.id, 'Только для посвященных')
    return
  }

  let response = ''
  downloadEnabledFlag = match[1]

  switch(downloadEnabledFlag) {
    case 'enabled': response = 'Загрузка файлов разрешена'; break
    case 'disabled': response = 'Загрузка файлов запрещена'; break
  }
  bot.sendMessage(msg.chat.id, response)
})

bot.onText(/\/help/, (msg) => {
  if (authCheck(msg) != true) return
  let response =
`Привет, ${msg.from.first_name}. Имеются следующие команды:\n
- /admin_help - админ-команды (доступна админам)
- /settings - настройки и флаги бота
- /echo (текст) - повторяет текст
- /id - выдает id группового чата и ваш
- /photo (url-ссылка на картинку) - пишете команду боту в лс, он шлет фото, размещенное по ссылке, в группу
- /sendto (id) (текст) - пишете боту в лс id адресата и текст сообщения. При условии, что человек прописал у бота /start, ему придет сообщение с текстом от имени бота
- /how_much_ero - посмотреть сколько картинок осталось в очереди в таймере
- /roll - выбросить число от 0 до 100
- /roll (число1) (число2) - выбросить число от (числа1) до (числа2)
- /search (текст) - выполнить поиск картинки по запросу
- /search_more - получить другую картинку по прошлому запросу (можно выполнять много раз)
- /remind_me (текст) через (число) (минут/дней/часов - можно в любом склонении) - напомнит вам в личку через заданное время то что вы написали в (тексте), при условии, что вы прописали у бота /start
- /pass_gen (число) - генерирует пароль длиной в (число) символов
- /convert (имя файла вместе с расширением) to (расширение без точки) - конвертирует файл из одного расширения в другое. Например: /convert example.png to jpg или /convert example2.docx to fb2
- !бот, (текст) - поговорить с ботом`
  bot.sendMessage(msg.chat.id, response);
});

bot.onText(/\/admin_help/, (msg) => {
  if (adminCheck(msg) != true) return
  let response =
`Привет, ${msg.from.first_name}. Имеются следующие команды:\n
- /set_ero_timer (время) - установить таймер отсылки картинок, время в часах
- /stop_ero_timer - остановить таймер отсылки картинок
- /ero_replacer - из savefrom списка в список таймера
- /download_(enabled/disabled)  - вкл./откл. возможность загрузки файлов на сервер`
  bot.sendMessage(msg.chat.id, response);
});

bot.onText(/\/echo (.+)/, (msg, match) => {
  if (authCheck(msg) != true) return

  let text = match[1];
  bot.sendMessage(msg.chat.id, text);
});

bot.onText(/\/id/, (msg) => {
  if (authCheck(msg) != true) return

  bot.sendMessage(msg.chat.id, msg.chat.id + ' - id этого чата');
  bot.sendMessage(msg.chat.id, msg.from.id + ' - а это ваш id');
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
  eroInterval = 1000 * 60 * 60 * hours
  eroTimerStateFlag = 'enabled'
  // инициализация таймера
  eroTimer = setInterval(function () {
    takePhotoFromBuffer("./list/ero.txt", groupChat, false)
  }, eroInterval);
  // если всё прошло успешно и без ошибок, далее следует сообщение в группу
  bot.sendMessage(groupChat, 'Буду присылать картинки каждые ' + hours + ' часов')
});

bot.onText(/\/stop_ero_timer/, (msg) => {
  if (adminCheck(msg) != true) {
    bot.sendMessage(msg.chat.id, 'Только для посвященных')
    return
  }

  stopTimer(eroTimer)
  eroTimerStateFlag = 'disabled'
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

// выкинуть случайное число от 0 до 100
bot.onText(/(\/roll$)/, (msg) => {
  if (authCheck(msg) != true) return

  let min = 0
  let max = 100
  let roll = Math.random() * (max - min) + min
  let roundRoll = Math.round(roll)

  bot.sendMessage(msg.chat.id, msg.from.first_name + ' выбросил ' + roundRoll)
});

// выкинуть случайное число в заданном интервале
bot.onText(/\/roll ([0-9]+) ([0-9]+)/, (msg, match) => {
  if (authCheck(msg) != true) return
  
  let min = +match[1]
  let max = +match[2]
  let roll = Math.random() * (max - min) + min
  let roundRoll = Math.round(roll)

  bot.sendMessage(msg.chat.id, msg.from.first_name + ' выбросил ' + roundRoll)
});

// говорить с ботом
bot.onText(/!бот, (.+)/, (msg, match) => {
  if (authCheck(msg) != true) return

  let text = match[1];
  let id = msg.chat.id;
  talk(text, id);
});

// функция-напоминалка
bot.onText(/\/remind_me (.+) через (\d+) (минут|час|день|дня|дней)/, (msg, match) => {
  if (authCheck(msg) != true) return

  let id = msg.from.id
  let name = msg.from.first_name
  let note = match[1]
  let time = match[2]
  let timeMeasure = match[3]
  let timeToRemind;

  if (time < 1) {
    bot.sendMessage(msg.chat.id, 'Нельзя ставить значение времени меньше 1. Попробуй поменять размерность')
    return
  }

  if (timeMeasure === 'минут') {
    timeToRemind = 1000 * 60 * time
  } else
  if (timeMeasure === 'час') {
    timeToRemind = 1000 * 60 * 60 * time
  } else {
    timeToRemind = 1000 * 60 * 60 * 24 * time
  }

  setTimeout(() => {
    bot.sendMessage(id, name + ', ты просил напомнить: ' + note)
  }, timeToRemind)

  bot.sendMessage(msg.chat.id, 'Хорошо, ' + name + ', я обязательно напомню... если не забуду')
});

// простенький генератор пароля
bot.onText(/\/pass_gen ([0-9]+)/, (msg, match) => {
  if (authCheck(msg) != true) return

  let length = match[1]
  let pass = passGenerator(length)
  bot.sendMessage(msg.chat.id, 'Сгенерирован пароль: '+pass)
});

// конвертер
bot.onText(/\/convert (.+)\.(.+) to (.+)/, (msg, match) => {
  if (authCheck(msg) != true) return
  
  let inputfileName = match[1]+'.'+match[2]
  let inputFormat = match[2]
  let outputFormat = match[3]
  let outputFileName = match[1]+'.'+match[3]

  bot.sendMessage(msg.chat.id, 'Приступаю к конвертированию, придется немного подождать')
  fs.createReadStream('./download/'+inputfileName)
  .pipe(cloudconvert.convert({
      inputformat: inputFormat,
      outputformat: outputFormat
  }))
  .pipe(fs.createWriteStream('./download/converted/'+outputFileName))
  .on('finish', function() {
      bot.sendDocument(msg.chat.id, './download/converted/'+outputFileName)
  })
  .on('error', function() {
    bot.sendMessage(msg.chat.id, 'Случилась какая-то ошибка. Конвертировать не удалось =/')
  })
});

// --- конец логики бота --- //