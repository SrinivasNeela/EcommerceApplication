
const db = require("../db")
const Util=require("../util")

const tcustomers =async() =>{
    try {
        
        return await
        db.getCollection('ecommerce').find({}).toArray();
    } catch (e) {   
        throw e
    }
}


const checkCustomer = async email=>{
    try {
        return await db.getCollection('ecommerce').findOne({email})
    } catch (e) {   
        throw e
    }
}


const addCustomer = async newCustomer => {
    try {
        console.log("customer added")
        
        return await db.getCollection('ecommerce').insertOne(newCustomer)
    } catch (e) {
        throw e
    }
}


module.exports ={tcustomers, addCustomer,checkCustomer}