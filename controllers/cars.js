const car = require('../config/database')


const putcar = async (req,res) => {
    console.log(req.file)
    console.log(req.body.speed_limit, req.body.recorded_speed)
    let detectedcar = new car(
        {
            recorded_speed: req.body.recorded_speed,
            speed_limit: req.body.speed_limit,
            image_Base64: req.file.originalname
        }
    )
    await detectedcar.save()
    res.status(201).send("saved")
}

const getcar = async (req,res) => {
    let cars = await car.find()
    res.status(201).json(cars)
}

module.exports = {putcar,getcar};