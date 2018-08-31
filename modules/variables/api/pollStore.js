import variables from '../variables';

let server = variables.server
let db = variables.db

export default function pollStore() {
    server.post('/pollstore', (req, res) => {
        let pollObject = {
            id: req.body.id,
            title: req.body.title,
            answers: req.body.answers,
            votes: req.body.votes
        };
        db.get().collection('pollstore').insertOne(pollObject, (err, result) => {
            if (err) {
                console.log(err)
                return res.sendStatus(500)
            }
            res.sendStatus(200)
        })
    })

    server.get('/pollstore/:id', (req, res) => {
        db.get().collection('pollstore').findOne({ id: req.params.id }, (err, pollObject) => {
            if (err) {
                console.log(err)
                return res.sendStatus(500)
            }
            res.send(pollObject)
        })
    })

    server.put('/pollstore/:id', (req, res) => {
        console.log('v zaprose put')
        db.get().collection('pollstore').updateOne( 
            { id: req.params.id },
            { $set: { 
                poll: req.body.clickedPoll,
                userVotes : req.body.userVotes
            } },
            (err, result) => {
                console.log('v collection k db')
                if (err) {
                    console.log(err)
                    return res.sendStatus(500)
                }
                console.log('zapros put vipolnen')
                res.sendStatus(200)
            }
        )
    })
}