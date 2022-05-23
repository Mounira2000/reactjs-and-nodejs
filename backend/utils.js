//generate token using process.env.jwt_secret
var jwt = require ('jsonwebtoken');

function generateToken (user){

    if (!user) return null;

        var u = {
        //idU: user.idU,
        emailUser: user.emailUser,
        nameUser: user.nameUser,
        passwordUser: user.passwordUser
    };

    return jwt.sign(u, process.env.JWT_SECRET);
}


function getCleanUser (user){

    if (!user) return null;

        return{
        idU: user.idU,
        emailUser: user.emailUser,
        nameUser: user.nameUser,
        passwordUser: user.passwordUser
    };

 };

 module.exports = {
     generateToken,
     getCleanUser
 }