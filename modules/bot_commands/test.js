import variables from '../variables/variables'
import authCheck from '../functions/authCheck'
import config from '../secret/config';

let bot = variables.bot

export default function test() {
    bot.onText(/\/test/, (msg, match) => {
        if (authCheck(msg) != true) return

    });
} 