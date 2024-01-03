const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const uuid = require('uuid');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rain1100",
    database: "lixiangtsun"
})

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

const uid = uuid.v4();

app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (password !== req.body.confirmPassword) {
        res.status(400).send({ message: 'Passwords are inconsistent.' });
        return;
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const sql = `
        INSERT INTO User (ID, username, password)
        VALUES (?, ?, ?)
    `;

    connection.query(sql, [uid, username, hashedPassword], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(200).send(({message: "SignUp Success"}));
    });

    // const user = {
    //     username,
    //     password: hashedPassword,
    // };

    // res.status(200).send(user);
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
