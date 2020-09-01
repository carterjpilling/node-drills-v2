const express = require('express')
const app = express()

const SERVER_PORT = 4000

app.listen(4000, () => console.log(`Listening on port ${SERVER_PORT}`))
