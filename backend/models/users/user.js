import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// User Schema Definition
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true }, // This field is required
    password: { type: String, required: true },
    userType: { type: String, enum: ['User', 'Employee', 'Admin'], default: 'User' },
}, { timestamps: true });


// Hash password before saving to database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Only hash the password if it's new or modified

    // Hash password with bcrypt
    this.password = await bcrypt.hash(this.password, 10); // 10 is the salt rounds
    next();
});

// Method to compare entered password with the hashed password stored in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password); // Compare entered password with the stored hashed password
};

// Create and export the User model
const User = mongoose.model('User', userSchema);

export default User;
