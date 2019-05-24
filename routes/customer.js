const express = require("express")
const router = express.Router()
const passport = require("passport")
const jwt = require("jsonwebtoken")
const config = require("../config/database")
const Util = require("../util")
const axios = require("axios")
const Customer =require('../model/Customer')
const CustomerModule =require('../modules/customer')

//register srinivas
router.post("/register",  async (req, res) => {
	const {customer: {name ,email, password} } = req.body
	try {
            const customerData = await CustomerModule.findCustomerByEmail(email)
			if (customerData) {
				res.status(400).send("Customer Already Exists")
			} else {
                console.log("hii")
                const regCustom = new Customer(name, email, password);
				const registeredCustomer = await CustomerModule.registerCustomer(regCustom)
				res.json(registeredCustomer)
            }
		} 
	   catch (err) {
           console.log(err)
		   res.status(400).send(err)
	}
})

// Login srinivas
router.post("/login", async (req, res) => {
	const { customer : {email, password }} = req.body
 	try {
 		const customer = await CustomerModule.findCustomerByEmail(email)
		if (customer) {
		const isMatch = await Util.comparePassword(password, customer.password)
			if (isMatch) {
				const token = jwt.sign(customer, config.secret, {
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
			res.json({ success: false, message: "Customer Does Not Exists" })
		}
	} catch (err) {
		console.log(err)
		res.status(400).send(err)
	}
})

module.exports =router