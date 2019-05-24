const ObjectID = require("mongodb").ObjectID
const db = require("../db")
const Util=require("../util")

const findAdminById =async(id)=>{
    try {
        if (!ObjectID.isValid(id)) throw 'Invalid MongoDB ID.'
        return await db.getCollection('LinkedIn').findOne(ObjectID(id))
    } catch (e) {   
        throw e
    }
}

module.exports ={findAdminById}