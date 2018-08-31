const MongoClient = require('mongodb').MongoClient

let state = {
    db: null
}

exports.connect = (url, dbName, done) => {
    if (state.db) {
        return done()
    }

    MongoClient.connect(url, (err, client) => {
        if (err) {
            return done(err)
        }
        state.db = client.db(dbName)
        done()
    })
}

exports.get = () => {
    return state.db
}