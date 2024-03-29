const pino = require("pino")

const logger = pino({
    level: "info"
})

const errorHandler = (error, req, res, next) => {
    logger.error(error)
    const errorStatus = error.status || 500
    const errorMessage = error.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        message: errorMessage,
    })
}

module.exports = { errorHandler, logger }