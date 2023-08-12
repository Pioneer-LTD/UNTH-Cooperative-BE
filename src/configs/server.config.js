const express = require('express');
const cors = require('cors')
// const errorHandler = require('../middlewares/error.middleware')
const router = require('../routes/index.route')
const formData = require("express-form-data")

function createServer () {
    const app = express()

    // Form type
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(formData.parse())

    // Setup Cross-Origin Resource Sharing 
    // to enable passing requests through the frontend
    app.use(
        cors({
          origin: '*',
          allowedHeaders: 'Content-Type, Authorization',
          methods: 'POST, GET, PUT, PATCH, DELETE',
          credentials: true,
        })
      );

    // Route link
    app.use('/unth-coop', router)

    // Error Handler
    // app.use(errorHandler)

    return app
}


module.exports = createServer