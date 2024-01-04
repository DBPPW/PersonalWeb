const express = require('express');
const bodyParser = require('body-parser');
const validation = require('./validation');
const databaseOperations = require('./database_operation');

const app = express();

app.use(bodyParser.json());

app.post('/register', (req, res) => {
    const { username, password, confirmPassword } = req.body;

    // 資料驗證
    if (!validation.validateUsername(username)) {
        res.status(400).send({ message: 'Username is too short.' });
        return;
    }
    if (!validation.validatePassword(password)) {
        res.status(400).send({ message: 'Password is too short.' });
        return;
    }
    if (!validation.validateConfirmPassword(password, confirmPassword)) {
        res.status(400).send({ message: 'Passwords are inconsistent.' });
        return;
    }

    // 資料庫操作
    const result = databaseOperations.insertUser(username, password);
    if (result.error) {
        res.status(500).send(result.error);
        return;
    }

    // 回應結果
    res.status(200).send({ message: 'SignUp Success' });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
