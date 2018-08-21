// на сервере есть файл note.txt куда по этой команде бот записывает текст
bot.onText(/\/write (.+)/, (msg, match) => {
  if (authCheck(msg) != true) return
  let text = match[1];
  fs.writeFile("note.txt", text, function(error){
    if(error) throw error; // если возникла ошибка
    let data = fs.readFileSync("note.txt", "utf8");
    bot.sendMessage(msg.chat.id, "Записано: "+data)
  });
});

// а по этой читает текст в note.txt
bot.onText(/\/read/, (msg) => {
  if (authCheck(msg) != true) return
  fs.readFile("note.txt", "utf8", function(error,data){
    if(error) throw error; // если возникла ошибка
    bot.sendMessage(msg.chat.id,"Содержимое файла: "+data)
  });
});

// а по этой скидывает документом note.txt в конфу
bot.onText(/\/note/, (msg) => {
  if (authCheck(msg) != true) return
  const note = './note.txt';
  bot.sendDocument(msg.chat.id, note);
});

// записывает указанное число рандомных чисел в .txt файл на сервере
bot.onText(/\/roll_file ([0-9]+)/, (msg, match) => {
  if (authCheck(msg) != true) return
  // обнуление файла
  fs.writeFileSync("./list/roll.txt", '', function(error){
    if(error) throw error; // если возникла ошибка
  });

  let times = match[1]
  for(let i = 0; i < times; i++) {
    let min = 0
    let max = 100
    let roll = Math.random() * (max - min) + min
    let roundRoll =  Math.round(roll)
    let text = roundRoll+' ';
    
    fs.appendFileSync("./list/roll.txt", text, function(error){
      if(error) throw error; // если возникла ошибка
    });
  }

  bot.sendDocument(msg.chat.id, "./list/roll.txt");
});

// то же самое, что в таймере, но вручную по команде /give_ero
bot.onText(/\/give_ero/, (msg) => {
  if (authCheck(msg) != true) return
  
  takePhotoFromBuffer("./list/ero.txt", msg.chat.id, true)
});

bot.onText(/\/add_ero (https?:\/\/\S+)/, (msg, match) => {
  if (authCheck(msg) != true) return

  let link = match[1];
  fs.appendFile("./list/images.txt", ' '+link, function(error){
    if(error) throw error; // если возникла ошибка)
    bot.sendMessage(msg.chat.id, 'Картинка добавлена в очередь!')
  });
});

// таймер на дату
let timer = null
bot.onText(/\/set_date_timer (\-[0-9]+|0|\+[0-9]+) (\-[0-9]+|[0-9]+)/, (msg, match) => {
  if (authCheck(msg) != true) return
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
});

bot.onText(/\/stop_date_timer/, (msg) => {
  if (authCheck(msg) != true) return
  stopTimer(timer)
  bot.sendMessage(groupChat, 'Таймер остановлен')
});






// строка для записи id
// if (writeWhoAskFlag) writeWhoAsk(msg);
let writeWhoAskFlag = true;
// команда для переключения флага через бота
bot.onText(/\/flag_whoask ([0-1])/, (message, match) => {
  if (authCheck(msg) != true) return
  if(match[1] == 1) writeWhoAskFlag = true
  else if(match[1] == 0) writeWhoAskFlag = false
  bot.sendMessage(message.chat.id, `Флаг writeWhoAskFlag = ${writeWhoAskFlag}`);
});
// функция записывает id_имя человека в название и содержимое .txt файла на сервере
function writeWhoAsk(message) {
  let text = message.from.id+' : '+message.from.first_name;
  fs.writeFile(`./data/id_name/${message.from.id}_${message.from.first_name}.txt`, text, function(error){
    if(error) throw error; // если возникла ошибка
  });
}