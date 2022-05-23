module.exports = app => {
    const departments = require("../controllers/department.controller.js");

    var router = require("express").Router();

    //Create a new Departmemt
    router.post ("/", departments.create);

    //Retreive all department
    router.get ("/", departments.findAll);

    //retreive one department
    router.get("/:id",departments.findOne);

    //delete department
    router.delete("/:id", departments.delete);

    //update department 
    router.put("/:id",departments.update);

    app.use('/api/departments',router);

};