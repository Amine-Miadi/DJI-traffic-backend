const User = require('../config/models/user.model')

const ROLES = ["user", "admin"]

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    // Username
    try{
      const username = await User.findOne({username: req.body.username});
      if(username){
        res.status(422).send({ message: "Failed! Username is already in use!" });
        return;
      }
    }catch (err){
      res.status(500).send({ message: err });
      return;
    }
    try{
      const email = await User.findOne({email: req.body.email});
      if(email){
      res.status(423).send({ message: "Failed! email is already in use!" });
      return;
      }
    }catch (err){
      res.status(500).send({ message: err });
      return;
    }
    next();
    
};
  
const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i])) {
          res.status(400).send({
            message: `Failed! Role ${req.body.roles[i]} does not exist!`
          });
          return;
        }
      }
    }
    next();
};
  
const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
};
  
module.exports = verifySignUp;