import mongoose from 'mongoose';

const PayrollSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  year: { type: Number, required: true },
  month: { type: Number, required: true }, // 1-12
  workingDays: { type: Number, required: true },
  presentDays: { type: Number, required: true },
  grossPay: { type: Number, required: true },
  deductions: { type: Number, default: 0 },
  netPay: { type: Number, required: true }
}, { timestamps: true });

PayrollSchema.index({ employee:1, year:1, month:1 }, { unique: true });

export default mongoose.model('Payroll', PayrollSchema);