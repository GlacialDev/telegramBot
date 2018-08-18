export default function authCheck(message) {
    let id = message.from.id
    let array = config.authorizedUsers
    let ok = false;
    for (let i = 0; i < array.length; i++) {
      if (id === array[i]) {
        ok = true
        return ok
      }
    }
  }