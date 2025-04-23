import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  targetGrade: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['general', 'academic', 'event'],
    default: 'general',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: false,
  },
});

export default mongoose.models.Announcement || mongoose.model('Announcement', announcementSchema); 