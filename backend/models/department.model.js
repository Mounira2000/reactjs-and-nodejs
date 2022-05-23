//const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Department = sequelize.define("department",
     {
       idD:{
        type: Sequelize.INTEGER,
        primaryKey: true,
         autoIncrement: true
       },

        departmentName: {
            type: Sequelize.STRING
            
        },

        departmentDes: {
            type: Sequelize.STRING
        }
    });
    return Department;
} ;
