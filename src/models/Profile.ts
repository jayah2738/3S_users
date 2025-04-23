import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: String,
  parentEmail: String,
  avatar: String,
  preferences: {
    emailNotifications: {
      type: Boolean,
      default: true,
    },
    language: {
      type: String,
      default: 'en',
    },
  },
  progress: [{
    subject: String,
    completedLessons: [String],
    quizScores: [{
      quizId: String,
      score: Number,
      dateTaken: Date,
    }],
  }],
});

export default mongoose.models.Profile || mongoose.model('Profile', profileSchema); 