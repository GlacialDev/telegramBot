import variables from '../variables/variables'
import authCheck from '../functions/authCheck'
import config from '../secret/config';

let bot = variables.bot
let audioConverter = variables.audioConverter

export default function test() {
    bot.onText(/\/test/, (msg, match) => {
        if (authCheck(msg) != true) return

        audioConverter("./data/download/voice/", "./data/converted/", {
            progressBar: true
        }).then(function () {
            console.log("Done!");
        });
    });
} 