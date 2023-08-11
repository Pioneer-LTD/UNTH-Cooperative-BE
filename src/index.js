const createServer = require("./configs/server.config")
const connect = require("./configs/database.config")
const { PORT } = require("./configs/constants.config")
require('dotenv').config()
const rootRoute = require('./routes/index.route');
const logger = require('morgan')

const app = createServer()
app.use(logger('dev'));
//Root Route
app.use('/api/v1', rootRoute) 



// Import Port from env and connect(listen)
app.listen(PORT, async () => {
    console.log(`Server is listening on port ${PORT}`)

    await connect()
})