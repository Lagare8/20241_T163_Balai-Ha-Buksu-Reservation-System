import mongoose from 'mongoose';

const lockSchema = new mongoose.Schema({
    resource: { type: String, required: true, unique: true }, // Resource name, e.g., "addEmployee"
    isLocked: { type: Boolean, default: false },
    lockedBy: { type: String }, // Admin ID or email
    lockedAt: { type: Date, default: Date.now },
});

const Lock = mongoose.model('Lock', lockSchema);
export default Lock;
