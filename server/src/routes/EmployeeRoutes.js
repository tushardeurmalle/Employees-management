import express from 'express';
import Employee from '../models/Employee.js';

const router = express.Router();

// Create employee
router.post('/', async (req, res) => {
  try {
    const { name, email, role, joinDate, monthlySalary } = req.body;
    const e = new Employee({ name, email, role, joinDate, monthlySalary });
    const saved = await e.save();
    res.status(201).json(saved);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

// List employees
router.get('/', async (req, res) => {
  const list = await Employee.find().sort({ createdAt: -1 });
  res.json(list);
});

export default router;