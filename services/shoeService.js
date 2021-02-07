const Shoe = require('../models/Shoe');

function create(data, salesman) {
    const shoe = new Shoe({...data, salesman });
    return shoe.save();
}

module.exports = {
    create
}