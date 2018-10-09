import config from '../secret/config'
import express from 'express'
import bodyParser from 'body-parser'
import db from './db'

const TelegramBot = require('node-telegram-bot-api')
const apiai = require('apiai')
const cloudconvert = new (require('cloudconvert'))(config.cloudConvertApiKey);
const server = express()
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
const yandexSpeech = require('yandex-speech')
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath('./ffmpeg/bin/ffmpeg.exe')
ffmpeg.setFfprobePath('./ffmpeg/bin/ffprobe.exe')

let variables = {
    creator : 353140575,
    groupChat : -307924393,
    bot : new TelegramBot(config.token, { polling: true }),
    dialogflow : apiai(config.dialogFlowClientAccessToken),
    https : require('https'),
    fs : require('fs'),
    cloudconvert : cloudconvert,
    server : server,
    db : db,
    yandexSpeech : yandexSpeech,
    yandexSpeaker : 'oksana',
    ffmpeg : ffmpeg,
}

export default variables