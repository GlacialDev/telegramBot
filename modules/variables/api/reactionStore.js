import variables from '../variables';

let server = variables.server
let db = variables.db

export default function reactionStore() {
    server.post('/reactionstore', (req, res) => {
        let pollObject = {
            id: req.body.id,
            title: req.body.title,
            answers: req.body.answers,
            votes: req.body.votes
        };
        db.get().collection('reactionstore').insertOne(pollObject, (err, result) => {
            if (err) {
                console.log(err)
                return res.sendStatus(500)
            }
            res.sendStatus(200)
        })
    })

    server.get('/reactionstore/:id', (req, res) => {
        db.get().collection('reactionstore').findOne({ id: req.params.id }, (err, pollObject) => {
            if (err) {
                console.log(err)
                return res.sendStatus(500)
            }
            res.send(pollObject)
        })
    })

    server.put('/reactionstore/:id', (req, res) => {
        db.get().collection('reactionstore').updateOne( 
            { id: req.params.id },
            { $set: { 
                title: req.body.title,
                answers: req.body.answers,
                votes: req.body.votes
            } },
            (err, result) => {
                if (err) {
                    console.log(err)
                    return res.sendStatus(500)
                }
                res.sendStatus(200)
            }
        )
    })
}