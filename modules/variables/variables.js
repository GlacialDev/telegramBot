import config from '../secret/config'

const TelegramBot = require('node-telegram-bot-api')
const apiai = require('apiai')
const cloudconvert = new (require('cloudconvert'))(config.cloudConvertApiKey);

let variables = {
    creator : 353140575,
    groupChat : -307924393,
    bot : new TelegramBot(config.token, { polling: true }),
    dialogflow : apiai(config.dialogFlowClientAccessToken),
    https : require('https'),
    fs = require('fs'),
    cloudconvert : cloudconvert
}

export default variables