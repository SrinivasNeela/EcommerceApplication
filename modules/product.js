const db = require("../db")
const findProducts = async () => {
    try {
        console.log("in findProducts");
        return await db.getCollection('Products').find({}).toArray();
    } catch (e) {
        throw e
    }
}
module.exports = {findProducts}