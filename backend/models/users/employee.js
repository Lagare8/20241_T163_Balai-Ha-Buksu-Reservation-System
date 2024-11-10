import mongoose from 'mongoose';
//NOTE  sa admin ni nga kuan para ma fetch sa admin ang mga employeee
const employeeSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const Employee = mongoose.models.Employee || mongoose.model('Employee', employeeSchema);

export default Employee;
