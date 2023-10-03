const express = require('express');
const router = express.Router();
const cars = require('../controllers/cars.contoller.js');
const download = require('../controllers/download.controller.js');
const uploadHandler = require('../config/multer.js')



router.post('/cars',uploadHandler.single('image'),cars.putcar);
router.get('/cars', cars.getcar);
router.get('/remove_all', cars.removeall);
router.get('/download', download.getall);
router.get('/', (req,res) => {
    res.status(201).send("welcome")
});

module.exports = router;