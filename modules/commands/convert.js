import authCheck from '../functions/authCheck'

// конвертер файлов из одного расширения в другое

export default function convert(bot, fs, cloudconvert) {
    bot.onText(/\/convert (.+)\.(.+) to (.+)/, (msg, match) => {
        if (authCheck(msg) != true) return

        let inputfileName = match[1] + '.' + match[2]
        let inputFormat = match[2]
        let outputFormat = match[3]
        let outputFileName = match[1] + '.' + match[3]

        bot.sendMessage(msg.chat.id, 'Приступаю к конвертированию, придется немного подождать')
        fs.createReadStream('./download/' + inputfileName)
            .pipe(cloudconvert.convert({
                inputformat: inputFormat,
                outputformat: outputFormat
            }))
            .pipe(fs.createWriteStream('./download/converted/' + outputFileName))
            .on('finish', function () {
                bot.sendDocument(msg.chat.id, './download/converted/' + outputFileName)
            })
            .on('error', function () {
                bot.sendMessage(msg.chat.id, 'Случилась какая-то ошибка. Конвертировать не удалось =/')
            })
    });
}