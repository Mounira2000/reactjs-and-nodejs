//we initialize Sequelize appliying the previous transparency setting

const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST, 
       dialect: dbConfig.dialect,
       operatorAliases: false,

       pool:
       {
           max: dbConfig.pool.max,
           min: dbConfig.pool.min,
           acquire:dbConfig.pool.acquire
       }
        
    });

    //indicate all the models
    const db = {};
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;

    db.users = require ("./user.model.js")(sequelize,Sequelize);
    db.places = require ("./place.model.js")(sequelize,Sequelize);
    db.comments = require ("./comment.model.js")(sequelize,Sequelize);
    db.departments = require ("./department.model.js")(sequelize,Sequelize);
    db.images = require("./image.model.js")(sequelize,Sequelize);
    module.exports = db;
    



    

