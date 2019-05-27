const express = require('express')
const app=express();
var db=require('./db');
var config=require('./config/database')
const port =process.env.port || 9000
const bodyParser=require('body-parser');
var productRouter=require('./routes/productRouter.js');
var adminRouter=require('./routes/admin.js');


app.get('/',(req, res)=> res.send("hii"));
app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());

app.use('/api',productRouter)
{
	console.log("It Customer Schema")
};

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