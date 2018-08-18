import { bot, fs } from '../variables/variables'

// достать ссылку из .txt файла (path), отослать по id (where) 
// и сообщать об оставшемся кол-ве картинок в буфере (howMuchLeft)

export default function takePhotoFromBuffer(path, sendTo, howMuchLeftFlag) {
    // открываем файл-буфер со ссылками
    fs.readFile(path, "utf8", function (error, data) {
      if (error) throw error; // если возникла ошибка
      // разбиваем содержимое файла на массив и достаем оттуда одну ссылку
      let array = data.split(' ');
      let item = array.shift();
      // если ссылки кончились говорим что всё хана заправляйте новыми
      if (item == '') item = 'Картинки кончились :('
      bot.sendPhoto(sendTo, item)
      // если требуется сообщить оставшееся количество картинок в буфере
      if (howMuchLeftFlag) {
        let number = array.length;
        bot.sendMessage(sendTo, `У меня в запасе осталось ${number} картинок`)
      }
      // массив без элемента который мы достали shift-ом преобразуем в строку
      let string = array.join(' ')
      // и грузим обратно в файл-буфер
      fs.writeFile(path, string, function (error) {
        if (error) throw error; // если возникла ошибка)
      });
    });
  }