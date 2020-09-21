const customerModel = require("../models/customer.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Customer
    const customer = new customerModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        bookingFrom: req.body.bookingFrom,
        bookingFromSource: req.body.bookingFromSource,
        bookingFromDest: req.body.bookingFromDest,
        bookingTill: req.body.bookingTill,
        bookingStart: req.body.bookingStart,
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut,
        hotelName: req.body.hotelName

    });

    // Save Customer in the database
    customerModel.create(customer, (err, data) => {
    console.log(data);
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Customer."
            });
        else res.send(data);
    });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    customerModel.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};


// Find a single Customer with a email// Update a Customer identified by the customerId in the request
  exports.update = (req, res) => {
     // Validate Request
     if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
       });
  }

  customerModel.updateByEmail(
    req.params.email,
    new customerModel(req.body),
    (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
         res.status(404).send({
         message: `Not found Customer with email ${req.params.email}.`
    });
    } else {
       res.status(500).send({
       message: "Error updating Customer with email " + req.params.email
     });
    }
    } else res.send(data);
   }
   );
  };


//Retrieves a single customer by email
exports.findOne  = (req, res) => {
    customerModel.findByEmail(req.params.email, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.email}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Customer with id " + req.params.email
                });
            }
        } else res.send(data);
    });
};





