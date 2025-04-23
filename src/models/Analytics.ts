import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: [
        'user_activity',
        'video_watch',
        'quiz_attempt',
        'assignment_submit',
        'progress_update',
      ],
      required: true,
    },
    metadata: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {},
    },
    timestamp: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

analyticsSchema.index({ userId: 1, type: 1, timestamp: -1 });
analyticsSchema.index({ type: 1, timestamp: -1 });

export default mongoose.models.Analytics ||
  mongoose.model('Analytics', analyticsSchema); 