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

function getOneWithBuyers(id) {
    return Shoe.findOne({ _id: id }).populate('buyers', { email: 1 }).populate('salesman', { email: 1 }).lean();
}

function deleteOne(id) {
    return Shoe.deleteOne({ _id: id });
}

function updateOne(id, data) {
    return Shoe.updateOne({ _id: id }, data);
}

async function buyOne(productId, userId) {
    let shoe = await getOne(productId);
    shoe.buyers.push(userId);
    return Shoe.updateOne({ _id: productId }, { buyers: shoe.buyers });
}

function getOffersOfUser(userId) {
    return Shoe.find({ salesman: userId }).lean();
}

function getShoesOfUser(userId) {
    return Shoe.find({ buyers: { "$in": [userId] } }).lean();
}

module.exports = {
    create,
    getAll,
    getOne,
    getOneWithBuyers,
    deleteOne,
    updateOne,
    buyOne,
    getOffersOfUser,
    getShoesOfUser
}