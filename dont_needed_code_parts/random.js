const crypto = require('crypto')
const format = require('biguint-format')

// функции для генерации случайных чисел
function randomC(qty) {
    let x = crypto.randomBytes(qty);
    return format(x, 'dec');
  }
  function random(low, high) {
    return randomC(4) / Math.pow(2, 4 * 8) * (high - low) + low;
  }
  // выкинуть случайное число от 0 до 100 (другой способ)
  bot.onText(/\/random/, (msg) => {
    if (authCheck(msg) != true) return
  
    let roundRoll =  Math.round(random(0,100))
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