const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors")
const dotenv = require("dotenv");
require("dotenv").config();


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

app.get('/reservations/status', (req, res) => {
  /// admin view all the reservstion status ///
})

app.get('/booking-history', (req, res) => {
/// view the booking history ///
})



app.listen(3000)



const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const dotenv = require("dotenv");
require("dotenv").config();

//---------------------------------------Server setup-------------------------------------------*/
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:["http://localhost:3000"],
    credentials:true
}));

const PORT = process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`Server start on port : ${PORT}`)
})



///---------------------------------------connect to mongoDB-------------------------------------------
    //Type 01
const URL= process.env.MONGO_CONNECT;

mongoose
    .connect(URL,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log('DB connection successful!'));

  

/*---------------------------------------Create Routes-------------------------------------------*/

/*
//api for employee managemet of Admin
const employeesRouter = require('./routes/emp-manager/employees.js');
app.use('/employees',employeesRouter);
const adminloginRouter = require('./routes/adminlogin.js');
app.use('/adminlogin',adminloginRouter);

*/