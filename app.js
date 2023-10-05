const express = require('express');
const cors = require('cors')
const app = express();
const mongoose = require('mongoose')
const Role = require('./config/models/role.model')
const bodyparser = require('body-parser')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI)
    .then(res => console.log("connected to mongoose"))
    .catch(err => console.log("error occured"))

//init roles db
function initial() {
    Role.estimatedDocumentCount()
    .then((count)=>{
        if(count != 2){
            Role.deleteMany({}).then(()=>{

                new Role({ name: "user"}).save()
                .then(console.log("added 'user' to roles collection"))
                .catch(err=>console.log("error", err))

                new Role({ name: "admin"}).save()
                    .then(console.log("added 'admin' to roles collection"))
                    .catch(err=>console.log("error", err))

            }).catch(err=>console.log(err));
        }
    }).catch(err =>{
        console.log("count failed");
    });
};
initial();

//middleware
app.use(bodyparser.json())
app.use(cors())
app.use('/', require('./routes/car_data.routes'));


const PORT = process.env.PORT || 8080;
app.listen(PORT,() => {
    console.log(`Application is running on: ${PORT}`);
})