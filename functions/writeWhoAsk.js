//записывает каждого обратившегося участника в название .txt файла
function writeWhoAsk(message) {
    let text = message.from.id+' : '+message.from.first_name;
    fs.writeFile(`id_name/${message.from.id}_${message.from.first_name}.txt`, text, function(error){
        if(error) throw error; // если возникла ошибка
    });
}

export default writeWhoAsk;