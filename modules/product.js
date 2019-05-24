const db = require("../db")
const findProducts = async () => {
    try {
         return await db.getCollection('Products').find({}).toArray();
    } catch (e) {
        throw e
    }
}

const insertProduct = async newProduct => {
    try {
        return await db.getCollection('Products').insertOne(newProduct)
    }
    catch (e) {
        throw e
    }
}
module.exports = {findProducts, insertProduct}