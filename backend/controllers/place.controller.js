const db = require("../models");
const Place = db.places;
const Op = db.Sequelize.Op;

//will handle the 
const multer = require('multer');

//will give use the image path with his extention 
const path = require('path');

//Create a new Place
exports.create = (req, res) => {

    //validate resquest
    if (!req.body.namePlace) {
        res.status(400).send({
            message: "the name place is empty"
        });
        return;
    }

    //create a place
    const place = {
        image: req.file.path ,
        namePlace: req.body.namePlace,
        descriptionPlace: req.body.descriptionPlace,
        typePlace: req.body.typePlace,
        numberLike: req.body.numberLike,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        idD: req.body.idD
    }

    //Save the place in the database
    Place.create(place)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(400).send({
                message:
                    err.message || "Some errors"
            });
        });
};

//Retreive all department drom the database
exports.FindAll = (req, res) => {
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
exports.findOne = (req, res) => {

    const idP = req.params.id;
    console.log(idP);

    Place.findByPk(idP)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retreiving the department."
            });
        });
};

// Find a single department  with and id 
exports.findAllInOneDepartment = (req, res) => {

    const idD = req.params.id;
    console.log(idD);

    Place.findAll({
        where: {
            idD: idD
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while retreiving the department of the place."
        });
    });
};

// Update a Place by the id in the request 
exports.update = (req, res) => {
    const idP = req.params.id;

    Place.update(req.body, { where: { idP: idP } })
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
            res.status(500).send({ message: "Error updating the place with id = " + idP });
        });
};

//Delete a department with the specified id in the request 
exports.delete = (req, res) => {
    const idP = req.params.id;

    Place.destroy({
        where: { idP: idP }
    })
        .then(num => {
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
        .catch(err => {
            res.status(500).send({
                message: "Could´nt with Place id " + idP
            });
        });

};

//upload Image Controller 
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, 'Images')
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now()+ path.extname(file.originalname))
    }
})

exports.upload = multer({
    storage:storage,
    //limits: {fileSize: '10000000'}, // taille max image
    fileFilter: (req, file, cb)=>{
        // here we tell what type of photo we are going to accep
        const FilesTypes = /jpeg|jpg|png|gif/ 
        
        const mimeType = FilesTypes.test(file.mimetype)

        const extname = FilesTypes.test(path.extname(file.originalname))

        if(mimeType && extname){
            return cb(null,true)
        }
        cb('give proper files formate to upload')
    }
}).single('image')
