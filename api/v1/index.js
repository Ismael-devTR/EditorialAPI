const express = require('express')
const app = express("morgan")
const bodyParser = require("body-parser")

/**
 * * SWAGGER LIBRARIES
 */
const swaggerUI = require("swagger-ui-express")
const swaggerDocument = require("../swagger.json")


const morganMiddleware = require("./middleware/morganMiddleware")
const PORT = 3000 || process.env.PORT

/**
 * * MIDDLEWARE DEFINITION BELOW
 */
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use(bodyParser.json())
app.use(morganMiddleware)


/**
 * * API ENDPOIN ROUTES
 */
app.get('/', (_req, res) => {
  res.send("WELCOME")
})

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})
