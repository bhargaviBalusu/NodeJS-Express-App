const sql = require("./db.js");

// constructor
const Customer = function(customer) {

    this.username = customer.username;
    this.email = customer.email;
    this.password = customer.password;
    this.bookingFrom=customer.bookingFrom;
    this.bookingFromSource=customer.bookingFromSource;
    this.bookingFromDest=customer.bookingFromDest;
    this.bookingTill=customer.bookingTill;
    this.bookingStart=customer.bookingStart;
    this.checkIn=customer.checkIn;
    this.checkOut=customer.checkOut;
    this.hotelName=customer.hotelName;

};



//Get All customers
Customer.getAll = result => {
    sql.query("SELECT * FROM user", (err, res) => {
        if (err) {
            console.log("error: ", err);
                   result(null, err);
                   return;
               }

               console.log("customers: ", res);
               result(null, res);
           });
};


//Insert /Create new customer
Customer.create = (newCustomer, result) => {
console.log(newCustomer);
    sql.query("INSERT INTO user SET ?", newCustomer, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created customer: ", { id: res.insertId, ...newCustomer });
        result(null, { id: res.insertId, ...newCustomer });
    });
};

//Retrieves a customer by email
Customer.findByEmail = (email, result) => {
    sql.query(`SELECT * FROM user WHERE email = '${email}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found customer: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

//Updates a flight reservation by email
Customer.updateByEmail = (email, customer, result) => {
    sql.query(
        "UPDATE user SET bookingFrom = ?, bookingFromSource = ? , bookingFromDest= ?, bookingTill = ? WHERE email = ?",
        [customer.bookingFrom, customer.bookingFromSource, customer.bookingFromDest, customer.bookingTill, email],
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

            console.log("updated customer: ", { email: email, ...customer });
            result(null, { email: email, ...customer });
        }
    );
};


module.exports = Customer;
