const db = require("../models");
const Comment = db.comments;
const Op = db.Sequelize.Op;

// Create and save a new comment
exports.create = (req, res) => {
    //Validate resquest
    if(!req.body.contentComment ) {
        res.status(400).send({
            message:"content can not be empty"
        });
        return;
    }

    //create a comment 
    const comment = {
        contentComment: req.body.contentComment,
        idU: req.body.idU,
        idP: req.body.idP
    };

    //save Comment in the database 
    Comment.create(comment)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(400).send({
                message:
                    err.message || "Some error occured while creating the comment."
            });
        });


};

// Retreive all comments from the datBASE 
exports.findAll = (req, res ) =>{
    Comment.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error ocured while retrieving comment." 
            });
        });
};

// Find a single department  with and id 
exports.findOne = (req, res ) => {
    const idC = req.params.id;

    Department.findByPk(idC)
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

// Update a department by the id in the request 
exports.update = (req, res) => {
    const idC = req.params.id;
    Department.update(req.body, {where: {id:idC}} )
        .then(num => {
        if (num == 1) {
          res.send({
            message: "It was updated successfully."
          });
        } else {
            res.send({
              message: `Cannot update the department = ${idC}. Maybe it was not found or req.body is empty!`
            });
          }
        })
        .catch(err => {
            res.status(500).send({message:"Error updating the department with id = " + idC});
        });
};

//Delete a department with the specified id in the request 
exports.delete = (req, res) => {
    const idC = req.params.id;

    Department.destroy({
        where: {idC:idC}
    })
    .then( num => {
        if (num == 1) {
            res.send({
              message: "Department was deleted successfully!"
            });
          } else {
            res.send({
              message: `Cannot delete Department with id = ${idC}. Maybe Department was not found!`
            });
          }
    })
    .catch (err => {
        res.status(500).send({
            message:"Could´nt with department id "+idC
        });
    });

};