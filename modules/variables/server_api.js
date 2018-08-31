import variables from './variables';

let server = variables.server
let db = variables.db

export default function server_api() {
    server.post('/pollstore', (req, res) => {
        console.log('v zaprose post')
        let poll = {
            id: req.body.id,
            poll: req.body.pollObject,
            userVotes: req.body.userVotes
        };
        db.get().collection('pollstore').insertOne(poll, (err, result) => {
            console.log('v collection k db')
            if (err) {
                console.log(err)
                return res.sendStatus(500)
            }
            // res.send(poll)
            console.log(poll)
        })
    })

    server.get('/pollstore/:id', (req, res) => {
        console.log('v zaprose get')
        id = req.params.id
        db.get().collection('pollstore').findOne({ id: id }, (err, poll) => {
            console.log('v collection k db')
            if (err) {
                console.log(err)
                return res.sendStatus(500)
            }
            console.log(poll)
        })
    })
}