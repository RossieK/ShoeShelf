const { Router } = require('express');
const userService = require('../services/userService');
const shoeService = require('../services/shoeService');
const { cookie_name } = require('../config/config');
const registerValidator = require('../helpers/registerMiddlewareValidator');
const formValidator = require('../helpers/formValidator');
const isAuthenticated = require('../helpers/isAuthenticated');
const isGuest = require('../helpers/isGuest');

const router = Router();

router.get('/login', isGuest, (req, res) => {
    res.render('login', { title: 'Login Page' });
});

router.post('/login', isGuest, async(req, res) => {
    const { email, password } = req.body;

    try {
        let token = await userService.login({ email, password });
        res.cookie(cookie_name, token);
        res.redirect('/shoes');
    } catch (error) {
        res.render('login', { oldInput: {...req.body }, message: error.message, title: 'Login Page' });
    }
});

router.get('/register', isGuest, (req, res) => {
    res.render('register', { title: 'Register Page' });
});

router.post('/register', isGuest, registerValidator, (req, res) => {

    const formValidations = formValidator(req);

    if (!formValidations.isOk) {
        res.render('register', {...formValidations.options, title: 'Register Page' });
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
            res.render('register', { oldInput: {...req.body }, message: err.message, title: 'Register Page' });
        });
});

router.get('/logout', isAuthenticated, (req, res) => {
    res.clearCookie(cookie_name);
    res.redirect('/user/login');
})

router.get('/profile', isAuthenticated, async(req, res) => {
    let userOffers = await shoeService.getOffersOfUser(req.user._id);
    let userOffersLength = userOffers.length;

    let totalPrice = 0;
    let userShoes = await shoeService.getShoesOfUser(req.user._id);
    userShoes.forEach(shoe => {
        totalPrice += Number(shoe.price);
    });

    res.render('profile', { title: 'My profile', userOffersLength, userShoes, totalPrice });
});

module.exports = router;