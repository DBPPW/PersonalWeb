const connection = require('./database');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

function insertUser(username, password) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const sql = `
        INSERT INTO User (ID, username, password)
        VALUES (?, ?, ?)
    `;
    return connection.query(sql, [uuid.v4(), username, hashedPassword]);
};

module.exports = {
    insertUser
}