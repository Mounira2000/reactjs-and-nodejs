//const { sequelize, Sequelize } = require(".");

module.exports = (sequelize,Sequelize) => {
    const Comment = sequelize.define("comment",
     {
        idC: {
            type: Sequelize.INTEGER,
            primaryKey: true,
             autoIncrement: true
        },
        contentComment: {
            type: Sequelize.STRING
        },
        
        idU: {
            type: Sequelize.INTEGER,
            references: {
                model:'users',
                key:'idU',
            }
            
        },

        idP: {
            type: Sequelize.INTEGER,
            references: {
                model:'places',
                key:'idP',
            }
        }
    });
    return Comment;
} ;
