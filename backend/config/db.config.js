module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "db_visitBenin",
    dialect: "mysql",
    pool:
    {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

//why using a pool:All queries in MySQL connection are done one after another. 
/*It means that if you want to do 10 queries and each query takes 2 seconds then it will take 20 seconds to complete whole execution.
The solution is to create 10 connection and run each query in a different connection.
    This can be done automatically using connection pool*/