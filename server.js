const express = require("express");
const bodyParser = require("body-parser");
var customerRouter = require('./app/routes/customers/customers.routes');
var app = express();


// parse requests of content-type: application/json
app.use(bodyParser.json());

//app.use(express.static(path.join(__dirname, 'B:/nodejs-express-mysql-mvc-rest-api')));

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// route for handling root requests
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the HomePage" });
});

// use router
app.use('/customers', customerRouter);

// set port, listen for requests
app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});
