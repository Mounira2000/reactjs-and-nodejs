 module.exports = app => {
    
    const router = require("express").Router();
 
 const Users = require("../controllers/user.controller");
 const Auths = require("../controllers/auth.js");


    // route for create a new user 
    router.post("/", Users.create);

    //route for retreveing all the user
    router.get ("/", Auths.isAuthenticated, Users.findAll);

    // route to find a user with the id
    router.get("/:id", Auths.isAuthenticated, Users.findOneById);

    // route to update a user
    router.put("/:id", Auths.isAuthenticated, Users.update);

    // route to delete a user 
    router.delete("/:id", Auths.isAuthenticated, Users.delete);

    //route pour signin
    router.post("/signin", Auths.signin);

    app.use('/api/users',router);
 };
 