const car = require('../config/models/cars.model');
const path = require('path');
const {Storage} = require('@google-cloud/storage');
const { CLIENT_RENEG_WINDOW } = require('tls');



const getall = async(req,res) => {
    const storage = new Storage({keyFilename: path.join(__dirname, '../concise-emblem-395909-6c43cd09030d.json')});
    let cars = await car.find()
    const options = {
        version: 'v2', // defaults to 'v2' if missing.
        action: 'read',
        expires: Date.now() + 1000 * 60 * 60, // one hour
      };
    const info = []
    for(let i=0;i<cars.length;i++){
        link = await storage.bucket('concise-emblem-395909.appspot.com').file(cars[i].image_Base64).getSignedUrl(options);
        info.push({
            id: cars[i].image_Base64,
            recorded_speed: cars[i].recorded_speed,
            speed_limit: cars[i].speed_limit,
            image: link[0],
            date: cars[i].date,
            location: cars[i].location
        });
    }
    res.status(201).json(info)
}


module.exports = {getall}