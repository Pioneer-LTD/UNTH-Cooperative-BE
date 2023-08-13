const createServer = require("./configs/server.config")
const connect = require("./configs/database.config")
const { logger } = require("./middlewares/error.middleware");
const { PORT } = require("./configs/constants.config")

const app = createServer()

// Import Port from env and connect(listen)
app.listen(PORT, async () => {
    logger.info(`Server is listening on port ${PORT}`)

    await connect()
})