import variables from '../variables/variables'
import authCheck from '../functions/authCheck'
import getRandomNum from '../functions/getRandomNum'

let bot = variables.bot

export default function roll() {
// выкинуть случайное число от 0 до 100
    bot.onText(/(\/roll$)/, (msg) => {
        if (authCheck(msg) != true) return

        let roundRoll = getRandomNum(0, 100)
    
        bot.sendMessage(msg.chat.id, msg.from.first_name + ' выбросил ' + roundRoll)
    });
    
    // выкинуть случайное число в заданном интервале
    bot.onText(/\/roll ([0-9]+) ([0-9]+)/, (msg, match) => {
        if (authCheck(msg) != true) return
        
        let min = +match[1]
        let max = +match[2]
        
        let roundRoll = getRandomNum(min, max)
    
        bot.sendMessage(msg.chat.id, msg.from.first_name + ' выбросил ' + roundRoll)
    });
}