import variables from '../variables/variables'
import pollManager from '../objects/pollManager'
import channelManager from '../channel_management/channelManager'
import voiceMesManager from '../objects/voiceMesManager'
import talk from '../functions/talk'
import config from '../../modules/secret/config'

let bot = variables.bot
let server = variables.server
let db = variables.db
let isDatabaseOn

export default function botInit() {
    bot.sendMessage(variables.creator, `Бот инициализирован.`)
    channelManager.initEroTimer()

    db.connect('mongodb://localhost:27017', 'second', (err) => {
        if (err) {
            isDatabaseOn = false
            console.log('Database is not available, reactions/polls disabled')
        }
        server.listen(3012, () => {
            isDatabaseOn = true
            console.log('Database is available, reactions/polls enabled')
        })
    })
    
    // проверка на наличие включенной базы данных
    if (isDatabaseOn) {
        bot.on('callback_query', function (msg) {
            let data = msg.data.split('_')
            if (data[0] == 'poll') pollManager.updatePoll(msg, data)
            if (data[0] == 'reaction') pollManager.updateReaction(msg, data)
        })
    }

    // проверка на наличие ключа от яндекс спичкит ключа
    if (config.yandexSpeechKitKey) {
        bot.on('message', (msg) => {
            if (msg.voice) {
                voiceMesManager.speechConvert(msg).then((answer) => {
                    if (variables.dialogflow_voiceConvMode) {
                        talk(answer, msg.chat.id)
                    } else {
                        bot.sendMessage(msg.chat.id, msg.from.first_name + ' говорит: ' + answer)
                    }
                }).catch((e) => console.log(e))
            }
        })
    }
}