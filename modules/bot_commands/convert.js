import variables from '../variables/variables'
import authCheck from '../functions/authCheck'

let bot = variables.bot
let fs = variables.fs
let cloudconvert = variables.cloudconvert

export default function convert() {
    bot.onText(/\/convert (.+)\.(.+) to (.+)/, (msg, match) => {
        if (authCheck(msg) != true) return

        let inputfileName = match[1] + '.' + match[2]
        let inputFormat = match[2]
        let outputFormat = match[3]
        let outputFileName = match[1] + '.' + match[3]

        bot.sendMessage(msg.chat.id, 'Приступаю к конвертированию, придется немного подождать')
        fs.createReadStream('./data/download/' + inputfileName)
            .pipe(cloudconvert.convert({
                inputformat: inputFormat,
                outputformat: outputFormat
            }))
            .pipe(fs.createWriteStream('./data/converted/' + outputFileName))
            .on('finish', function () {
                bot.sendDocument(msg.chat.id, './data/converted/' + outputFileName)
            })
            .on('error', function () {
                bot.sendMessage(msg.chat.id, 'Случилась какая-то ошибка. Конвертировать не удалось =/')
            })
    });
}