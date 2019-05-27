var db = require('../db')

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

module.exports ={findCustomers,findOrdersList, findorderProductList}