const express = require('express')
const carCtrl = require('./controllers/carController')
const app = express()

const SERVER_PORT = 4000

app.get('/api/cars', carCtrl.getAllCars)
app.get('/api/cars/:id', carCtrl.getCarById)
app.post('/api/cars', carCtrl.addCar)
app.put('/api/cars/:id', carCtrl.editCar)
app.delete('/api/cars/:id', carCtrl.deleteCar)

app.listen(4000, () => console.log(`Listening on port ${SERVER_PORT}`))
