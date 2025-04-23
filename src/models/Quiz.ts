import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [{
    text: String,
    isCorrect: Boolean,
  }],
  type: {
    type: String,
    enum: ['multiple_choice', 'true_false', 'short_answer'],
    default: 'multiple_choice',
  },
  points: {
    type: Number,
    default: 1,
  },
});

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  grade: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  questions: [questionSchema],
  timeLimit: {
    type: Number, // in minutes
    default: 30,
  },
  passingScore: {
    type: Number,
    default: 60,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.models.Quiz || mongoose.model('Quiz', quizSchema); 