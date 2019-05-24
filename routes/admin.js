const express = require("express")
const router = express.Router()
const passport = require("passport")
const jwt = require("jsonwebtoken")
const config = require("../config/database")
const Util = require("../util")
const axios = require("axios")
const Admin =require('../model/Admin')
const AdminModule =require ("../modules/admin")

//register srinivas
router.post("/register",  async (req, res) => {
	const {admin: { username ,phoneNo, password} } = req.body
	try {
            const adminData = await AdminModule.findAdminByphoneNo(phoneNo)
			if (adminData) {
				res.status(400).send("Admin Already Exists")
			} else {
                console.log("hii")
                const regAdmin = new Admin(username, phoneNo, password);
				const registeredAdmin = await AdminModule.registerAdmin(regAdmin)
				res.json(registeredAdmin)
            }
		} 
	   catch (err) {
           console.log(err)
		   res.status(400).send(err)
	}
})

// Login srinivas
router.post("/login", async (req, res) => {
	const { admin : { phoneNo, password }} = req.body
 	try {
         const admin = await AdminModule.findAdminByphoneNo(phoneNo)

		if (admin) {
		const isMatch = await Util.comparePassword(password, admin.password)
			if (isMatch) {
				const token = jwt.sign(admin, config.secret, {
                    expiresIn: 604800, // 1 Week 			
                	})
				res.json({
					success: true,
					message: "Login Successfull",
 					token: `JWT ${token}`     
 					})
 			
            }
             else {
 				res.json({ success: false, message: "Wrong Password" })
 			}
 		} else {
			res.json({ success: false, message: "Admin  Does Not Exists" })
		}
	} catch (err) {
		console.log(err)
		res.status(400).send(err)
	}
})

module.exports =router