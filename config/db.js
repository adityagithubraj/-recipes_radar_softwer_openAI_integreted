const mysql = require ("mysql")
var mysqlConnection = mysql.createConnection({

    host:"localhost",
    user:"root",
    password:"123",
    database:"recipes"

})

var connection = mysqlConnection.connect((err)=>{

    if(err){console.log("error in conection DB")}

    else(console.log("DB conected succefully"))
})

module.exports = connection