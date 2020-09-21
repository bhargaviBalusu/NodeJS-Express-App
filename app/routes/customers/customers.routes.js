var express = require('express');
var router = express.Router();
const customerController = require("../../controllers/customer.controller.js");
const userController = require("../../controllers/user.controller.js");


// Retrieve all Customers
router.get("/", customerController.findAll);


// Create a new Customer
router.post("/", customerController.create);

//View Hotel Reservations by username
router.get("/hotels/:username", userController.findHotel);
//View Flight Reservations by email
router.get("/flights/:email", userController.findUser);

//Gets Customer by Email
router.get("/:email", customerController.findOne);

//Updates Flight Reservation
router.post("/flights/:email", userController.updateFlightReservation);
//Updates Hotel Reservation
router.post("/hotels/:username", userController.updateHotelReservation);

//Updates Flight User Info
router.post("/flightsuser/:ID", userController.updateFlightUserInfo);

module.exports = router;
