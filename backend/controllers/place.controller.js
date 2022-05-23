const db = require("../models");
const Place = db.places;
const Op = db.Sequelize.Op;

//Create a new Place
exports.create = (req,res)=>{

    //validate resquest
    if(!req.body.namePlace){
        res.status(400).send({
            message: "the name place is empty"
        });
        return;
    }

    //create a place
    const place = {
        namePlace: req.body.namePlace,
        descriptionPlace: req.body.descriptionPlace,
        typePlace: req.body.typePlace,
        numberLike: req.body.numberLike,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        idD:req.body.idD
    }

    //Save the place in the database
    Place.create(place)
        .then (data =>{
            res.send(data);
        })
        .catch( err =>{
            res.status(400).send({
                message:
                    err.message || "Some errors"
            });
         });
};

//Retreive all department drom the database
 exports.FindAll = (req,res) =>{
    Place.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error ocured while retrieving places." 
        });
    });
 };

 // Find a single department  with and id 
exports.findOne = (req, res ) => {
    
    const idP = req.params.id;
    console.log(idP);

    Place.findByPk(idP)
        .then(data => {
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error occured while retreiving the department."
            });
        });
};

// Update a Place by the id in the request 
exports.update = (req, res) => {
    const idP = req.params.id;
    
    Place.update(req.body, {where: {idP:idP}} )
        .then(num => {
        if (num == 1) {
          res.send({
            message: "It was updated successfully."
          });
        } else {
            res.send({
              message: `Cannot update the place with id = ${idP}. Maybe it was not found or req.body is empty!`
            });
          }
        })
        .catch(err => {
            res.status(500).send({message:"Error updating the place with id = " + idP});
        });
};

//Delete a department with the specified id in the request 
exports.delete = (req, res) => {
    const idP = req.params.id;

    Place.destroy({
        where: {idP:idP}
    })
    .then( num => {
        if (num == 1) {
            res.send({
              message: "Place was deleted successfully!"
            });
          } else {
            res.send({
              message: `Cannot delete Place with id = ${idP}. Maybe Place was not found!`
            });
          }
    })
    .catch (err => {
        res.status(500).send({
            message:"Could´nt with Place id "+idP
        });
    });

};

