const car = require('../config/database')
const images_bucket = require('../config/gcloudStorage')
const crypto = require("crypto");
const stream = require('stream');


const putcar = async (req,res) => {
    const id = crypto.randomBytes(16).toString("hex");
    let detectedcar = new car(
        {
            recorded_speed: req.body.recorded_speed,
            speed_limit: req.body.speed_limit,
            image_Base64: `${id}.jpg`
        }
    )
    
    let file = images_bucket.file(`${id}.jpg`);
    //base64 to buffer stream
    var bufferStream = new stream.PassThrough();
    bufferStream.end(Buffer.from(req.body.image, 'base64'));
    //uploading the image
    bufferStream.pipe(file.createWriteStream({
        metadata: {
          contentType: 'image/jpeg',
          metadata: {
            custom: 'metadata'
          }
        },
        public: false,
        validation: "md5"
    }))
      .on('error', err => console.log(err))
      .on('finish', () => {console.log("uploaded successfuly")});
    //uploading the info
    await detectedcar.save()
    res.status(201).send("saved")
}

const getcar = async (req,res) => {
    let cars = await car.find()
    res.status(201).json(cars)
}

module.exports = {putcar,getcar};