import token from './token';

const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token(), { polling: true });

// функция записывает id_имя человека
function writeWhoAsk(message) {
  let text = message.from.id+' : '+message.from.first_name;
  fs.writeFile(`id_name/${message.from.id}_${message.from.first_name}.txt`, text, function(error){
    if(error) throw error; // если возникла ошибка
  });
}

bot.onText(/\/echo (.+)/, (msg, match) => {
  let resp = match[1];
  bot.sendMessage(msg.chat.id, resp);
  writeWhoAsk(msg);
});

bot.onText(/\/id/, (msg) => {
  bot.sendMessage(msg.chat.id, msg.chat.id+' - id этого чата');
  writeWhoAsk(msg);
})

bot.onText(/\/photo (https?:\/\/\S+)/, (msg, match) => {
  let resp = match[1];
  bot.sendPhoto(-307924393, resp);
  bot.sendMessage(-307924393, 'Счастья и хорошего настроения!');
  writeWhoAsk(msg);
})

bot.onText(/\/sendto (\-[0-9]+|[0-9]+) (\S+.*)/, (msg, match) => {
  let id = match[1];
  let text = match[2];
  bot.sendMessage(id, text);
  writeWhoAsk(msg);
})

bot.onText(/\/write (.+)/, (msg, match) => {
  let text = match[1];
  fs.writeFile("note.txt", text, function(error){
    if(error) throw error; // если возникла ошибка
    let data = fs.readFileSync("note.txt", "utf8");
    bot.sendMessage(msg.chat.id, "Записано: "+data)
  });
  writeWhoAsk(msg);
});

bot.onText(/\/read/, (msg) => {
  fs.readFile("note.txt", "utf8", function(error,data){
    if(error) throw error; // если возникла ошибка
    bot.sendMessage(msg.chat.id,"Содержимое файла: "+data)
  });
  writeWhoAsk(msg);
});

bot.onText(/\/note/, (msg) => {
  const note = './note.txt';
  bot.sendDocument(msg.chat.id, note);
  writeWhoAsk(msg);
});