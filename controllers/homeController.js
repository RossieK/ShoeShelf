const { Router } = require('express');
const isGuest = require('../helpers/isGuest');

const router = Router();

router.get('/', isGuest, (req, res) => {
    res.render('home', { title: 'Shoe Shelf' });
});

module.exports = router;