//const { Sequelize } = require(".");

module.exports = (sequelize,Sequelize) => {
    const Place = sequelize.define("place",
    {
        idP:{
            type: Sequelize.INTEGER,
             primaryKey: true,
             autoIncrement: true
        },
        namePlace:{
            type: Sequelize.STRING,
            
        },

        descriptionPlace:{
            type: Sequelize.STRING
        },

        typePlace:{
            type: Sequelize.STRING
        },

        numberLike: {
            type: Sequelize.INTEGER
        },

        longitude: {
            type: Sequelize.INTEGER
        },

        latitude: {
            type: Sequelize.INTEGER
        },

        idD:{
            type: Sequelize.INTEGER,
            references: {
                model:'departments',
                key:'idD',
            }
        }


    });
    return Place;
};