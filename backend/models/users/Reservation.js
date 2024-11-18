import mongoose from 'mongoose';

// Reservation Schema Definition
const reservationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reserveType: { type: String, required: true, enum: ['Room', 'Function Hall', 'Catering'] },
    reservationDetails: {
        roomNumber: { type: Number },
    },
    date: { type: Date, required: true },
    cateringOptions: { type: Array, default: [] },
}, { timestamps: true });

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;
