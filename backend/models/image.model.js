//const { INTEGER } = require("sequelize/types");
//const { sequelize, Sequelize, places } = require(".");

module.exports = (sequelize,Sequelize) =>{
    const Image = sequelize.define("image",
    {
        idImage:{
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },

        linkImage:
        {
            type: Sequelize.STRING
        },

        idP:
        {
            type : Sequelize.INTEGER,
            references:
            {
                model: 'places',
                key:'idP'
            }
        }

    });
    return Image;
} ;