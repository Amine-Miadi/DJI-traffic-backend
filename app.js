const express = require('express');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const {Storage} = require('@google-cloud/storage')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI)
    .then(res => console.log("connected to mongoose"))
    .catch(err => console.log("error occured"))


//middleware
app.use(cors())
app.use('/', require('./routes/car_data'));


const PORT = process.env.PORT || 8080;
app.listen(PORT,() => {
    console.log(`Application is running on: ${PORT}`);
})