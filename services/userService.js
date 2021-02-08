const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { salt_rounds, secret } = require('../config/config');

async function register(data) {
    const { email, fullName, password } = {...data };

    let foundUser = await User.findOne({ email });

    if (foundUser) {
        throw new Error('The given email is already in use');
    }

    let salt = await bcrypt.genSalt(salt_rounds);
    let hash = await bcrypt.hash(password, salt);

    const user = new User({ email, fullName, password: hash });
    return user.save();
}

async function login({ email, password }) {
    let user = await User.findOne({ email });

    if (!user) {
        throw new Error('User not found...');
    }

    let passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error('Incorrect password...');
    }

    let token = jwt.sign({ _id: user._id }, secret);
    return token;
}

function registerToken(user) {
    let token = jwt.sign({ _id: user._id }, secret);
    return token;
}

async function getOne(id) {
    const user = await User.findOne({ _id: id });
    return user;
}

module.exports = {
    register,
    login,
    registerToken,
    getOne
}