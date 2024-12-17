import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// User Schema Definition
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: String,
    city: String,
    country: String,
    cellphone: { type: String, required: true },
    profilePicture: {type: String},
}, { timestamps: true });

// Hash password before saving to database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Skip hashing if not modified
    console.log('Password before middleware hashing:', this.password);
    this.password = await bcrypt.hash(this.password, 10);
    console.log('Password after middleware hashing:', this.password);
    next();
});

// Method to compare entered password with the hashed password stored in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password); // Compare entered password with the stored hashed password
};

// Create and export the User model
const User = mongoose.model('User', userSchema);
const Employee = mongoose.model('Employee', userSchema);
const Admin = mongoose.model('Admin', userSchema);

export { User, Employee, Admin };