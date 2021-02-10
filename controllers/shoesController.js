const { Router } = require('express');
const shoeService = require('../services/shoeService');
const shoeMiddlewareValidator = require('../helpers/shoeMiddlewareValidator');
const formValidator = require('../helpers/formValidator');

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

router.post('/create', shoeMiddlewareValidator, (req, res) => {

    const formValidations = formValidator(req);

    if (!formValidations.isOk) {
        res.render('create', formValidations.options);
        return;
    }

    shoeService.create(req.body, req.user._id)
        .then(() => res.redirect('/shoes'))
        .catch(err => {
            console.error(err._message);
            res.redirect('/shoes/create');
        });
});

router.get('/:id/edit', (req, res) => {
    shoeService.getOne(req.params.id)
        .then(shoe => {
            res.render('edit', { title: 'Edit Page', shoe });
        })
        .catch(err => console.error(err));
});

router.post('/:id/edit', shoeMiddlewareValidator, (req, res) => {
    const formValidations = formValidator(req);

    if (!formValidations.isOk) {
        res.redirect('edit');
        return;
    }

    shoeService.updateOne(req.params.id, req.body)
        .then(() => {
            res.redirect(`/shoes/${req.params.id}/details`);
        })
        .catch(err => console.error(err));
});

router.get('/:id/details', (req, res) => {
    shoeService.getOneWithBuyers(req.params.id)
        .then(shoe => {
            let isSalesman = false;
            if (req.user._id == shoe.salesman) {
                isSalesman = true;
            }

            let buyersCount = shoe.buyers.length;

            let hasBought = false;
            shoe.buyers.forEach(buyer => {
                if (buyer.email == req.user.email) {
                    hasBought = true;
                }
            });

            res.render('details', { title: 'Details Page', shoe, buyersCount, isSalesman, hasBought });
        })
        .catch(err => console.error(err));
});

router.get('/:id/delete', (req, res) => {
    shoeService.deleteOne(req.params.id)
        .then(() => res.redirect('/shoes'))
        .catch(err => console.error(err));
});

router.get('/:id/buy', (req, res) => {
    shoeService.buyOne(req.params.id, req.user._id)
        .then(() => res.redirect(`/shoes/${req.params.id}/details`))
        .catch(err => console.error(err));
});

module.exports = router;