const express = require('express');
const  productRouter = express.Router();
const productModule=require('../modules/productModule');
const passport = require("passport")


productRouter.get('/products',passport.authenticate("jwt", { session: false }),async(req,res)=>
{
    
        try {
            console.log("In try products");
            let productList = await productModule.findProducts();
            res.json({ productList })
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    
}),

productRouter.get('/products/:id',passport.authenticate("jwt", { session: false }), async(req,res)=>
{
    try
    {
        console.log(req.params.id)
        console.log("In ProductList based on id");
        const productId=req.params.id;
        let productListById = await productModule.findProductsById(productId);
        res.json(productListById);
    }
    catch(e)
    {
        res.status(400).send(e)   
    }

});

productRouter.put('/products/:id',passport.authenticate("jwt", { session: false }),async(req, res) => 
  {
        const productListById= await productModule.findByIdAndUpdate(req.params.id,req.body.status);
        res.json(productListById);

});






module.exports = productRouter;