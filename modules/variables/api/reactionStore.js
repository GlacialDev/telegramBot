import variables from '../variables';

let server = variables.server
let db = variables.db

export default function reactionStore() {
    server.post('/reactionstore', (req, res) => {
        // console.log('v samom nachale v post metode')
        let reactionObject = {
            id: req.body.id,
            answers: req.body.answers,
            votes: req.body.votes
        };
        // console.log('v post metode')
        db.get().collection('reactionstore').insertOne(reactionObject, (err, result) => {
            // console.log('v db collection')
            if (err) {
                console.log(err)
                return res.sendStatus(500)
            }
            // console.log(reactionObject)
            res.sendStatus(200)
        })
    })

    server.get('/reactionstore/:id', (req, res) => {
        console.log('v samom nachale v get metode')
        db.get().collection('reactionstore').findOne({ id: req.params.id }, (err, reactionObject) => {
            console.log('v db collection')
            if (err) {
                console.log(err)
                return res.sendStatus(500)
            }
            console.log(reactionObject)
            res.send(reactionObject)
        })
    })

    server.put('/reactionstore/:id', (req, res) => {
        console.log('v samom nachale v put metode')
        db.get().collection('reactionstore').updateOne( 
            { id: req.params.id },
            { $set: { 
                answers: req.body.answers,
                votes: req.body.votes
            } },
            (err, result) => {
                if (err) {
                    console.log(err)
                    return res.sendStatus(500)
                }
                console.log('v konce put metoda')
                res.sendStatus(200)
            }
        )
    })
}