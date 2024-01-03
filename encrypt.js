const bcrypt = require('bcrypt');

function hashPassword(password, saltRounds) {
    return bcrypt.hashSync(password, saltRounds);
}
