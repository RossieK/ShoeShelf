const { body } = require('express-validator');

module.exports = [
    body('email', 'The provided email is not valid').isEmail().isLength({ min: 3 }),
    body('fullName', 'Please add your names').isLength({ min: 5 }),
    body('password', 'The password should be at least 3 characters long and should consist only from english letters and digits').isAlphanumeric('en-US').isLength({ min: 3 }),
    body('rePassword').custom(customRePasswordCheck)
]

function customRePasswordCheck(rePassword, { req }) {
    if (rePassword != req.body.password) {
        throw new Error('Both passwords should match');
    }

    return true;
};