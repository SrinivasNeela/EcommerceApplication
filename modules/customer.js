const ObjectID = require("mongodb").ObjectID
const db = require("../db")
const Util=require("../util")

// view Customers
const findCustomers= async =>{
    try {
        return db.getCollection('customers').find({}).toArray();
    } catch (e) {   
        throw e
    }
}

// view orderDetails
const findorderProductList = async =>{
    try {
        return db.getCollection('customers').aggregate([ { $unwind : '$ordersList'},{$group:{'_id':'$ordersList', 'TotalOrderProductsList'  :{ $push: '$ordersList.orderedProductsList'}}}]).toArray();
    } catch (e) {   
        throw e
    }
}

// view orders
const findOrdersList = async =>{
    try{

        return db.getCollection('customers').aggregate([{$group:{'_id':null, 'TotalOrdersList'  :{ $push: '$ordersList'}}}]).toArray();
    }
    catch(e)
    {
        throw e
    }
}





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


module.exports ={findCustomerById,findCustomerByEmail,registerCustomer,findCustomers,findOrdersList, findorderProductList}

