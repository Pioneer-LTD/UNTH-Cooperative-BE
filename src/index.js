const createServer = require("./configs/server.config")
const connect = require("./configs/database.config")
const { PORT } = require("./configs/constants.config")
require('dotenv').config()

const app = createServer()

// Import Port from env and connect(listen)
app.listen(PORT, async () => {
    console.log(`Server is listening on port ${PORT}`)

    await connect()
})