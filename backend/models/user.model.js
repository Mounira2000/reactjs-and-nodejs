module.exports = (sequelize,Sequelize) =>{
    const User = sequelize.define ("user",{
        
        idU: {
            type: Sequelize.INTEGER,
            primaryKey: true,
             autoIncrement: true
        },
        emailUser: {
            type: Sequelize.STRING
        },
        nameUser: {
            type: Sequelize.STRING
        },
        passwordUser: {
            type: Sequelize.STRING
        }
    });
    return User;
};