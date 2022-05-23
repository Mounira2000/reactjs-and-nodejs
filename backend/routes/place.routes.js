module.exports = app =>{

    const places =require("../controllers/place.controller.js");

var router = require("express").Router();

//Create a new place
router.post("/",places.create);

//Retreiving all the places 
router.get("/", places.FindAll);

//Retreiving one place
router.get("/:id",places.findOne);

//Update a place 
router.put("/:id",places.update);

// delete a place 
router.delete("/:id",places.delete);

app.use('/api/places',router);
};
