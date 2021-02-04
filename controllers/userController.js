const { Router } = require('express');
const User = require('../models/User');

const router = Router();

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page' });
});

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register Page' });
});

router.post('/register', (req, res) => {
    User.create({...req.body })
        .then(createdUser => console.log(createdUser))
        .catch(err => console.error(err));
});

router.get('/profile', (req, res) => {
    res.render('profile', { title: 'My profile' });
});

module.exports = router;