# Node Drills

These drills function as a counterpart to the [React Drills](https://github.com/DevMountain/react-drills) to help you solidify key concepts in node and express. Each subsequent app will build on the previous app but each one will force you to start from scratch.

## Setup

Each app will require you to `cd` into the individual folder in order to run the necessary commands/install the necessary dependencies. As you go you should use [Postman](https://www.postman.com/) to test your server and make sure it's behaving as expected. When you are ready to move on from one app to the next make sure to use `ctrl+c` to end the current process. Remember to use `console.log()` as needed and that those logs will show up wherever you run your `node` process. Read any error logs carefully and use all of your debugging knowledge to work through problems.

## App 1 - Server setup and listen

Use `npm init -y` to create a new node project. Install express and create a basic server, set it to listen on port 4000.

> Hint: add a `"main"` property to your `package.json` file and give it a value of `"server/index.js"` so that you can just run `nodemon` to make your server listen. Repeat this step on each app.

<details>

<summary> <code> app-1/index.js </code> </summary>

```js
const express = require('express')
const app = express()

const SERVER_PORT = 4000

app.listen(4000, () => console.log(`Listening on port ${SERVER_PORT}`))
```

</details>

<br/>

## App 2 - GET

Setup a new server and set it to run on port 4000. You are provided with dummy data in the file `data.json`. Create the following 2 GET endpoints:

1. Get all cars
2. Get a single car by its `id`. (HINT: Use a param to make this happen)

<details>

<summary> <code> app-2/index.js </code> </summary>

```js
const express = require('express')
const carCtrl = require('./controllers/carController')
const app = express()

const SERVER_PORT = 4000

app.get('/api/cars', carCtrl.getAllCars)
app.get('/api/cars/:id', carCtrl.getCarById)

app.listen(4000, () => console.log(`Listening on port ${SERVER_PORT}`))
```

</details>

<details>

<summary> <code> app-2/controllers/carController.js </code> </summary>

```js
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
```

</details>

<br/>

## App 3 - Full CRUD & queries

### Step 1

Set up a new server and tell it to listen on port 4000. Add the following endpoints:

1. POST to add a new car. Make sure that you mirror the data structure found in `data.json`. (Use the body object)
2. PUT to edit an existing car. (Use params and the body object)
3. DELETE to delete an existing car. (Use params)
4. Each endpoint should send back the updated array of cars.

### Step 2

Modify your endpoint to get all cars to be able to accept a `color` query. Return only cars that are of that color.

<details>

<summary> <code> app-3/index.js </code> </summary>

```js
const express = require('express')
const carCtrl = require('./controllers/carController')
const app = express()

const SERVER_PORT = 4000

app.use(express.json())

app.get('/api/cars', carCtrl.getAllCars)
app.get('/api/cars/:id', carCtrl.getCarById)
app.post('/api/cars', carCtrl.addCar)
app.put('/api/cars/:id', carCtrl.editCar)
app.delete('/api/cars/:id', carCtrl.deleteCar)

app.listen(4000, () => console.log(`Listening on port ${SERVER_PORT}`))
```

</details>

<details>

<summary> <code> app-3/controllers/carController.js </code> </summary>

```js
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
```

</details>
