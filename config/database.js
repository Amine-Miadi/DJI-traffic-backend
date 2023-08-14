const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    recorded_speed: Number,
    speed_limit: Number,
    date: { type: Date, default: Date.now },
    time: String,
    image_Base64: String
});
const car = mongoose.model('Detected_Cars', carSchema);

module.exports = car