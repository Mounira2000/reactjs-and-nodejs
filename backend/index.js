require ("dotenv").config();
const jwt = require('jsonwebtoken');

const express = require("express");

const app = express();

//parse reauest of contenet type application json 
app.use(express.json());

//parse request ot content type application x-www-form
app.use(express.urlencoded({extended: true}));

//we initialiaze sequelize appliying the previos transparency
const db = require ("./models");
//normal use. Doesn´t delete the database data
db.sequelize.sync();

// In development you may need to drop the existing table and resync database
/*db.sequelize.sync({ force : true }).then (()=>{
    console.log("Drop and re-sync db");
});*/

//middleware that checks if JWT token exists and verifies it if it does exist.
//In all future routes, this helps to know if the request is authenticated or not.
app.use(function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.headers['authorization'];
    if (!token) return next(); //if no token, continue
  
    //look for more undestanding of this part
    if(req.headers.authorization.indexOf('Basic ') === 0){
      // verify auth basic credentials
      const base64Credentials =  req.headers.authorization.split(' ')[1];
      const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
      const [emailUser, passwordUser] = credentials.split(':');
  
      req.body.emailUser = emailUser;
      req.body.passwordUser = passwordUser;
  
      return next();
    }
  
    token = token.replace('Bearer ', '');
    // .env should contain a line like JWT_SECRET=V3RY#1MP0RT@NT$3CR3T#
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
      if (err) {
        return res.status(401).json({
          error: true,
          message: "Invalid user."
        });
      } else {
        req.user = user; //set the user to req so other routes can use it
        req.token = token;
        next();
      }
    });
  });
//simple route 
app.get("/", (req,res)=>{
    res.json ({message: "welcom to my app"});
});

require("./routes/department.routes")(app);
require("./routes/comment.routes")(app);
require("./routes/place.routes")(app);
require("./routes/user.routes")(app);


//set port, listen for resquests
const PORT = process.env.PORT || 8001;

app.listen(PORT,()=>{ 
    console.log(`Server is running on port ${PORT}`);
});