var express = require('express')
var app=express();
var db=require('./db');

const productRouter = require('./routes/products')
var config=require('./config/database')
const port =process.env.port || 9000
app.use('/api',productRouter);
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