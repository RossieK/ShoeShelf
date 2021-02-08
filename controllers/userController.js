const { Router } = require('express');
const userService = require('../services/userService');
const { cookie_name } = require('../config/config');
const registerValidator = require('../helpers/registerMiddlewareValidator');
const formValidator = require('../helpers/formValidator');
const isAuthenticated = require('../helpers/isAuthenticated');

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
        res.render('login', { oldInput: {...req.body }, message: error.message });
    }
});

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register Page' });
});

router.post('/register', registerValidator, (req, res) => {

    const formValidations = formValidator(req);

    if (!formValidations.isOk) {
        res.render('register', formValidations.options);
        return;
    }

    const { email, fullName, password, rePassword } = req.body;

    userService.register({ email, fullName, password })
        .then(async(user) => {
            let token = await userService.registerToken(user);
            res.cookie(cookie_name, token);
            res.redirect('/shoes');
        })
        .catch(err => {
            res.render('register', { oldInput: {...req.body }, message: err.message });
        });
});

router.get('/logout', isAuthenticated, (req, res) => {
    res.clearCookie(cookie_name);
    res.redirect('/');
})

router.get('/profile', isAuthenticated, (req, res) => {
    res.render('profile', { title: 'My profile' });
});

module.exports = router;