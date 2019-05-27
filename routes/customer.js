const express = require("express")
const router = express.Router()
const passport = require("passport")
const jwt = require("jsonwebtoken")
const config = require("../config/database")
const Util = require("../util")
const axios = require("axios")
const Customer =require('../model/Customer')
const CustomerModule =require ("../modules/customer")

router.get("/view", async (req, res) => {
	console.log("hii")
 	try {
console.log("hii")
       
 		const customer = await CustomerModule.tcustomers();
         res.json( customer )
	} catch (err) {
		console.log(err)
		res.status(400).send(err)
	}
})


router.post("/add", async(req, res)=> {

 // const {customer: {id, name , email, password} } = req.body
// console.log(customer);

//	 const cdata = await CustomerModule.findCustomerByEmail("home@gmail.com")
	try{
	
		const cdata = await CustomerModule.checkCustomer(req.body.email)
		if (cdata) {
			
			res.status(400).send("customer Already Exists.Please try with another EmailId!")
		} else {
		  var customerData = {
							  id: req.body.id,

                name: req.body.name,

                email: req.body.email,

                password: req.body.password,

               
			}
			console.log("---------" +customerData)
			const customerDetails = await CustomerModule.addCustomer(customerData)
			res.json(customerDetails)
		}
}

  catch (err) {
	   console.log(err)
	   res.status(400).send(err)
}
})

module.exports =router;