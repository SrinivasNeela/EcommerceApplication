const express = require("express")
const router = express.Router();
const config = require("../config/database")
const customerModule = require('../modules/customer')

// view Customers
router.get("/totalcustomers", async (req, res) =>{
    const custList = await customerModule.findCustomers();
    res.json(custList);

})

// view orderDetails
router.get("/orderproductlist", async (req, res) =>{
    const orderProductList = await customerModule.findorderProductList();
    res.json(orderProductList);
})

// view orders
router.get("/orderslist",  async(req,res)=>{
  try{
    const ordersListData = await customerModule.findOrdersList()
    res.json(ordersListData);
  }
  catch(e)
  {
    res.status(400).send(e)
  }
})

// view order by filter - not working
router.get("/orderslists/customerid",  async(req,res)=>{
    try{
      const ordersListData = await customerModule.findOrdersList()
      console.log(ordersListData)
      ordersListData.forEach(data =>{
        if(req.params.customerid in data.fields) {
            ordersListData.push(data.fields[req.params.customerid].value);
        }
      });
      //console.log(ordersListData);
      res.json(ordersListData);
    }
    catch(e)
    {
      res.status(400).send(e)
    }
  })


module.exports = router;