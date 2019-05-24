var express = require('express')
var app=express();
var db=require('./db');
const bodyParser = require ('body-parser');
const log4js = require('log4js');

const productRouter = require('./routes/products')
var config=require('./config/database')
const port =process.env.port || 9000

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api',productRouter);

app.get('/',(req, res)=> res.send("hii"));
app.get('*',(req,res)=>res.send("please check Your URL"))


log4js.configure({
    appenders: {
	  consoleAppender: { type: 'console' },
      fileAppender: { type: 'file', filename: './logs/debug.log',maxLogSize: 20480,
      backups: 10 }
    },
    categories: 
    {
	  default: { appenders: ['consoleAppender'], level: 'info' },
      debug: { appenders: ['fileAppender'], level: 'debug' },
	}
  });
   var logger = log4js.getLogger();
   logger.info("In debug");


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