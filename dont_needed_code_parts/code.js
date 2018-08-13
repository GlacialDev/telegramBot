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

// выкинуть случайное число от 0 до 100
bot.onText(/(\/roll$)/, (msg) => {
  if (authCheck(msg) != true) return
  let min = 0
  let max = 100
  let roll = Math.random() * (max - min) + min
  let roundRoll =  Math.round(roll)
  bot.sendMessage(msg.chat.id, msg.from.first_name+' выбросил '+roundRoll)
});

// выкинуть случайное число в заданном интервале
bot.onText(/\/roll ([0-9]+) ([0-9]+)/, (msg, match) => {
  if (authCheck(msg) != true) return
  let min = +match[1]
  let max = +match[2]
  let roll = Math.random() * (max - min) + min
  let roundRoll =  Math.round(roll)
  bot.sendMessage(msg.chat.id, msg.from.first_name+' выбросил '+roundRoll)
});

// записывает указанное число рандомных чисел в .txt файл на сервере
bot.onText(/\/random_file ([0-9]+)/, (msg, match) => {
  if (authCheck(msg) != true) return
  // обнуление файла
  fs.writeFileSync("./list/random.txt", '', function(error){
    if(error) throw error; // если возникла ошибка
  });

  let times = match[1]
  for(let i = 0; i < times; i++) {
    let roundRoll =  Math.round(random(0,100))
    let text = roundRoll+' ';
    
    fs.appendFileSync("./list/random.txt", text, function(error){
      if(error) throw error; // если возникла ошибка
    });
  }

  bot.sendDocument(msg.chat.id, "./list/random.txt");
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
  fs.writeFile(`id_name/${message.from.id}_${message.from.first_name}.txt`, text, function(error){
    if(error) throw error; // если возникла ошибка
  });
}