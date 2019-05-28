const ObjectID = require("mongodb").ObjectID
const db = require("../db")
const Util=require("../util")

const findAdminById =async(id)=>{
    try {
        if (!ObjectID.isValid(id)) throw 'Invalid MongoDB ID.'
        return await db.getCollection('admin').findOne(ObjectID(id))
    } catch (e) {   
        throw e
    }
}

const findAdminByphoneNo = async phoneNo=>{
    try {
        return await db.getCollection('admin').findOne({phoneNo})
    } catch (e) {   
        throw e
    }
}

const registerAdmin = async newAdmin => {
    try {
        newAdmin.password = await Util.encryptPassword(newAdmin.password);
        return await db.getCollection('admin').insertOne(newAdmin)
    } catch (e) {
        throw e
    }
}


module.exports ={findAdminById,registerAdmin,findAdminByphoneNo}