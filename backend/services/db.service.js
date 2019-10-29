
const MongoClient = require('mongodb').MongoClient;
const config = require('../config/');
const dbTrainer = 'Trainer_db';
var dbConn = null;

async function connect() {
    if (dbConn) return dbConn;
    try {
        const client = await MongoClient.connect(config.dbURL, { useNewUrlParser: true });
        const db = client.db(dbTrainer);
        dbConn = db;
        return db;
    } catch (err) {
        console.log('Cannot Connect to DB', err)
        throw err;
    }
}

async function getCollection(collectionName) {
    const db = await connect()
    return db.collection(collectionName);
}

module.exports = {
    connect,
    getCollection
}