const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    recorded_speed: Number,
    speed_limit: Number,
    date: Number,
    time: String,
    image_Base64: String,
    location: {lat: Number, 
      lng: Number}
});

carSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const car = mongoose.model('Detected_Cars', carSchema);

module.exports = car