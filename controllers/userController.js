const { Router } = require('express');

const router = Router();

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page' });
});

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register Page' });
});

router.post('/register', (req, res) => {
    res.send(req.body).end();
});

router.get('/profile', (req, res) => {
    res.render('profile', { title: 'My profile' });
});

module.exports = router;