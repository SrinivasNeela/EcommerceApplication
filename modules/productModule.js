var db = require('../db.js');


const findProducts = async() => {
    try {
        return await db.getCollection('products').find({}).toArray();
    } catch (e) {
    throw e
}
}
module.exports={findProducts};