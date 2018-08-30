import variables from '../../variables/variables'

let fs = variables.fs

export default function getEroPhotoLink(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf8", function (error, data) {
            if (error) throw error; // если возникла ошибка
            // разбиваем содержимое файла на массив и достаем оттуда одну ссылку
            let array = data.split(' ');
            let link = array.shift();
            // если ссылки кончились говорим что всё хана заправляйте новыми
            if (link == '') reject('Картинки кончились :(')
            // массив без элемента который мы достали shift-ом преобразуем в строку
            let string = array.join(' ')
            // и грузим обратно в файл-буфер
            fs.writeFile(path, string, function (error) {
                if (error) throw error; // если возникла ошибка)
            });
            resolve(link)
        })
    })
}