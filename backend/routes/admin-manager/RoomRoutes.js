const router = require("express").Router();
const Room = require("./employees");


//View all rooms
router.get('/', async(req,res)=>{
    try{
        const allRooms = await Room.find();
        res.status(200).send({data : allRooms});
    }catch(err){
        res.status(500).send({data : err});
    }
})



//update Rooms
router.route("/:id").put(async(req,res)=>{
    let roomID = req.params.id;  //get unique user id from data base

    const {roomname,noOfguests,roomtype,facilities,rentperday,description,url1,url2,url3} = req.body;  // get update details from frontend
    

    const updateRoom = {
        roomname,
        noOfguests,
        roomtype,
        facilities,
        rentperday,
        description,
        url1,
        url2,
        url3,
        
    }

    const update = await Room.findByIdAndUpdate(roomID,updateRoom ).then(()=>{
        res.status(200).send({status: "Room details are updated"});
    }).catch((e)=>{
     //console.log.(err.message);
        console.log(e);
        res.status(500).send({status:"Error in updating employee datails"})
    })

    

})


//This route used to view specific Room details 
router.get('/:id',async(req,res)=>{
    try{
        let id = req.params.id;
        const room = await Room.find({_id : id})
        res.status(200).send({data : room});

    }catch(err){
        res.status(500).send({data : err});
    }

})

// GET: View the booking history
app.get('/booking-history', (req, res) => {

    res.json(reservations);
  });

  // DELETE: Employee can cancel the bookings
app.delete('/cancel/reservations/:id', (req, res) => {
    const { id } = req.params;
  
    // Find the index of the reservation to delete
    const reservationIndex = reservations.findIndex(r => r.id === parseInt(id));
    
    if (reservationIndex !== -1) {
     
      const canceledReservation = reservations.splice(reservationIndex, 1);
      res.send(`Reservation ID ${id} has been canceled`);
    } else {
      res.status(404).send('Reservation not found');
    }
  });
  


module.exports = router;