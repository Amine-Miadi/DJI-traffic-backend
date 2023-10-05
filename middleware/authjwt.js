const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const User = require('../config/models/user.model.js');
const Role = require('../config/models/role.model.js');

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(420).send({ message: "No auth token provided!" });
  }

  try {
    const decoded = jwt.verify(token, config.secret)
    req.userId = decoded.id;
    next();
  }catch (error){
    return res.status(421).send({
      message: "Unauthorized!"
    });
  }

};

isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({_id: { $in: user.roles }})
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }
    res.status(403).send({ message: "Require Admin Role!" });
    return;
  }catch(err){
    res.status(500).send({ message: err });
    return;
  }
};


const authJwt = {
  verifyToken,
  isAdmin
};
module.exports = authJwt;