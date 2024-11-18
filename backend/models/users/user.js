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
}, { timestamps: true });

// Hash password before saving to database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Only hash the password if it's new or modified
    this.password = await bcrypt.hash(this.password, 10); // 10 is the salt rounds
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