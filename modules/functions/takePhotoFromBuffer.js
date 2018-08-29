import variables from '../variables/variables'

let bot = variables.bot
let fs = variables.fs

// достать ссылку из .txt файла (path), отослать по id (where) 
// и сообщать об оставшемся кол-ве картинок в буфере (howMuchLeft)

export default function takePhotoFromBuffer(path, sendTo, returnLinkBoolean) {
    // открываем файл-буфер со ссылками
    fs.readFile(path, "utf8", function (error, data) {
      if (error) throw error; // если возникла ошибка
      // разбиваем содержимое файла на массив и достаем оттуда одну ссылку
      let array = data.split(' ');
      let item = array.shift();
      if (returnLinkBoolean) {
        return item
      } else {
      // если ссылки кончились говорим что всё хана заправляйте новыми
      if (item == '') item = 'Картинки кончились :('
      bot.sendPhoto(sendTo, item)
      }
      // массив без элемента который мы достали shift-ом преобразуем в строку
      let string = array.join(' ')
      // и грузим обратно в файл-буфер
      fs.writeFile(path, string, function (error) {
        if (error) throw error; // если возникла ошибка)
      });
    });
  }