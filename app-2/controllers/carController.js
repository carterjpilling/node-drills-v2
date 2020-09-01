const cars = require('../data.json')

module.exports = {
  getAllCars: (req, res) => {
    res.status(200).send(cars)
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
}
