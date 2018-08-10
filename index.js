import token from './token';

const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token(), { polling: true });
const groupChat = -307924393
const creator = 353140575

// --- начало объявления флагов --- //

let writeWhoAskFlag = true;
// функция для переключения флага через бота
bot.onText(/\/flag_whoask (1)|\/flag_whoask (0)/, (message, match) => {
  let flag = match[1]
  console.log(flag);
  if(flag === 1) writeWhoAskFlag = true
  else if(flag === 0) writeWhoAskFlag = false
  bot.sendMessage(message.chat.id, `Флаг writeWhoAskFlag = ${writeWhoAskFlag}`);
});

// --- конец объявления флагов --- //
// --- начало объявления функций --- //

// функция записывает id_имя человека
function writeWhoAsk(message) {
  let text = message.from.id+' : '+message.from.first_name;
  fs.writeFile(`id_name/${message.from.id}_${message.from.first_name}.txt`, text, function(error){
    if(error) throw error; // если возникла ошибка
  });
}

function stopTimer(timerName) {
  clearInterval(timerName)
  timerName = null
}

// --- конец объявления функций --- //
// --- начало логики бота --- //

bot.sendMessage(creator, 
`Бот инициализирован со следующими настройками:
flag writeWhoAskFlag = ${writeWhoAskFlag}`)

bot.onText(/\/help/, (msg) => {
  let response = 
`Привет, ${message.from.first_name}. Имеются следующие команды:\n
/echo (text) - повторяет текст
/id - выдает id группового чата и ваш
/photo (link) - пишете команду боту в лс, он шлет фото, размещенное по ссылке, в группу
/sendto (id) (text) - пишете боту в лс id адресата и текст сообщения. При условии, что человек прописал у бота /start, ему придет сообщение с текстом от имени бота
/write (text) - записать текст в файл на сервере
/read - прочесть текст, записанный в файле командой /write
/note - прислать txt файл с текстом, записанным в последний раз командой /write
/timer (number) (number) - пишете команду, желаемый часовой пояс (числом, например +3) и желаемую периодичность оповещений в минутах
/stoptimer - остановить таймер`
    bot.sendMessage(message.chat.id, response);
  if (writeWhoAskFlag) writeWhoAsk(msg);
});

bot.onText(/\/echo (.+)/, (msg, match) => {
  let resp = match[1];
  bot.sendMessage(msg.chat.id, resp);
  if (writeWhoAskFlag) writeWhoAsk(msg);
});

bot.onText(/\/id/, (msg) => {
  bot.sendMessage(msg.chat.id, msg.chat.id+' - id этого чата');
  bot.sendMessage(msg.chat.id, msg.from.id+' - а это ваш id');
  if (writeWhoAskFlag) writeWhoAsk(msg);
})

bot.onText(/\/photo (https?:\/\/\S+)/, (msg, match) => {
  let resp = match[1];
  bot.sendPhoto(groupChat, resp);
  if (writeWhoAskFlag) writeWhoAsk(msg);
})

bot.onText(/\/sendto (\-[0-9]+|[0-9]+) (\S+.*)/, (msg, match) => {
  let id = match[1];
  let text = match[2];
  bot.sendMessage(id, text);
  if (writeWhoAskFlag) writeWhoAsk(msg);
})

bot.onText(/\/write (.+)/, (msg, match) => {
  let text = match[1];
  fs.writeFile("note.txt", text, function(error){
    if(error) throw error; // если возникла ошибка
    let data = fs.readFileSync("note.txt", "utf8");
    bot.sendMessage(msg.chat.id, "Записано: "+data)
  });
  if (writeWhoAskFlag) writeWhoAsk(msg);
});

bot.onText(/\/read/, (msg) => {
  fs.readFile("note.txt", "utf8", function(error,data){
    if(error) throw error; // если возникла ошибка
    bot.sendMessage(msg.chat.id,"Содержимое файла: "+data)
  });
  if (writeWhoAskFlag) writeWhoAsk(msg);
});

bot.onText(/\/note/, (msg) => {
  const note = './note.txt';
  bot.sendDocument(msg.chat.id, note);
  if (writeWhoAskFlag) writeWhoAsk(msg);
});

let timer = null
bot.onText(/\/timer (\-[0-9]+|0|\+[0-9]+) (\-[0-9]+|[0-9]+)/, (msg, match) => {
  stopTimer(timer)
  let gmt = match[1]
  let minutes = match[2]

  if (minutes < 1) {
    bot.sendMessage(groupChat, 'Нельзя ставить время меньше 1 минуты, это может плохо кончиться для всех :(')
    stopTimer(timer)
    return
  }

  let offset = 1000 * 3600 * gmt
  let interval = 1000*60*minutes
  timer = setInterval(function() {
    let time = +new Date() + offset;
    bot.sendMessage(groupChat, new Date(time));
  }, interval);

  bot.sendMessage(groupChat, 'Буду присылать время по часовому поясу gmt'+gmt+' каждые '+minutes+' минут')
  if (writeWhoAskFlag) writeWhoAsk(msg);
});

bot.onText(/\/stoptimer/, (msg) => {
  stopTimer(timer)
  bot.sendMessage(groupChat, 'Таймер остановлен')
  if (writeWhoAskFlag) writeWhoAsk(msg);
});

// --- конец логики бота --- //