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
        res.redirect('/shoes');
    } catch (error) {
        res.render('login');
    }
});

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register Page' });
});

router.post('/register', (req, res) => {
    const { email, fullName, password, rePassword } = req.body;

    if (!email || !fullName || !password || !rePassword || password.length < 3 || password != rePassword) {
        res.render('register');
        return;
    }

    userService.register({ email, fullName, password })
        .then(async(user) => {
            let token = await userService.registerToken(user);
            res.cookie(cookie_name, token);
            res.redirect('/shoes');
        })
        .catch(err => {
            console.error(err);
            res.redirect('/user/register');
        });
});

router.get('/logout', (req, res) => {
    res.clearCookie(cookie_name);
    res.redirect('/');
})

router.get('/profile', (req, res) => {
    res.render('profile', { title: 'My profile' });
});

module.exports = router;