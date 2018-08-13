// на сервере есть файл note.txt куда по этой команде бот записывает текст
bot.onText(/\/write (.+)/, (msg, match) => {
  let text = match[1];
  fs.writeFile("note.txt", text, function(error){
    if(error) throw error; // если возникла ошибка
    let data = fs.readFileSync("note.txt", "utf8");
    bot.sendMessage(msg.chat.id, "Записано: "+data)
  });
  if (writeWhoAskFlag) writeWhoAsk(msg);
});

// а по этой читает текст в note.txt
bot.onText(/\/read/, (msg) => {
  fs.readFile("note.txt", "utf8", function(error,data){
    if(error) throw error; // если возникла ошибка
    bot.sendMessage(msg.chat.id,"Содержимое файла: "+data)
  });
  if (writeWhoAskFlag) writeWhoAsk(msg);
});

// а по этой скидывает документом note.txt в конфу
bot.onText(/\/note/, (msg) => {
  const note = './note.txt';
  bot.sendDocument(msg.chat.id, note);
  if (writeWhoAskFlag) writeWhoAsk(msg);
});

// выкинуть случайное число от 0 до 100
bot.onText(/(\/roll$)/, (msg) => {
  let min = 0
  let max = 100
  let roll = Math.random() * (max - min) + min
  let roundRoll =  Math.round(roll)
  bot.sendMessage(msg.chat.id, msg.from.first_name+' выбросил '+roundRoll)

  if (writeWhoAskFlag) writeWhoAsk(msg);
});

// выкинуть случайное число в заданном интервале
bot.onText(/\/roll ([0-9]+) ([0-9]+)/, (msg, match) => {
  let min = +match[1]
  let max = +match[2]
  let roll = Math.random() * (max - min) + min
  let roundRoll =  Math.round(roll)
  bot.sendMessage(msg.chat.id, msg.from.first_name+' выбросил '+roundRoll)
  
  if (writeWhoAskFlag) writeWhoAsk(msg);
});

// записывает указанное число рандомных чисел в .txt файл на сервере
bot.onText(/\/random_file ([0-9]+)/, (msg, match) => {
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

  if (writeWhoAskFlag) writeWhoAsk(msg);
});

// записывает указанное число рандомных чисел в .txt файл на сервере
bot.onText(/\/roll_file ([0-9]+)/, (msg, match) => {
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

  if (writeWhoAskFlag) writeWhoAsk(msg);
});

// то же самое, что в таймере, но вручную по команде /give_ero
bot.onText(/\/give_ero/, (msg) => {
  takeFromBuffer("./list/ero.txt", msg.chat.id, true)
  if (writeWhoAskFlag) writeWhoAsk(msg);
});