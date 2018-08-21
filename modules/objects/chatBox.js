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
        bot.sendMessage(chatBox.personTwoId, chatBox.personOneName+' предлагает поговорить. Если вы согласны, введите /chat_agree (свое имя). Если нет - введите /chat_disagree')

        return new Promise((resolve, reject) => {
            bot.onText(/\/chat_agree (.+)/, (msg, match) => {
                if (msg.from.id == chatBox.personTwoId) {
                    chatBox.personTwoName = match[1]
                    chatBox.personTwoAgree = true
                    resolve()
                }
            })
            bot.onText(/\/chat_disagree/, (msg) => {
                if (msg.from.id == chatBox.personTwoId) {
                    reject()
                }
            })
        }).then(
            () => {
                bot.sendMessage(chatBox.personOneId, 'Собеседник '+chatBox.personTwoName+' готов к разговору.')
                bot.sendMessage(chatBox.personTwoId, 'Собеседник '+chatBox.personOneName+' готов к разговору.')
            },
            () => chatBox.reset()
        )
    },
    transitMessages: (msg) => {
        if(chatBox.personOneAgree == true && chatBox.personTwoAgree == true) {
            if (msg.from.id == chatBox.personOneId) bot.sendMessage(chatBox.personTwoId, chatBox.personOneName+' написал: '+msg.text)
            if (msg.from.id == chatBox.personTwoId) bot.sendMessage(chatBox.personOneId, chatBox.personTwoName+' написал: '+msg.text)
        }
    },
    reset: () => {
        if (chatBox.personOneAgree == true && chatBox.personTwoAgree != true) bot.sendMessage(personOneId, 'Второй собеседник не хочет сейчас говорить')
        if (chatBox.personOneAgree == true && chatBox.personTwoAgree == true) {
            bot.sendMessage(chatBox.personOneId, 'Разговор завершен')
            bot.sendMessage(chatBox.personTwoId, 'Разговор завершен')
        }

        chatBox.personOneId = null
        chatBox.personOneName = null
        chatBox.personOneAgree = null
    
        chatBox.personTwoId = null
        chatBox.personTwoName = null
        chatBox.personTwoAgree = null
    },
    info: () => {
        console.log(chatBox.personOneId+' personOneId')
        console.log(chatBox.personOneName+' personOneName')
        console.log(chatBox.personOneAgree+' personOneAgree')
        console.log(chatBox.personTwoId+' personTwoId')
        console.log(chatBox.personTwoName+' personTwoName')
        console.log(chatBox.personTwoAgree+' personTwoAgree')
    }
}

export default chatBox