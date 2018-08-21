import variables from '../variables/variables'

let bot = variables.bot

let chatBox = {    
    personOneId : null,
    personOneName : null,
    personOneAgree : null,

    personTwoId : null,
    personTwoName : null,
    personTwoAgree : null,

    init: (msg, match) => {
        chatBox.personOneId = msg.from.id
        chatBox.personOneName = match[1]
        chatBox.personOneAgree = true
        chatBox.personTwoId = match[2]
    },
    ifAgreeAsk: () => {
        bot.sendMessage(chatBox.personTwoId, chatBox.personOneName+' предлагает поговорить. Если вы согласны, введите /chat_agree (свое имя). Если нет - введите что-то другое')

        return new Promise((resolve, reject) => {
            bot.onText(/\/chat_agree (.+)/, (msg, match) => {
                if (msg.from.id == chatBox.personTwoId && match[0] == '/chat_agree') {
                    let name = match[1]
                    resolve(name)
                }
                else if (msg.from.id == chatBox.personTwoId && match[0] != '/chat_agree') {
                    reject()
                }
            })
        }).then(
            (name) => {
                chatBox.personTwoName = name
                chatBox.personTwoAgree = true
                bot.sendMessage(chatBox.personOneId, 'Собеседник '+chatBox.personTwoName+' готов к разговору.')
                bot.sendMessage(chatBox.personTwoId, 'Собеседник '+chatBox.personOneName+' готов к разговору.')
            },
            () => chatBox.reset()
        )
    },
    transitMessages: (msg) => {
        if (msg.from.id == chatBox.personOneId) bot.sendMessage(chatBox.personTwoId, chatBox.personOneName+' написал: '+msg.text)
        if (msg.from.id == chatBox.personTwoId) bot.sendMessage(chatBox.personOneId, chatBox.personTwoName+' написал: '+msg.text)
    },
    reset: () => {
        if (chatBox.personOneAgree == true && chatBox.personTwoAgree != true) bot.sendMessage(personOneId, 'Второй собеседник не хочет сейчас говорить')
        if (chatBox.personOneAgree == true && chatBox.personTwoAgree == true) {
            bot.sendMessage(personOneId, 'Разговор завершен')
            bot.sendMessage(personTwoId, 'Разговор завершен')
        }

        chatBox.personOneId = null
        chatBox.personOneName = null
        chatBox.personOneAgree = null
    
        chatBox.personTwoId = null
        chatBox.personTwoName = null
        chatBox.personTwoAgree = null
    }
}

export default chatBox