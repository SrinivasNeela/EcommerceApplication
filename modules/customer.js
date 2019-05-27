const ObjectID = require("mongodb").ObjectID
const db = require("../db")
const Util=require("../util")

const findCustomerById =async(id)=>{
    try {
        if (!ObjectID.isValid(id)) throw 'Invalid MongoDB ID.'
        return await db.getCollection('customer').findOne(ObjectID(id))
    } catch (e) {   
        throw e
    }
}

const findCustomerByEmail = async email=>{
    try {
        return await db.getCollection('customer').findOne({email})
    } catch (e) {   
        throw e
    }
}

const registerCustomer = async newCustomer => {
    try {
        newCustomer.password = await Util.encryptPassword(newCustomer.password);
        return await db.getCollection('customer').insertOne(newCustomer)
    } catch (e) {
        throw e
    }
}


module.exports ={findCustomerById,findCustomerByEmail,registerCustomer}