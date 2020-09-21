const userModel = require("../models/user.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Customer
    const user = new userModel({
        username: req.body.username,
        email: req.body.email,
        bookingFrom: req.body.bookingFrom,
        bookingFromSource: req.body.bookingFromSource,
        bookingFromDest: req.body.bookingFromDest,
        bookingTill: req.body.bookingTill,
        bookingStart: req.body.bookingStart,
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut,
        hotelName: req.body.hotelName,
        mailingAddress: req.body.mailingAddress,
        age: req.body.age,
        gender:req.body.gender,
        bookingName: req.body.bookingName,
        ID:req.body.ID

    });

};

exports.findOne  = (req, res) => {
          userModel.findByUsername((err, data) => {
               if (err)
                   res.status(500).send({
                      message:
                        err.message || "Some error occurred while retrieving customers."
                   });
                    else res.send(data);
             });
};


exports.findUser  = (req, res) => {
    userModel.findUsername(req.params.email, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with id ${req.params.email}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Customer with id " + req.params.email
                });
            }
        } else res.send(data);
    });
};
//Gets Hotel reservations
exports.findHotel  = (req, res) => {
    userModel.findHotelUsername(req.params.username, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with id ${req.params.username}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Customer with id " + req.params.username
                });
            }
        } else res.send(data);
    });
};

//Updates Flights Reservation
exports.updateFlightReservation = (req, res) => {
      // Validate Request
      if (!req.body) {
         res.status(400).send({
         message: "Content can not be empty!"
        });
   }

   userModel.updateFlight(
     req.params.email,
     new userModel(req.body),
     (err, data) => {
     if (err) {
       if (err.kind === "not_found") {
          res.status(404).send({
          message: `Not found user with email ${req.params.email}.`
     });
     } else {
        res.status(500).send({
        message: "Error updating user with username " + req.params.email
      });
     }
     } else res.send(data);
    }
    );
 };

 //Updates Flights Reservation User Info
 exports.updateFlightUserInfo = (req, res) => {
       // Validate Request
       if (!req.body) {
          res.status(400).send({
          message: "Content can not be empty!"
         });
    }

    userModel.updateFlightInfo(
      req.params.ID,
      new userModel(req.body),
      (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
           res.status(404).send({
           message: `Not found user with ID ${req.params.ID}.`
      });
      } else {
         res.status(500).send({
         message: "Error updating user with username " + req.params.ID
       });
      }
      } else res.send(data);
     }
     );
  };

 //Updates Hotel Reservation
 exports.updateHotelReservation = (req, res) => {
       // Validate Request
       if (!req.body) {
          res.status(400).send({
          message: "Content can not be empty!"
         });
    }

    userModel.updateHotel(
      req.params.username,
      new userModel(req.body),
      (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
           res.status(404).send({
           message: `Not found user with username ${req.params.username}.`
      });
      } else {
         res.status(500).send({
         message: "Error updating user with username " + req.params.username
       });
      }
      } else res.send(data);
     }
     );
  };

