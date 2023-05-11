const winston = require("winston");
const {combine, timestamp, json, colorize} = winston.format

const logger = winston.createLogger({
    level: "http",
    format: combine(
        timestamp({
            format: "YYYY-MM-DD hh:mm:ss.SSS A"
        }),
        json()
        ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: "./v1/logs/logs.log"})
    ]
})

module.exports = logger
