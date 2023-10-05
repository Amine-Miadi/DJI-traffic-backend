const config = require("../config/auth.config");
const User = require('../config/models/user.model.js');
const Role = require('../config/models/role.model.js');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


const signup = async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });
  
  if(req.body.roles){
    const roles = await Role.find({name: { $in: req.body.roles }})
    user.roles = roles.map(role => role._id);
    user.save().then(()=>res.send({ message: "User was registered successfully!" }))
    .catch(err=>console.log(err))
  }else{
    const role = await Role.findOne({name: "user"})
    user.roles = [role._id];
    user.save().then(()=>res.send({ message: "User was registered successfully!" }))
    .catch(err=>console.log(err))
  }
  
};

const signin = async (req, res) => {
  const user = await User.findOne({username: req.body.username}).populate("roles", "-__v")
  //if username doens't exist
  if (!user) {
    return res.status(418).send({message: "User Not found."});
  }
  //checking password validity
  var passwordIsValid = bcrypt.compareSync(
    req.body.password,
    user.password
  );
  if (!passwordIsValid) {
    return res.status(419).send({
      accessToken: null,
      message: "Invalid Password!"
    });
  }

  //creating auth token with proper access lv
  const token = jwt.sign({ id: user.id },
    config.secret,
    {
      algorithm: 'HS256',
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });

  var authorities = [];
  for (let i = 0; i < user.roles.length; i++) {
    authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
  }
  res.status(200).send({
    id: user._id,
    username: user.username,
    email: user.email,
    roles: authorities,
    accessToken: token
  });

};

module.exports = {
    signin,
    signup
}