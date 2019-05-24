const express = require('express');
const Product = require('../modules/product');
var log = require('log4js').getLogger('debug');


  const productRouter = express.Router();
  productRouter.route('/products')
       .get(async (req, res) =>
        {
          try {
             log.info("In products GET method");
             let productList = await Product.findProducts();
             res.json({ productList });
             log.info("GET method Successful");
          }
          catch (err) {
            console.log(err);
            res.status(400).send(err);
            log.info("GET method Error");
          }

       })
       .post(async (req, res) => {
        try {
          log.info("In products POST method");
            var productData = {
                id: req.body.id,
                description: req.body.description,
                finish: req.body.finish,
                price: req.body.price,
                status: req.body.status,
                imagesList: req.body.imagesList,

            }
            await Product.insertProduct(productData);
            res.status(201);
            log.info("POST method Successful");
            return res.json("product added");
           
    
        }
        catch (err) {
            res.status(400).send(err);
            log.info("POST method Error");
        }

       })
    
module.exports = productRouter;