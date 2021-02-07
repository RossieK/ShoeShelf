const Shoe = require('../models/Shoe');

function create(data, salesman) {
    const shoe = new Shoe({...data, salesman });
    return shoe.save();
}

function getAll() {
    return Shoe.find().lean();
}

module.exports = {
    create,
    getAll
}