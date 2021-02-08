const { body } = require('express-validator');

module.exports = [
    body('name', 'The name should be at least 3 characters long').isLength({ min: 3 }),
    body('price', 'Please add a valid price').isFloat({ min: 0 }),
    body('imageUrl', 'Please add an image URL').isLength({ min: 3 }),
    body('description', 'Please add a description').isLength({ min: 3 }),
    body('brand', 'Please add a brand').isLength({ min: 2 }),
]