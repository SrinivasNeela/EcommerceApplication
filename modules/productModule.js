var db=require('../db.js');
const ObjectID = require("mongodb").ObjectID


const findProducts = async () => {
    try {
        return await db.getCollection('products').find({}).toArray();
    } catch (e) {
        throw e
    }
}

const findProductsById = async id  =>
{
    try
    {
        if(!ObjectID.isValid(id)) throw 'Invalid MongoDB ID.'
        return await db.getCollection('products').findOne(ObjectID(id));
    }
    catch(e)
    {
        throw e;
    }
}


const addProduct = async newProduct => {
    try {
        return await db.getCollection('products').insertOne(newProduct)
    }
    catch (e) {
        throw e
    }
}

const findByIdAndUpdate = async (id,status) =>
{
    try{
       
        return await db.getCollection('products').updateOne({"_id":ObjectID(id)},{$set:{"status":status}})
    }
    catch (e)
    {
        throw e;

    }
}
module.exports = {findProducts,findProductsById,findByIdAndUpdate,addProduct}