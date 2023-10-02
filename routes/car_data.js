const express = require('express');
const router = express.Router();
const cars = require('../controllers/cars.js');
const download = require('../controllers/download.js');
const uploadHandler = require('../config/multer.js')



router.post('/cars',uploadHandler.single('image'),cars.putcar);
router.get('/cars', cars.getcar);
router.get('/download', download.getall);
router.get('/', (req,res) => {
    res.status(201).send("welcome")
});

module.exports = router;