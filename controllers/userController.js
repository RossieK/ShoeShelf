const { Router } = require('express');
const userService = require('../services/userService');
const { cookie_name } = require('../config/config');

const router = Router();

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page' });
});

router.post('/login', async(req, res) => {
    const { email, password } = req.body;

    try {
        let token = await userService.login({ email, password });
        res.cookie(cookie_name, token);
        res.redirect('/');
    } catch (error) {
        res.render('login');
    }
});

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register Page' });
});

router.post('/register', (req, res) => {
    const { email, fullName, password, rePassword } = req.body;

    if (password.length < 3 || password != rePassword) {
        res.redirect('/user/register');
    }

    userService.register({ email, fullName, password })
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