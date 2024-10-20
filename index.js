const express = require('express')
const app = express()




///USER ROUTES//////

app.get('/reservation', (req, res) => {
  res.send('Hello World!')
});
const Id = req.body.Bookingid;

user.deleteOne({ BookingId : Id}).then(item => {
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

});

//// EMPLOYEEE ROUTES///////


////ADMIN ROUTESSS//////



app.listen(3000)