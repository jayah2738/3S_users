import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    enum: ['class', 'exam', 'assignment', 'holiday', 'other'],
    default: 'other',
  },
  grade: String,
  subject: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  location: String,
  isRecurring: {
    type: Boolean,
    default: false,
  },
  recurrencePattern: {
    frequency: String, // daily, weekly, monthly
    interval: Number,
    endDate: Date,
  },
  reminders: [{
    type: String, // email, notification
    time: Number, // minutes before event
  }],
});

export default mongoose.models.Event || mongoose.model('Event', eventSchema); 