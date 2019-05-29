const express = require("express")
	, router = express.Router()
	, passport = require("passport")
	, jwt = require("jsonwebtoken")
	, config = require("../config/database")
	, util = require("../util")
	, Customer = require('../model/Customer')
	, customerModule = require('../modules/customer')
	, COMMENTS = require("../properties")

//register 
router.post("/register", async (req, res) => {
	const { customer: { name, email, password } } = req.body
	try {
		const customerInfo = await customerModule.findByEmail(email)
		if (customerInfo) {
			res.status(400).send(COMMENTS.CUSTOMER_ALREADY_EXISTS)
		} else {

			const addCustomer = new Customer(name, email, password);
			const registerCustomer = await customerModule.register(addCustomer)
			res.json(registerCustomer)
		}
	}
	catch (err) {
		res.status(400).send(err)
	}
})


// Login 
router.post("/login", async (req, res) => {
	const { customer: { email, password } } = req.body
	try {
		const customer = await CustomerModule.findByEmail(email)
		if (customer) {
			const isMatch = await util.comparePassword(password, customer.password)
			if (isMatch) {
				const token = jwt.sign(customer, config.secret, {
					expiresIn: 604800, // 1 Week 			
				})
				res.json({
					success: true,
					message: COMMENTS.LOGIN_SUCCESSFULL,
					token: `JWT ${token}`
				})

			}
			else {
				res.json({ success: false, message: COMMENTS.WRONG_PASSWORD })
			}
		} else {
			res.json({ success: false, message: COMMENTS.CUSTOMER_DOESNT_EXISTS })
		}
	} catch (err) {
		res.status(400).send(err)
	}
})


router.get("/profile", passport.authenticate("jwt", { session: false }), async (req, res) => {
	res.json({ customer: req.user })
});



// view Customers 
router.get("/totalCustomers", passport.authenticate("jwt", { session: false }), async (req, res) => {
	const totalCustomers = await CustomerModule.findCustomers();
	res.json(totalCustomers);
})


// view orderDetails
router.get("/orderProductList", passport.authenticate("jwt", { session: false }), async (req, res) => {
	const orderProductList = await CustomerModule.findorderProductList();
	res.json(orderProductList);
})

// view orders 
router.get("/ordersList", passport.authenticate("jwt", { session: false }), async (req, res) => {
	try {
		const ordersListInfo = await CustomerModule.findOrdersList()
		res.json(ordersListInfo);
	}
	catch (e) {
		res.status(400).send(e)
	}
})

// view order by filter 
router.get("/ordersList/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
	try {

		const ordersListInfo = await CustomerModule.findOrdersListById(req.params.id)
		res.json({ ordersListInfo })

	}
	catch (e) {
		res.status(400).send(e)
	}
})

module.exports = router
