import authCheck from '../functions/authCheck'
import bot from '../variables/variables'

export default function roll() {
// выкинуть случайное число от 0 до 100
    bot.onText(/(\/roll$)/, (msg) => {
        if (authCheck(msg) != true) return
    
        let min = 0
        let max = 100
        let roll = Math.random() * (max - min) + min
        let roundRoll = Math.round(roll)
    
        bot.sendMessage(msg.chat.id, msg.from.first_name + ' выбросил ' + roundRoll)
    });
    
    // выкинуть случайное число в заданном интервале
    bot.onText(/\/roll ([0-9]+) ([0-9]+)/, (msg, match) => {
        if (authCheck(msg) != true) return
        
        let min = +match[1]
        let max = +match[2]
        let roll = Math.random() * (max - min) + min
        let roundRoll = Math.round(roll)
    
        bot.sendMessage(msg.chat.id, msg.from.first_name + ' выбросил ' + roundRoll)
    });
}