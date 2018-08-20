import config from '../secret/config'

// проверка, является ли запрашивающий админом 

export default function adminCheck(message) {
    let id = message.from.id
    let array = config.adminUsers
    let ok = false;
    for (let i = 0; i < array.length; i++) {
      if (id === array[i]) {
        ok = true
        return ok
      }
    }
  }