const express = require("express")
	, router = express.Router()
	, passport = require("passport")
	, jwt = require("jsonwebtoken")
	, config = require("../config/database")
	, util = require("../util")
	, Admin = require('../model/Admin')
	, adminModule = require("../modules/admin")
	, productModule = require('../modules/productModule')
	, productModel = require('../model/Product')
	, COMMENTS = require('../properties')
//Admin register

router.post("/register", async (req, res) => {
	const { admin: { username, phoneNo, password } } = req.body
	try {
		const adminInfo = await adminModule.findByphoneNo(phoneNo)
		if (adminInfo) {
			res.status(400).send(COMMENTS.ADMIN_ALREADY_EXISTS)
		} else {
			const regAdmin = new Admin(username, phoneNo, password);
			const registeredAdmin = await adminModule.register(regAdmin)
			res.json(registeredAdmin)
		}
	}
	catch (err) {
		res.status(400).send(err)
	}
})


// Admin Login 
router.post("/login", async (req, res) => {
	const { admin: { phoneNo, password } } = req.body
	try {
		const admin = await adminModule.findByphoneNo(phoneNo)

		if (admin) {
			const isMatch = await util.comparePassword(password, admin.password)
			if (isMatch) {
				const token = jwt.sign(admin, config.secret, {
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
			res.json({ success: false, message: COMMENTS.ADMIN_DOESNT_EXISTS })
		}
	} catch (err) {
		res.status(400).send(err)
	}
})


//Admin profile

router.get("/profile", passport.authenticate("jwt", { session: false }), async (req, res) => { res.json({ admin: req.user }) });


router.post("/addProduct", passport.authenticate("jwt", { session: false }), async (req, res) => {
	const { product: { id, description, finish, price, imagesList } } = req.body
	try {
		let addproduct = new productModel(id, description, finish, price, status = 0, imagesList)
		let productInfo = await productModule.addProduct(addproduct)
		res.json({ productInfo })
	}
	catch (e) {
		res.status(400).send(e)
	}
})

router.get('/productsList', passport.authenticate("jwt", { session: false }), async (req, res) => {
	try {
		let productList = await productModule.findProducts();
		res.json({ productList })
	}
	catch (err) {
		res.status(400).send(err)
	}
}),

	router.get('/products/:id', passport.authenticate("jwt", { session: false }), async (req, res) => {
		try {
			let productListById = await productModule.findById(req.params.id);
			res.json(productListById);
		}
		catch (e) {
			res.status(400).send(e)
		}

	});

router.put('/products/:id', passport.authenticate("jwt", { session: false }), async (req, res) => {
	const productListById = await productModule.findByIdAndUpdate(req.params.id, req.body.status);
	res.json(productListById);

});


module.exports = router
