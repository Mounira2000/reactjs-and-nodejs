const db = require("../models");
const Department = db.departments;
const Op = db.Sequelize.Op;

// Create and save a new department 
exports.create = (req, res) => {
    //Validate resquest
    if(!req.body.departmentName ) {
        res.status(400).send({
            message:"content can not be empty"
        });
        return;
    }

    //create a department 
    const department = {
    
        departmentName: req.body.departmentName,
        departmentDes: req.body.departmentDes
    };

    //save department in the database 
    Department.create(department)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(400).send({
                message:
                    err.message || "Some error occured while creating the department."
            });
        });


};

// Retreive all departments from the datBASE 
exports.findAll = (req, res ) =>{
    Department.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error ocured while retrieving departements." 
            });
        });
};

// Find a single department  with and id 
exports.findOne = (req, res ) => {
    
    const idD = req.params.id;
    console.log(idD);

    Department.findByPk(idD)
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
    const idD = req.params.id;
    
    Department.update(req.body, {where: {idD:idD}} )
        .then(num => {
        if (num == 1) {
          res.send({
            message: "It was updated successfully."
          });
        } else {
            res.send({
              message: `Cannot update the department = ${idD}. Maybe it was not found or req.body is empty!`
            });
          }
        })
        .catch(err => {
            res.status(500).send({message:"Error updating the department with id = " + idD});
        });
};


//Delete a department with the specified id in the request 
exports.delete = (req, res) => {
    const idD = req.params.id;

    Department.destroy({
        where: {idD:idD}
    })
    .then( num => {
        if (num == 1) {
            res.send({
              message: "Department was deleted successfully!"
            });
          } else {
            res.send({
              message: `Cannot delete Department with id = ${idD}. Maybe Department was not found!`
            });
          }
    })
    .catch (err => {
        res.status(500).send({
            message:"Could´nt with department id "+idD
        });
    });

};