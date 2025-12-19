import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'Engineer' },
  joinDate: { type: Date, default: () => new Date() },
  monthlySalary: { type: Number, required: true, min: 0 }
}, { timestamps: true });

export default mongoose.model('Employee', EmployeeSchema);