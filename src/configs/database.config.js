const mongoose = require('mongoose');
const { DATABASE_URI, MESSAGES } = require('./constants.config');
require('dotenv').config()


async function connect () {
    // Database Connection 
    await mongoose.connect(DATABASE_URI, {
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

module.exports = connect