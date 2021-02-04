const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.render('shoes', { title: 'Shoe Shelf' });
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create Course Page' });
});

router.get('/edit', (req, res) => {
    res.render('edit', { title: 'Edit Page' })
});

router.get('/details', (req, res) => {
    res.render('details', { title: 'Details Page' });
});

module.exports = router;