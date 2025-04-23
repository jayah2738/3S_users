import mongoose from 'mongoose';

const quizResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  answers: [{
    questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
    answer: mongoose.Schema.Types.Mixed,
    isCorrect: Boolean,
    points: Number
  }],
  score: { type: Number, required: true },
  timeTaken: { type: Number, required: true },
  completedAt: { type: Date, default: Date.now }
});

const QuizResult = mongoose.models.QuizResult || mongoose.model('QuizResult', quizResultSchema);

export default QuizResult;