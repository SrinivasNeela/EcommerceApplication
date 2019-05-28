const express = require("express")
const router = express.Router()
const passport = require("passport")
const jwt = require("jsonwebtoken")
const config = require("../config/database")
const Util = require("../util")
const axios = require("axios")
const Customer = require('../model/Customer')
const CustomerModule = require('../modules/customer')

//register Jhansi
router.post("/register", async (req, res) => {
	const { customer: { name, email, password } } = req.body
	try {
		const customerData = await CustomerModule.findCustomerByEmail(email)
		if (customerData) {
			res.status(400).send("Customer Already Exists")
		} else {
			console.log("hii")
			console.log("hiids")
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
	const { customer: { email, password } } = req.body
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


router.get("/profile", passport.authenticate("jwt", { session: false }), async (req, res) => {
	res.json({ customer: req.user })
});

// view Customers rajesh
router.get("/totalcustomers", async (req, res) => {
	const custList = await CustomerModule.findCustomers();
	res.json(custList);

})

// view orderDetails rajesh
router.get("/orderproductlist", async (req, res) => {
	const orderProductList = await CustomerModule.findorderProductList();
	res.json(orderProductList);
})

// view orders rajesh
router.get("/orderslist", async (req, res) => {
	try {
		const ordersListData = await CustomerModule.findOrdersList()
		res.json(ordersListData);
	}
	catch (e) {
		res.status(400).send(e)
	}
})

// view order by filter - not working -rajesh
router.get("/orderslists/:id", async (req, res) => {
	try {

		const ordersListData = await CustomerModule.findOrdersListById(req.params.id)
		
		res.json({ordersListData})

	}
	catch (e) {
		console.log(e)
		res.status(400).send(e)
	}
})


//  by jhansi


// router.post("/add", async(req, res)=> {

//  // const {customer: {id, name , email, password} } = req.body
// // console.log(customer);

// //	 const cdata = await CustomerModule.findCustomerByEmail("home@gmail.com")
// 	try{

// 		const cdata = await CustomerModule.checkCustomer(req.body.email)
// 		if (cdata) {

// 			res.status(400).send("customer Already Exists.Please try with another EmailId!")
// 		} else {
// 		  var customerData = {
// 							  id: req.body.id,

//                 name: req.body.name,

//                 email: req.body.email,

//                 password: req.body.password,


// 			}
// 			console.log("---------" +customerData)
// 			const customerDetails = await CustomerModule.addCustomer(customerData)
// 			res.json(customerDetails)
// 		}
// }

//   catch (err) {
// 	   console.log(err)
// 	   res.status(400).send(err)
// }
// })

module.exports = router
