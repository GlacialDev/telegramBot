import config from './secret/config'

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(config.token, { polling: true });

let variables = {
    creator : 353140575,
    groupChat : -307924393,
    bot : bot
}

export default variables


// const creator = 353140575
// const groupChat = -307924393
// const https = require('https')
// const apiai = require('apiai')
// const dialogflow = apiai(config.dialogFlowClientAccessToken);
// const cloudconvert = new (require('cloudconvert'))(config.cloudConvertApiKey);
// // const fs = require('fs');
// const TelegramBot = require('node-telegram-bot-api');
// const bot = new TelegramBot(config.token, { polling: true });

// let eroInterval = 3600000*3
// let eroTimerStateFlag = 'enabled'
// let downloadEnabledFlag = 'enabled'
// let eroTimer