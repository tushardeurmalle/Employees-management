import express from 'express';
import Payroll from '../models/Payroll.js';
import Attendance from '../models/Attendance.js';
import Employee from '../models/Employee.js';

const router = express.Router();

// Generate payroll for one employee for given year/month
router.post('/generate', async (req,res) => {
  try {
    const { employeeId, year, month, workingDays, deductions=0 } = req.body;
    if (!employeeId || !year || !month || !workingDays) return res.status(400).json({ message: 'Missing fields' });

    const emp = await Employee.findById(employeeId);
    if (!emp) return res.status(404).json({ message: 'Employee not found' });

    // Count present days
    const start = `${year}-${String(month).padStart(2,'0')}-01`;
    const end = `${year}-${String(month).padStart(2,'0')}-31`;
    const records = await Attendance.find({ employee: employeeId, date: { $gte: start, $lte: end }, status: 'present' });
    const presentDays = records.length;

    const grossPay = (emp.monthlySalary / workingDays) * presentDays;
    const netPay = Math.max(0, grossPay - Number(deductions || 0));

    const payrollData = { employee: employeeId, year, month, workingDays, presentDays, grossPay, deductions, netPay };

    // upsert payroll
    const saved = await Payroll.findOneAndUpdate(
      { employee: employeeId, year, month },
      payrollData,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json(saved);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Get payrolls (optional employeeId)
router.get('/', async (req,res) => {
  const { employeeId } = req.query;
  const filter = employeeId ? { employee: employeeId } : {};
  const items = await Payroll.find(filter).populate('employee').sort({ year: -1, month: -1 });
  res.json(items);
});

export default router;