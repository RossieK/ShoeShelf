const { Router } = require('express');
const homeController = require('./controllers/homeController');
const shoesController = require('./controllers/shoesController');
const userController = require('./controllers/userController');

const router = Router();

router.use('/', homeController);
router.use('/shoes', shoesController);
router.use('/user', userController);

module.exports = router;