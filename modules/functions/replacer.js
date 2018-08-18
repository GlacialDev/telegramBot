import { bot, fs }from '../variables/variables'

// заменяет несимвольные разделители или много пробелов одним пробелом 
// и передает полученную строку в другой файл, о чем затем оповещает

export default function replacer(path1, path2, id) {
    // достать данные из path1
    fs.readFile(path1, "utf8", function (error, data) {
      if (error) throw error; // если возникла ошибка
      let string = data
      // вставить данные в path2
      fs.appendFile(path2, string + ' ', function (error) {
        if (error) throw error; // если возникла ошибка)
        // достать данные из path2 и отформатировать
        fs.readFile(path2, "utf8", function (error, data) {
          if (error) throw error; // если возникла ошибка
          let string2 = data.replace(/\s+/g, ' ')
          // отформатированное записать обратно
          fs.writeFile(path2, string2, function (error) {
            if (error) throw error; // если возникла ошибка
            bot.sendMessage(id, `Перемещение закончено`)
          })
        })
      })
      // очистить файл path1
      fs.writeFile(path1, '', function (error) {
        if (error) throw error; // если возникла ошибка
      })
    })
  }