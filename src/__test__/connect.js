const mongoose = require("mongoose")
const { DATABASE_URI_TEST, MESSAGES } = require("../configs/constants.config")
require('dotenv').config()

async function connect () {
    // Database Connection 
    await mongoose.connect(DATABASE_URI_TEST, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        family: 4,
    })
    .then(() => {
        console.log(MESSAGES.DATABASE_TEST.CONNECTED)
    })
    .catch((err) => {
        console.log(MESSAGES.DATABASE_TEST.ERROR) })
}

async function closeConnection () {
    await mongoose.connection.close()
}

module.exports = { connect, closeConnection }

