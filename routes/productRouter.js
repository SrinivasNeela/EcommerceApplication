const express=require('express');

const productRouter=express.Router();
const productModule=require('../modules/productModule');

productRouter.get('/products',async(req,res)=>{
    
        try {
            let productList = await productModule.findProducts();
            res.json({ productList })
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    
})

module.exports=productRouter;