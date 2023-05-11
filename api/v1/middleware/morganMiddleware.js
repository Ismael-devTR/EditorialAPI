const morgan = require('morgan')
const logger = require("../utils/logger")

/**
 * * Method below is an older version
 */

// const morganMiddleware = morgan(
//     ':method :url :status :res[content-length] - :response-time ms',
//     {
//         stream:{
//             write: (message) =>  logger.http(message.trim())
//         }
//     }
// )

const morganMiddleware = morgan(function(tokens,req, res){
    return JSON.stringify({
        method: tokens.method(req,res),
        url: tokens.url(req, res),
        status: Number.parseFloat(tokens.status(req, res)),
        content_length: tokens.res(req, res, "content_length"),
        response_time: Number.parseFloat(tokens["response-time"](req, res))
    })
}, {
    stream: {
        write: (message)=> {
            const data = JSON.parse(message)
            logger.http("incomming_request", data)
        }
    }
})

module.exports = morganMiddleware
