
import Employee from '../models/users/employee.js'; // Adjust path as needed

const postEmployee = async (req, res) => {
    try {
        const { username, email, role } = req.body;
        const newEmployee = new Employee({ username, email, role });
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(400).json({ message: "Error adding employee", error });
    }
};

const getEmployee = async (req, res) => {
    try {
        const employees = await Employee.find();
        console.log("Employees fetched from database:", employees);
        res.status(200).json(employees);
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({ message: "Error fetching employees", error });
    }
};
const putEmployee = async (req, res) => {

}

const deleteEmployee = async (req, res) => {

}

const getEmployeeById = async (req, res) => {

}

const getRooms =async (req,res) => {

}

const putRooms = async (req, res) => {

}

const getRoomById =async (req, res) => {

}

export {postEmployee, getEmployee, putEmployee, deleteEmployee,getEmployeeById, getRoomById, getRooms, putRooms}
