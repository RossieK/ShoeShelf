const { Router } = require('express');
const homeController = require('./controllers/homeController');
const shoesController = require('./controllers/shoesController');
const userController = require('./controllers/userController');

const isAuthenticated = require('./helpers/isAuthenticated');

const router = Router();

router.use('/', homeController);
router.use('/shoes', isAuthenticated, shoesController);
router.use('/user', userController);

module.exports = router;