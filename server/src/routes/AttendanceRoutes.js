import express from 'express';
import Attendance from '../models/Attendance.js';

const router = express.Router();

// Mark attendance for an employee for a date (YYYY-MM-DD)
router.post('/mark', async (req,res) => {
  try {
    const { employeeId, date, status='present' } = req.body;
    if (!employeeId || !date) return res.status(400).json({ message: 'employeeId and date required' });

    // upsert
    const att = await Attendance.findOneAndUpdate(
      { employee: employeeId, date },
      { employee: employeeId, date, status },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.json(att);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Get attendance for employee in a month
router.get('/:employeeId/:year/:month', async (req,res) => {
  const { employeeId, year, month } = req.params; // month: 1-12
  try {
    const start = `${year}-${String(month).padStart(2,'0')}-01`;
    const end = `${year}-${String(month).padStart(2,'0')}-31`;
    const items = await Attendance.find({ employee: employeeId, date: { $gte: start, $lte: end } });
    res.json(items);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

export default router;