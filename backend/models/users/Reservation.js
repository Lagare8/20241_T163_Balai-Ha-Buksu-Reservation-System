import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reserveType: {
    type: String,
    enum: ['Room', 'Function Hall', 'Catering'],
    required: true,
  },
  reservationDetails: {
    roomNumber: { type: Number, required: false },
    cateringOptions: { type: Array, required: false },
  },
  date: { type: Date, required: true },
});

export default mongoose.model('Reservation', reservationSchema);
