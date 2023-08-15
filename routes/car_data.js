const express = require('express');
const router = express.Router();
const cars = require('../controllers/cars.js');


router.post('/cars', cars.putcar);
router.get('/cars', cars.getcar);
router.get('/', (req,res) => {
    res.status(201).send("welcome")
});

module.exports = router;