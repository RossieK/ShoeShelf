const bcrypt = require('bcrypt');
const User = require('../models/User');
const { salt_rounds } = require('../config/config');

async function register(data) {
    const { email, fullName, password } = {...data };

    let foundUser = await User.findOne({ email });

    if (foundUser) {
        throw new Error('The given email is already in use...');
    }

    let salt = await bcrypt.genSalt(salt_rounds);
    let hash = await bcrypt.hash(password, salt);

    const user = new User({ email, fullName, password: hash });
    return user.save();
}

module.exports = {
    register
}