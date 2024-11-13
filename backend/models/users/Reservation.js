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
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'canceled'],  
    default: 'pending',                          
  },
}, {
  timestamps: true,  
}, {
  date: {type: Date, required: true},
  history: [
    {
      status: {type: String, enum: ['confirmed', 'pending'], required: true},
      changedAt: {type: Date, default: Date.now},
    }
  ]
}
);

export default mongoose.model('Reservation', reservationSchema);
