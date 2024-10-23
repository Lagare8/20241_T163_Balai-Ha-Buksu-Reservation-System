const router = require("express").Router();
const adminlogin = require("../models/adminlogin");
const Adminlogin = require("../models/adminlogin");


//add new employee to the system
router.route("/add").post((req,res)=>{

        const username = req.body.username;
        const password = req.body.password;

        const newAdmin = new Adminlogin({
            username,
            password
        })
        newAdmin.save().then(()=>{
            res.json("New Admin Added.")
        }).catch((err)=>{
            //If error occurs this fuction execute
            console.log(err)
        })
})

//retrive data in admin db
router.route("/retrieve").get((req,res)=>{

    Adminlogin.find().then((adminlogin)=>{
        res.json(adminlogin)
    }).catch((err)=>{
        console.log(err)
    })
}) 

//update admin details
router.route("/update/:id").put(async(req,res)=>{
    let Admin_id = req.params.id;
    const { username,password} = req.body;

    const updateAdmin = {
        username,
        password
    }

    Adminlogin.findByIdAndUpdate(Admin_id, updateAdmin).then((UpdateLick)=>{
        res.json("Success");
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data", error: err.message});
    })
})
//delete admin details
router.route("/delete/:id").delete(async(req,res)=>{
    let Admin_id = req.params.id;

    await Adminlogin.findByIdAndDelete(Admin_id).then(()=>{
        res.status(200).send({status: "Admin details Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete details", error: err.message});

    })
})

//get one admin
/*
router.route("/get/:id").get(async(req,res)=>{
    let Admin_id = req.params.id;
    adminlogin.findById(Admin_id).then((adminlogin)=>{
        res.json(adminlogin)
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get admin details", error: err.message});
    })
})
*/
module.exports = router;                                            