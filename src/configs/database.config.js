const mongoose = require('mongoose');
const { DATABASE_URI, MESSAGES } = require('./constants.config');
require('dotenv').config()


async function connect (db) {
    // Database Connection 
    await mongoose.connect(db, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        family: 4,
    })
    .then(() => {
        console.log(MESSAGES.DATABASE.CONNECTED)
    })
    .catch((err) => {
        console.log(MESSAGES.DATABASE.ERROR)
    })
}

async function closeConnection () {
    await mongoose.connection.close()
}

module.exports = { connect, closeConnection }