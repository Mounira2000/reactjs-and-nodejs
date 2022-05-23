const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const utils = require("../utils.js");
const bcrypt = require("bcryptjs");


//create User and Save New user 
exports.create = (req, res) =>{
    //validation user input
    if(!req.body.emailUser || !req.body.nameUser || !req.body.passwordUser) {
         res.status(400).send(
            {
                message: "entrer correctement toutes les informations requises"
            }
        );
        return;
    }

    //create a user
    const user =
    {
        
        emailUser: req.body.emailUser,
        nameUser: req.body.nameUser,
        passwordUser:req.body.passwordUser 
    };
    console.log(user);
 
    //verify if this user already exist in the data base 
    User.findOne({where: { emailUser: user.emailUser}})
        .then(data => {
            //in this case the user exist already so we verify the password validation.
            //then we generate token 
            if (data) {
                
                const result = bcrypt.compareSync(user.passwordUser, data.passwordUser);
                if (!result) return res.status(401).send('Password not valid!');
                const token = utils.generateToken(data);
                // get basic user details
                const userObj = utils.getCleanUser(data);
                // return the token along with user details
                return res.json({ user: userObj, access_token: token });
              }

             //let encrypt the password of user before save it in the database
          user.passwordUser = bcrypt.hashSync(req.body.passwordUser);

          console.log(user);

      //not User found in the database.save the user in the database by the way generate the user token
         User.create(user)
        .then(data =>{
             const token = utils.generateToken(data);
            //get the basics user details
            const userObj = utils.getCleanUser(data);
            //returning the token and the user details
             return res.json({user: userObj, Access_token: token });
        })
        .catch(err => {
             console.log("PROBLEME CREATE USER");
            console.log(process.env.JWT_SECRET);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
             });
             console.log(err.message)
        });
         
    } )
        .catch(err => {
      
            console.log("PAS DE MAIL TROUVER")
            /*res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving tutorials."
            });
            console.log(err.message)*/

            }); 
          
          
      
};

//Retreive all the user 
exports.findAll = (req, res) =>{
    User.findAll()
    .then(data =>{
        res.send(data);
    })
    .catch(err =>{
        console.log("kk")
        res.status(500).send({
            message: err.message || "some error occured "
        });
    });
};

//Find a single user 
exports.findOneById= (req,res) =>{
    const idU = req.params.id;
    User.findByPk(idU)
        .then(data =>{
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message: "Error while retreiving User with id "+idU
            });
        });
};


// Update a User by the id in the request
exports.update = (req, res) => {
    const idU = req.params.id;
  
    User.update(req.body, {
      where: { idU: idU }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with id=${idU}. Maybe User was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + idU
        });
      });
  };
  
  // // Delete a User with the specified id in the request
  exports.delete = (req, res) => {
  const idU = req.params.id;
  
     User.destroy({
       where: { idU: idU }
     })
       .then(num => {
         if (num == 1) {
           res.send({
             message: "User was deleted successfully!"
           });
         } else {
           res.send({
             message: `Cannot delete User with id=${idU}. Maybe User was not found!`
           });
         }
       })
       .catch(err => {
         res.status(500).send({
           message: "Could not delete User with idU=" + idU
         });
       });
   };

   // Find user by username and password




