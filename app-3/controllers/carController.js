const cars = require('../data.json')
let carId = cars[cars.length - 1].id + 1

module.exports = {
  getAllCars: (req, res) => {
    const { color } = req.query

    if (!color) {
      return res.status(200).send(cars)
    }

    const carsOfColor = cars.filter((car) => car.color === color)

    res.status(200).send(carsOfColor)
  },
  getCarById: (req, res) => {
    const { id } = req.params

    const car = cars.find((car) => car.id === +id)

    if (car) {
      res.status(200).send(car)
    } else {
      res.status(404).send('Car not found')
    }
  },
  addCar: (req, res) => {
    const { make, model, year, color } = req.body
    const newCar = {
      id: carId,
      make,
      model,
      year,
      color,
    }

    cars.push(newCar)

    carId++

    res.status(200).send(cars)
  },
  editCar: (req, res) => {
    const { id } = req.params
    const { make, model, year, color } = req.body

    const index = cars.findIndex((car) => car.id === +id)

    if (index === -1) {
      return res.status(404).send('Car not found')
    }

    const modifiedCar = {
      id: +id,
      make,
      model,
      year,
      color,
    }

    cars[index] = modifiedCar

    res.status(200).send(cars)
  },
  deleteCar: (req, res) => {
    const { id } = req.params

    const index = cars.findIndex((car) => car.id === +id)

    if (index === -1) {
      return res.status(404).send('Car not found')
    }

    cars.splice(index, 1)

    res.status(200).send(cars)
  },
}
