import config from '../../secret/config'

export const creator = 353140575
export const groupChat = -307924393
export const https = require('https')
const apiai = require('apiai')
export const dialogflow = apiai(config.dialogFlowClientAccessToken);
export const cloudconvert = new (require('cloudconvert'))(config.cloudConvertApiKey);
export const fs = require('fs');
export const TelegramBot = require('node-telegram-bot-api');
export const bot = new TelegramBot(config.token, { polling: true });

export let eroInterval = 3600000*3
export let eroTimerStateFlag = 'enabled'
export let downloadEnabledFlag = 'enabled'
export let eroTimer

export function setDownloadFlag(state) {
    downloadEnabledFlag = state
}
export function setEroInterval(number) {
    eroInterval = number
}
export function setEroTimerFlag(state) {
    eroTimerStateFlag = state
}
export function setTimer(timer, interval) {
    timer = setInterval(function () {
        takePhotoFromBuffer("./list/ero.txt", groupChat, false)
    }, interval);
}