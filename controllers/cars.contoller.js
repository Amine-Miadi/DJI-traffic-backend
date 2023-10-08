const car = require('../config/models/cars.model')
const {Storage} = require('@google-cloud/storage');
const path = require('path')



const putcar = async (req,res) => {
    let detectedcar = new car(
        {
            recorded_speed: req.body.recorded_speed,
            speed_limit: req.body.speed_limit,
            image_Base64: req.file.originalname,
            date: Date.now(),
            location: {lat : req.body.lat ,lng : req.body.lng}
        }
    )
    await detectedcar.save()
    res.status(201).send("saved")
}

const getcar = async (req,res) => {
    let cars = await car.find()
    res.status(201).json(cars)
}

const storage = new Storage();
const deleteOptions = {
    ifGenerationMatch: 1,
};

const remove = async (req,res) => {
    const ids = req.query.ids.split(",")

    const bucketName = "concise-emblem-395909.appspot.com";
    const keyFilename = path.join(__dirname, '../concise-emblem-395909-6c43cd09030d.json') 
    const storage = new Storage({ keyFilename});
    
    
    for(let i=0;i<ids.length;i++){
        const fileName = ids[i];
        const file = storage.bucket(bucketName).file(fileName);
        
        try {
            const [metadata] = await file.getMetadata();
            const generationNumber = metadata.generation;
            const deleteOptions = {
                ifGenerationMatch: generationNumber,
            };
            await file.delete(deleteOptions);
        }catch(err){
            res.status(400).send({message: err.message});
            return;
        }
    }
    try {
        const response = await car.deleteMany({image_Base64:{$in:ids}})
        res.status(201).send({message: `deleted ${req.body.ids}`});
    } catch (error) {
        res.status(401).send({message: error.message});
    }
}

module.exports = {putcar,getcar,remove};