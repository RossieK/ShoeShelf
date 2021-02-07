const Shoe = require('../models/Shoe');

function create(data, salesman) {
    const shoe = new Shoe({...data, salesman });
    return shoe.save();
}

function getAll() {
    return Shoe.find().lean();
}

function getOne(id) {
    return Shoe.findOne({ _id: id }).lean();
}

function deleteOne(id) {
    return Shoe.deleteOne({ _id: id });
}

function updateOne(id, data) {
    return Shoe.updateOne({ _id: id }, data);
}

module.exports = {
    create,
    getAll,
    getOne,
    deleteOne,
    updateOne
}