var express = require('express')
var app=express();
const bodyParser = require("body-parser")
const passport = require("passport")
var db=require('./db');
var config=require('./config/database')
const port =process.env.port || 9000
require("./config/passport")(passport)
const admin = require("./routes/admin")
<<<<<<< HEAD
const customer =require('./routes/customer')
=======
const customer = require('./routes/customer')
var productRouter=require('./routes/productRouter.js');
>>>>>>> 48c1ab277a6f6fa7956ef62b8e8975ff9ce86409
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())




//user routes
app.use("/admin", admin)
app.use("/customer", customer)
<<<<<<< HEAD
=======
app.use('/api',productRouter)
>>>>>>> 48c1ab277a6f6fa7956ef62b8e8975ff9ce86409


app.get('/',(req, res)=> res.send("hii"));
app.get('*',(req,res)=>res.send("please check Your URL"))



//mongoDB connection
db.connect(config.database, function (err) {
	if (err) {
		console.log("Unable to connect to Mongo....", err)
		process.exit(1)
	} else {
		console.log("connected to mongodb")
		app.listen(port);
	}
})