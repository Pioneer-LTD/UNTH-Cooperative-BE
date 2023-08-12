const express = require('express');
const { errorHandler } = require('../middlewares/error.middleware')
const router = require('../routes/index.route')
const formData = require("express-form-data")

function createServer () {
    const app = express()

    // Form type
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(formData.parse())

    // Setup Cross-Origin Resource Sharing 
    // to enable passing requests through the frontend
    app.use(cors({
        origin: '*', // Replace * with the client's domain if necessary
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
        credentials: true
      }));

    // Route link
    app.use('/unth-coop', router)

    // Error Handler
    app.use(errorHandler)

    return app
}


module.exports = createServer