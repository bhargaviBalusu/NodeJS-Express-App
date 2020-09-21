const sql = require("./db.js");

// constructor
const User = function(user) {

    this.username = user.username;
    this.email = user.email;
    this.bookingFrom=user.bookingFrom;
    this.bookingFromSource=user.bookingFromSource;
    this.bookingFromDest=user.bookingFromDest;
    this.bookingTill=user.bookingTill;
    this.bookingStart=user.bookingStart;
    this.checkIn=user.checkIn;
    this.checkOut=user.checkOut;
    this.hotelName=user.hotelName;
    this.mailingAddress=user.mailingAddress;
    this.age=user.age;
    this.gender=user.gender;
    this.bookingName=user.bookingName;
    this.ID=user.ID;

};
//Gets all users
User.findByUsername =result => {
  sql.query("SELECT * FROM hotelflights", (err, res) => {
        if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }

                console.log("customers: ", res);
                result(null, res);
         });
};

//Gets a specific user
User.findUsername = (email, result) => {
    sql.query(`SELECT * FROM hotelflights WHERE email = '${email}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found customer: ", res);
            result(null, res);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

//Gets Hotel Reservation

User.findHotelUsername = (username, result) => {
    sql.query(`SELECT * FROM hotelflights WHERE username = '${username}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found customer: ", res);
            result(null, res);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};


//Updates Flights
User.updateFlight = (email, user, result) => {
    sql.query(
        "INSERT INTO hotelflights SET email=?, username=?, bookingFrom = ?, bookingFromSource = ? , bookingFromDest= ?, bookingTill = ? , ID = ?",
        [email, user.bookingFrom, user.username, user.bookingFromSource, user.bookingFromDest, user.bookingTill, user.ID],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated customer: ", { email: email, ...user });
            result(null, { email: email, ...user });
        }
    );
};

//Updates Flights User Info
User.updateFlightInfo = (ID, user, result) => {
    sql.query(
        "UPDATE hotelflights SET email=?, bookingName=?, age = ?, gender = ? , mailingAddress= ? WHERE ID = ?",
        [user.email, user.bookingName, user.age, user.gender, user.mailingAddress, ID],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated customer: ", { ID: ID, ...user });
            result(null, { ID: ID, ...user });
        }
    );
};

//Updates Hotels
User.updateHotel = (username, user, result) => {
    sql.query(
        "INSERT INTO hotelflights SET checkIn = ?, checkOut = ? , hotelName= ? , ID=? ,bookingName=?, username = ?",
        [user.checkIn, user.checkOut, user.hotelName, user.ID, user.bookingName, username],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated customer: ", { username: username, ...user });
            result(null, { username: username, ...user });
        }
    );
};


module.exports = User;

