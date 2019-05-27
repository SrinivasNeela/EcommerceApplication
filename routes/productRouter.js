const express = require('express');
const  productRouter = express.Router();
const productModule=require('../modules/productModule');



productRouter.get('/products',async(req,res)=>
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

productRouter.get('/products/:id', async(req,res)=>
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

productRouter.put('/products/:id',async(req, res) => 
  {
        const productListById= await productModule.findByIdAndUpdate(req.params.id,req.body.status);
        res.json(productListById);

});






module.exports = productRouter;