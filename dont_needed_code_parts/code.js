// то же самое, что в таймере, но вручную по команде /give_ero
bot.onText(/\/give_ero/, (msg) => {
  takeFromBuffer("./list/ero.txt", msg.chat.id, true)
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


