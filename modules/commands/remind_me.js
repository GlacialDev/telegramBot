import authCheck from '../functions/authCheck'
import bot from '../../variables'

// функция-напоминалка

export default function remind_me() {
  bot.onText(/\/remind_me (.+) через (\d+) (минут|час|день|дня|дней)/, (msg, match) => {
        if (authCheck(msg) != true) return
      
        let id = msg.from.id
        let name = msg.from.first_name
        let note = match[1]
        let time = match[2]
        let timeMeasure = match[3]
        let timeToRemind;
      
        if (time < 1) {
          bot.sendMessage(msg.chat.id, 'Нельзя ставить значение времени меньше 1. Попробуй поменять размерность')
          return
        }
      
        if (timeMeasure === 'минут') {
          timeToRemind = 1000 * 60 * time
        } else
        if (timeMeasure === 'час') {
          timeToRemind = 1000 * 60 * 60 * time
        } else {
          timeToRemind = 1000 * 60 * 60 * 24 * time
        }
      
        setTimeout(() => {
          bot.sendMessage(id, name + ', ты просил напомнить: ' + note)
        }, timeToRemind)
      
        bot.sendMessage(msg.chat.id, 'Хорошо, ' + name + ', я обязательно напомню... если не забуду')
    });
}