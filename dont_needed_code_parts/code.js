// то же самое, что в таймере, но вручную по команде /give_ero
bot.onText(/\/give_ero/, (msg) => {
    let array = null;
    let item = null;
    let string = null;
  
    // открываем файл-буфер со ссылками
    fs.readFile("./list/images.txt", "utf8", function(error,data){
      if(error) throw error; // если возникла ошибка
      // разбиваем содержимое файла на массив и достаем оттуда одну ссылку
      array = data.split(' ');
      item = array.shift();
      // если ссылки кончились говорим что всё хана заправляйте новыми
      if (item == '') item = 'Картинки кончились :('
      bot.sendMessage(msg.chat.id, item)
      // массив без элемента который мы достали pop()-ом преобразуем в строку
      string = array.join(' ')
      // и грузим обратно в файл-буффер
      fs.writeFile("./list/images.txt", string, function(error){
        if(error) throw error; // если возникла ошибка)
      });
    });
  
    if (writeWhoAskFlag) writeWhoAsk(msg);
});

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