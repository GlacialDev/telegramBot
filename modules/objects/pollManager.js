import variables from '../variables/variables';
import poll from './poll'

let bot = variables.bot

let pollManager = {
    store = [],
    
    createPoll: (title, answers, id, msg) => {
        let pollObject = new poll(title, answers, id)
        this.store.push([id, pollObject])

        pollObject.make_poll(msg)
    }
}