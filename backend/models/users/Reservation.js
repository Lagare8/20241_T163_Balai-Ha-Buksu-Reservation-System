import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reserveType: {
      type: String,
      enum: ['Room', 'Function Hall', 'Catering'],
      required: true,
    },
    reservationDetails: {
      roomNumber: { type: Number },
      cateringOptions: { type: Array },
    },
    date: { type: Date, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'canceled'],
      default: 'pending',
    },
    history: [
      {
        status: { type: String, enum: ['confirmed', 'pending', 'canceled'], required: true },
        changedAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

export default mongoose.model('Reservation', reservationSchema);
