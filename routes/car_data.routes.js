const express = require('express');
const router = express.Router();
const cars = require('../controllers/cars.contoller.js');
const download = require('../controllers/download.controller.js');
const uploadHandler = require('../config/multer.js')
const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const authJwt = require("../middleware/authjwt.js")

router.use((req, res, next) => {
    res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.post('/api/auth/signup',[
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted,
    authJwt.verifyToken,
    authJwt.isAdmin
  ],controller.signup);

router.post('/api/auth/signin', controller.signin);
router.post('/cars',uploadHandler.single('image'),cars.putcar);
router.delete('/api/delete',[authJwt.verifyToken,authJwt.isAdmin], cars.remove);
router.get('/api/registery',[authJwt.verifyToken], download.getall);
router.get('/',(req,res)=>{res.send("welcome")});

module.exports = router;