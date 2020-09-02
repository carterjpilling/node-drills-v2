const express = require('express')
const carsCtrl = require('./controllers/carController')
const app = express()

const port = 4000

app.use(express.json())
app.listen(port, () => {
  console.log(`${port} is live.`)
})


app.get('/api/cars', carsCtrl.getCars)
app.get('/api/cars/:id', carsCtrl.getSingleCar)