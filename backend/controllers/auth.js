const jwt = require('jsonwebtoken');
const utils = require('../utils');
const bcrypt = require('bcryptjs');

const db = require("../models");
const User = db.users;

exports.signin = (req, res) => {
  const user = req.body.emailUser;
  const pwd = req.body.passwordUser;

  // return 400 status if username/password is not exist
  if (!user || !pwd) {
    return res.status(400).json({
      error: true,
      message: "the mail or Password required."
    });
  }

  // return 401 status if the credential is not match.
  User.findOne({ where: { emailUser: user } })
    .then(data => {
      const result = bcrypt.compareSync(pwd, data.passwordUser);
      if(!result) return  res.status(401).send('Password not valid!');

      // generate token
      const token = utils.generateToken(data);
      // get basic user details
      const userObj = utils.getCleanUser(data);
      // return the token along with user details
      return res.json({ user: userObj, access_token: token });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

exports.isAuthenticated = (req, res, next) => {
  // check header or url parameters or post parameters for token
  
  var token = req.token;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required."
    });
  }
  // check token that was passed by decoding token using secret
  // .env should contain a line like JWT_SECRET=V3RY#1MP0RT@NT$3CR3T#
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) return res.status(401).json({
      error: true,
      message: "Invalid token. it was here 1"
    });

    console.log("User information");
    console.log(user);
    User.findByPk(user.idU)
      .then(data => {
        // return 401 status if the userId does not match.
        if (!user.idU) {
          return res.status(401).json({
            error: true,
            message: "Invalid user. It was here 2"
          });
        }
        // get basic user details
        next();
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving User with id=" + idU
        });
      });
  });
};