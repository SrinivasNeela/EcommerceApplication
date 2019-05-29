const ObjectID = require("mongodb").ObjectID
const db = require("../db")
const Util = require("../util")

// view Customers
const findCustomers = async () => {
    try {
        return await db.getCollection('customer').find({}).toArray();
    } catch (e) {
        throw e
    }
}

// view orderDetails
const findorderProductList = async () => {
    try {
        return await db.getCollection('customer').aggregate([{ $unwind: '$ordersList' }, { $group: { '_id': null, 'orderedProductsList': { $push: '$ordersList.orderedProductsList' } } }]).toArray();
    } catch (e) {
        throw e
    }
}

// view orders
const findOrdersList = async () => {
    try {

        return await db.getCollection('customer').aggregate([{ $group: { '_id': null, 'ordersList': { $push: '$ordersList' } } }]).toArray();
    }
    catch (e) {
        throw e
    }
}



const findOrdersListById = async id => {
    try {
        return await (db.getCollection('customer').aggregate([{ $unwind: '$ordersList' }, { $match: { 'ordersList.id': Number(id) } }, { $group: { '_id': null, 'ordersList': { $push: '$ordersList' } } }])).toArray()
    }
    catch (e) {
        throw e
    }
}

const findById = async id => {
    try {
        if (!ObjectID.isValid(id)) throw 'Invalid MongoDB ID.'
        return await db.getCollection('customer').findOne(ObjectID(id))
    } catch (e) {
        throw e
    }
}

const findByEmail = async email => {
    try {
        return await db.getCollection('customer').findOne({ email })
    } catch (e) {
        throw e
    }
}

const register = async newCustomer => {
    try {
        newCustomer.password = await Util.encryptPassword(newCustomer.password);
        return await db.getCollection('customer').insertOne(newCustomer)
    } catch (e) {
        throw e
    }
}


module.exports = { findById, findByEmail, register, findCustomers, findOrdersList, findorderProductList, findOrdersListById }

