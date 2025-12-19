import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true, index: true },
  date: { type: String, required: true, index: true }, // YYYY-MM-DD
  status: { type: String, enum: ['present','absent','leave'], default: 'present' }
}, { timestamps: true });

AttendanceSchema.index({ employee: 1, date: 1 }, { unique: true });

export default mongoose.model('Attendance', AttendanceSchema);
