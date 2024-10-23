const router = require("express").Router();
const Room = require("../../models/employee-manager/roomModel");


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


module.exports = router;
