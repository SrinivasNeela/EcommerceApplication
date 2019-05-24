const express = require('express');
const Product = require('../modules/product');
  const productRouter = express.Router();
 console.log("In get products");
  
    productRouter.route('/products')
       .get(async (req, res) => {
        try {
            console.log("In try products");
            let productList = await Product.findProducts();
            res.json({ productList })
        }
        catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    
    });
    
module.exports = productRouter;