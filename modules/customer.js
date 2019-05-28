<<<<<<< HEAD
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
=======
const ObjectID = require("mongodb").ObjectID
const db = require("../db")
const Util=require("../util")

// view Customers
const findCustomers= async =>{
    try {
        return db.getCollection('customer').find({}).toArray();
    } catch (e) {   
        throw e
    }
}

// view orderDetails
const findorderProductList = async =>{
    try {
        return db.getCollection('customer').aggregate([ { $unwind : '$ordersList'},{$group:{'_id':'$ordersList', 'TotalOrderProductsList'  :{ $push: '$ordersList.orderedProductsList'}}}]).toArray();
    } catch (e) {   
        throw e
    }
}

// view orders
const findOrdersList = async =>{
    try{

        return db.getCollection('customer').aggregate([{$group:{'_id':null, 'TotalOrdersList'  :{ $push: '$ordersList'}}}]).toArray();
    }
    catch(e)
    {
        throw e
    }
}



const findOrdersListById= async id =>
{
    try 
    {
    
    //  return   db.getCollection('customer').find({ 'ordersList.id' : id }).toArray();
    return db.getCollection('customer').aggregate([{ $unwind : '$ordersList'}, { $match : { 'ordersList.id':id  } }, { $group: {  '_id':null,'ordersList': { $push : '$ordersList' }}}]).toArray()
    }
    catch(e)
    {
        console.log(e);
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


module.exports ={findCustomerById,findCustomerByEmail,registerCustomer,findCustomers,findOrdersList, findorderProductList,findOrdersListById}

>>>>>>> 48c1ab277a6f6fa7956ef62b8e8975ff9ce86409
