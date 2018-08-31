import variables from '../variables/variables'
import authCheck from '../functions/authCheck'

import db from '../variables/db'

let bot = variables.bot

export default function test() {
    bot.onText(/\/test/, (msg, match) => {
        if (authCheck(msg) != true) return

        let request = require('request');

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
        }, 5000)
        // --- get-all
        setTimeout(() => {
            request('http://localhost:3012/second');
        }, 6000)
    });
} 