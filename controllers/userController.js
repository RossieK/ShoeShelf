const { Router } = require('express');
const userService = require('../services/userService');

const router = Router();

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page' });
});

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register Page' });
});

router.post('/register', (req, res) => {
    const { email, fullName, password, rePassword } = {...req.body };

    if (password.length < 3 || password !== rePassword) {
        res.redirect('/user/register');
    }

    userService.register(req.body)
        .then(() => res.redirect('/user/login'))
        .catch(err => {
            console.error(err);
            res.redirect('/user/register');
        });
});

router.get('/profile', (req, res) => {
    res.render('profile', { title: 'My profile' });
});

module.exports = router;