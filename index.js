import help from './modules/bot_commands/help'
help()
import echo from './modules/bot_commands/echo'
echo()
import id from './modules/bot_commands/id'
id()
import send_to from './modules/bot_commands/send_to'
send_to()
import send_photo from './modules/bot_commands/send_photo'
send_photo()
import remind_me from './modules/bot_commands/remind_me'
remind_me()
import pass_gen from './modules/bot_commands/pass_gen'
pass_gen()
import roll from './modules/bot_commands/roll'
roll()
import talk_with_bot from './modules/bot_commands/talk_with_bot'
talk_with_bot()
import bot_settings from './modules/bot_commands/settings'
bot_settings()
import upload from './modules/bot_commands/upload'
upload()
import upload_en_dis from './modules/bot_commands/upload_en_dis'
upload_en_dis()
import convert from './modules/bot_commands/convert'
convert()
import poll from './modules/bot_commands/poll'
poll()
// channel management 
import ero_set_timer from './modules/channel_management/ero_channel/commands/ero_set_timer'
ero_set_timer()
import ero_stop_timer from './modules/channel_management/ero_channel/commands/ero_stop_timer'
ero_stop_timer()
import ero_how_much from './modules/channel_management/ero_channel/commands/ero_how_much'
ero_how_much()
import ero_add_more from './modules/channel_management/ero_channel/commands/ero_add_more'
ero_add_more()
import ero_give_img from './modules/channel_management/ero_channel/commands/ero_give_img'
ero_give_img()



let devMode = false
import botInit from './modules/functions/botInit'
botInit(devMode)

import test from './modules/bot_commands/test'
test()



import db from './modules/variables/db'
import request from 'request'
import express from 'express'
import bodyParser from 'body-parser'

const server = express()
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

server.post('/second', (req, res) => {
    let newMeowObj = {
        id: req.body.id,
        name: req.body.name
    };
    db.get().collection('second').insertOne(newMeowObj, (err, result) => {
        if (err) {
            console.log(err)
            return res.sendStatus(500)
        }
        // res.send(newMeowObj)
        console.log(newMeowObj)
    })
})

server.get('/second', (req, res) => {
    db.get().collection('second').find().toArray((err, docs) => {
        if (err) {
            console.log(err)
            return res.sendStatus(500)
        }
        // res.send(docs)
        console.log(docs)
    })
})


let options_post = {
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        id: Date.now(),
        name: 'memememe'
    })
}
// --- post
setTimeout(() => {
    request.post('http://localhost:3012/second', options_post);
}, 3000)
// --- get-all
setTimeout(() => {
    request('http://localhost:3012/second');
}, 4000)