const express = require("express")
const router = express.Router()
const passport = require("passport")
const jwt = require("jsonwebtoken")
const config = require("../config/database")
const Util = require("../util")
const axios = require("axios")
const Admin = require('../model/Admin')
const AdminModule = require("../modules/admin")
const productModule = require('../modules/productModule');
const productModel = require('../model/Product')

//Admin register

router.post("/register", async (req, res) => {
	const { admin: { username, phoneNo, password } } = req.body
	try {
		const adminData = await AdminModule.findAdminByphoneNo(phoneNo)
		if (adminData) {
			res.status(400).send("Admin Already Exists")
		} else {
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



// Admin Login 
router.post("/login", async (req, res) => {
	const { admin: { phoneNo, password } } = req.body
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


//Admin profile

router.get("/profile", passport.authenticate("jwt", { session: false }), async (req, res) => { res.json({ admin: req.user }) });



router.post("/addProduct",passport.authenticate("jwt", { session: false }),async(req,res)=>{

const { products: { id,description,finish,price,imagesList}}=req.body

  try{
	
	  let products = new productModel(id,description,finish,price,status=0,imagesList)
	  let addedproduct =await productModule.addProduct(products)
	  res.json({addedproduct})
  }
  catch(e)
  {
	  console.log(e)
	res.status(400).send(e)
  }



} )

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
			let productListById = await productModule.findProductsById(req.params.id);
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
