const { Router } = require('express');
const homeController = require('./controllers/homeController');
const shoesController = require('./controllers/shoesController');

const router = Router();

router.use('/', homeController);
router.use('/shoes', shoesController);

module.exports = router;