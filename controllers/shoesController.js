const { Router } = require('express');
const shoeService = require('../services/shoeService');

const router = Router();

router.get('/', (req, res) => {
    shoeService.getAll()
        .then(shoes => {
            res.render('shoes', { title: 'Shoe Shelf', shoes });
        })
        .catch(err => console.error(err));
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

router.get('/:id/edit', (req, res) => {
    res.render('edit', { title: 'Edit Page' })
});

router.get('/:id/details', (req, res) => {
    shoeService.getOne(req.params.id)
        .then(shoe => {
            let buyersCount = shoe.buyers.length;
            res.render('details', { title: 'Details Page', shoe, buyersCount });
        })
        .catch(err => console.error(err));
});

router.get('/:id/delete', (req, res) => {
    shoeService.deleteOne(req.params.id)
        .then(() => res.redirect('/shoes'))
        .catch(err => console.error(err));
});

module.exports = router;