const express = require('express')
const app = express()


app.get('/reservation', (req, res) => {
  res.send('Hello World!')
})

app.post('/reservation/reserve', (req, res) => {
    res.send('Hello World!')
  })

app.get('/reservation/employee', (req, res) => {
  
})
app.post('/reservation/addemployee', (req, res) => {

})

app.delete('/reservation/employee/i/:id', (req, res) => {

})

app.get('/reservation/status', (req, res) => {

})



app.listen(3000)