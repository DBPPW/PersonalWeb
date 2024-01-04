const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rain1100",
    database: "lixiangtsun"
});

module.exports = connection;