var express = require('express')
var app=express();
const passport = require("passport")
var db=require('./db');
var config=require('./config/database')
const port =process.env.port || 9000
app.use(passport.initialize())
app.use(passport.session())
require("./config/passport")(passport)


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