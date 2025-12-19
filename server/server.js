import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import employeeRoutes from './src/routes/EmployeeRoutes.js';
import attendanceRoutes from './src/routes/AttendanceRoutes.js';
import payrollRoutes from './src/routes/PayrollRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/payroll', payrollRoutes);

app.get('/api/health', (req,res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5000;
(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/employeeApp');
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  } catch (err) { console.error(err); process.exit(1); }
})();