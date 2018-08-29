import variables from '../variables/variables'

let fs = variables.fs

export default function getEroPhotoLink(path) {
    // открываем файл-буфер со ссылками
    fs.readFile(path, "utf8", function (error, data) {
      if (error) throw error; // если возникла ошибка
      // разбиваем содержимое файла на массив и достаем оттуда одну ссылку
      let array = data.split(' ');
      let link = array.shift();
      // массив без элемента который мы достали shift-ом преобразуем в строку
      let string = array.join(' ')
      // и грузим обратно в файл-буфер
      fs.writeFile(path, string, function (error) {
        if (error) throw error; // если возникла ошибка)
      });
      return new Promise((resolve, reject) => {
        if (link == '') {
            console.log('in reject')
            reject()
        } else {
            console.log(link+' in resolve')
            resolve(link)
        }
      })
    });
  }