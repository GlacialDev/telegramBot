import token from './token';

const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token(), { polling: true });
const groupChat = -307924393

// функция записывает id_имя человека
function writeWhoAsk(message) {
  let text = message.from.id+' : '+message.from.first_name;
  fs.writeFile(`id_name/${message.from.id}_${message.from.first_name}.txt`, text, function(error){
    if(error) throw error; // если возникла ошибка
  });
}

function stopTimer() {
  clearInterval(timer)
  timer = null
}

import help from './functions/help'
bot.onText(/\/help/, (msg) => {
  help(msg)
  writeWhoAsk(msg);
});

bot.onText(/\/echo (.+)/, (msg, match) => {
  let resp = match[1];
  bot.sendMessage(msg.chat.id, resp);
  writeWhoAsk(msg);
});

bot.onText(/\/id/, (msg) => {
  bot.sendMessage(msg.chat.id, msg.chat.id+' - id этого чата');
  bot.sendMessage(msg.chat.id, msg.chat.from+' - а это ваш id');
  writeWhoAsk(msg);
})

bot.onText(/\/photo (https?:\/\/\S+)/, (msg, match) => {
  let resp = match[1];
  bot.sendPhoto(groupChat, resp);
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

let timer = null
bot.onText(/\/timer (\-[0-9]+|0|\+[0-9]+) (\-[0-9]+|[0-9]+)/, (msg, match) => {
  stopTimer()
  let gmt = match[1]
  let minutes = match[2]
  if (minutes < 1) {
    bot.sendMessage(groupChat, 'Нельзя ставить время меньше 1 минуты, это может плохо кончиться для всех :(')
    stopTimer()
    return
  }
  let offset = 1000 * 3600 * gmt
  let interval = 1000*60*minutes

  timer = setInterval(function() {
    let time = +new Date() + offset;
    bot.sendMessage(groupChat, new Date(time));
  }, interval);

  bot.sendMessage(groupChat, 'Буду присылать время по часовому поясу gmt'+gmt+' каждые '+minutes+' минут')
  writeWhoAsk(msg);
});

bot.onText(/\/stoptimer/, (msg) => {
  stopTimer()
  bot.sendMessage(groupChat, 'Таймер остановлен')
  writeWhoAsk(msg);
});