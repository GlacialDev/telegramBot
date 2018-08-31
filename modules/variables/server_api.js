import variables from './variables';

let server = variables.server
let db = variables.db

export default server_api = function() {
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
        db.get().collection('pollstore').findOne({ id: id }, (err, poll) => {
            if (err) {
                console.log(err)
                return res.sendStatus(500)
            }
            console.log(poll)
        })
    })
}