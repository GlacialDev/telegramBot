function help(message) {
    console.log('внутри helpa')
    console.log(message)
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
}
export default help;