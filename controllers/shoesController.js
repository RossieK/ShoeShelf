const { Router } = require('express');
const shoeService = require('../services/shoeService');

const router = Router();

router.get('/', (req, res) => {
    res.render('shoes', { title: 'Shoe Shelf' });
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create Course Page' });
});

router.post('/create', (req, res) => {
    shoeService.create(req.body, req.user._id)
        .then(() => res.redirect('/shoes'))
        .catch(err => {
            console.error(err._message);
            res.redirect('/shoes/create');
        });
});

router.get('/edit', (req, res) => {
    res.render('edit', { title: 'Edit Page' })
});

router.get('/details', (req, res) => {
    res.render('details', { title: 'Details Page' });
});

module.exports = router;