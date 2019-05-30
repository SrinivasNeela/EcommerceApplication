const express = require('express')
	, app = express()
	, bodyParser = require("body-parser")
	, passport = require("passport")
	, db = require('./db')
	, config = require('./config/database')
	, port = process.env.PORT || 4000
	, adminRouter = require("./routes/admin")
	, customerRouter = require('./routes/customer')
	,COMMENTS =require('./properties')
require("./config/passport")(passport)

//middleware functions
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())

//user routes
app.use("/admin", adminRouter)
app.use("/customer", customerRouter)

//main routes
app.get('/', (req, res) => res.send(COMMENTS.MAIN_ROUTE));
app.get('*', (req, res) => res.send(COMMENTS.CHECK_URL_PATH))

//mongoDB connection
db.connect(config.database, function (err) {
	if (err) {
		process.exit(1)
	} else {
		app.listen(port);
	}
})