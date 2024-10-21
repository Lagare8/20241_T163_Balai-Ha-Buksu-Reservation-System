const express = require('express')
const app = express()


//DB CONNECTION
require("./config/databaseConnection");
const MongoDBStore = require("connect-mongodb-session")(session);

const sessionStore = new MongoDBStore({
    //// dre ang pag store sa session /////
})

///USER ROUTES//////

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

app.post("/addEmployee", function(req,res){
  /// admin adds employee details to the system ////
})
app.get("/allEmployee", function(req,res){
  /// admin view all employee details from the system ////
})
app.get("/Employee/i/:id", function(req,res){
  /// admin view employee details by id from the system ////
})
app.delete("/deleteEmployee", function(req,res){
  /// admin deletes employee details from the system ////
})
app.put("/updateEmployee", function(req,res){
  /// admin update employee details from the system ////
})


app.get('/reservations/status', (req, res) => {
  /// admin view all the reservstion status ///
})

app.get('/booking-history', (req, res) => {
/// view the booking history ///
})



app.listen(3000)