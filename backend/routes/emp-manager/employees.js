const router = require("express").Router();
const Employees = require("../../models/emp-manager/employees");


//add new employees to  system

router.post('/',async(req,res)=>{
    try{
     
        const savedEmployees = await Employees.create(req.body);
        res.status(200).send({data : savedEmployees});

    }catch(err){
        res.status(500).send({status : err});
    }
})


router.get('/', async(req,res)=>{
    try{
        const allEmployees = await Employees.find();
        res.status(200).send({data : allEmployees});
    }catch(err){
        res.status(500).send({data : err});
    }
})


//update employee details
router.route("/:id").put(async(req,res)=>{
    let Emp_id = req.params.id;
    const { empid,firstname,lastname,emptype,nic,mobile,bank,branch} = req.body;

    const updateEmployee = {
        empid,
        firstname,
        lastname,
        emptype,
        nic,
        mobile,
        bank,
        branch
    }

    const update = await Employees.findByIdAndUpdate(Emp_id,updateEmployee ).then(()=>{
        res.status(200).send({status: "Employee details are updated"});
    }).catch((e)=>{
     //console.log.(err.message);
        console.log(e);
        res.status(500).send({status:"Error in updating employee datails"})
    })

})

//delete employee details
router.delete('/:id',async(req,res)=>{

    try{
        const id = req.params.id;
        const removedEmp = await Employees.findByIdAndDelete(id)
        res.status(200).send({data : removedEmp});
    

    }catch(err){
        res.status(500).send({data : err});
    }

})


//get one emp
router.get('/:id',async(req,res)=>{
    try{
        let id = req.params.id;
        const employee = await Employees.find({_id : id})
        res.status(200).send({data : employee});

    }catch(err){
        res.status(500).send({data : err});
    }

})

//Test emp route
router.route("/test").get((req,res)=>{
    res.json("Employee function working");
});
module.exports = router;