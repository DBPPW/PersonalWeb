function validateUsername(username) {
    if (username.length < 3) {
        return false;
    }
    return true;
}

function validatePassword(password) {
    if (password.length < 8) {
        return false;
    }
    return true;
}

function validateConfirmPassword(password, confirmPassword) {
    return password === confirmPassword;
}

module.exports = {
    validateUsername,
    validatePassword,
    validateConfirmPassword
}