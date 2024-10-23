const express = require('express')
const app = express()


//DB CONNECTION
require("./config/databaseConnection");
const MongoDBStore = require("connect-mongodb-session")(session);

const sessionStore = new MongoDBStore({
    //// dre ang pag store sa session /////
})

///USER ROUTES//////
app.put('/update-status/reservations/:id', (req, res) => { //update
 
});

app.get('/reservations/status', (req, res) => {
 // employee can see the reservation status
})

app.get('/booking-history', (req, res) => {
/// view the booking history ///
})

app.delete('/cancel/reservations/:id', (req, res) => {
  // the employee can cancel the bookings
});


app.get('/reservation', (req, res) => {
  res.send('Hello World!')
});
const Id = req.body.Bookingid;

app.post("/CancelReservation", function (req, res) {
  res.send('Hello World!')
});

app.post('/reservation/reserve', (req, res) => {
    res.send('Hello World!')
  });

app.get('/reservation/employee', (req, res) => {
  
});
app.post('/reservation/addemployee', (req, res) => {

});

app.delete('/reservation/employee/i/:id', (req, res) => {

});

app.get('/reservation/status', (req, res) => {

})

//// EMPLOYEEE ROUTES///////
app.put('/update-status/reservations/:id', (req, res) => { //update
 
});

app.get('/reservations/status', (req, res) => {
 // employee can see the reservation status
})

app.get('/booking-history', (req, res) => {
/// view the booking history ///
})

app.delete('/cancel/reservations/:id', (req, res) => {
  // the employee can cancel the bookings
});


////ADMIN ROUTESSS//////

app.get("/goToAdminSection",function(req,res){
  res.sendFile(__dirname + "/adminLogin.html");
})

app.post("/goToAdminSection",async function(req,res){
  //validation sa admin///
})

app.post("/showAllBookings", function(req,res){
/// view all boookings////
})

app.get('/reservations/status', (req, res) => {
  /// admin view all the reservstion status ///
})

app.get('/booking-history', (req, res) => {
/// view the booking history ///
})



app.listen(3000)
