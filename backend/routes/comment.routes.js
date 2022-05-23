module.exports = app =>{
    const comment = require('../controllers/comment.controller.js');

    var router = require("express").Router();


    //create a comment
    router.post("/",comment.create);

    //find all comment 
    router.get("/",comment.findAll);

    //FIND ONE COMMENT by id
    router.get("/:id",comment.findOne);

    //Update a comment 
    router.put("/:id",comment.update);

    // Delete a comment 
    router.delete("/:id",comment.delete);

    app.use('/api/comments',router);

}
 