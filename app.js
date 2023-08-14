const express = require('express');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI)

//storage engine


//environment variables


//middleware
app.use(cors())
app.use(bodyParser.json({limit: "20mb"}))
app.use('/', require('./routes/car_data'));


const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    console.log(`Application is running on: ${PORT}`);
})