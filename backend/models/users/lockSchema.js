import mongoose from 'mongoose';

const lockSchema = new mongoose.Schema({
    isLocked: {
        type: Boolean,
        required: true,
        default: false,
    },
});

const Lock = mongoose.model('Lock', lockSchema);
export default Lock;
