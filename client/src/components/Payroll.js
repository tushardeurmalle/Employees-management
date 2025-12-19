import { useState, useEffect } from 'react';
import { api } from '../api';
import './Payroll.css'; 

export default function Payroll() {
  const [employees, setEmployees] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth()+1);
  const [workingDays, setWorkingDays] = useState(22);
  const [payrolls, setPayrolls] = useState([]);

  useEffect(() => {
    api.get('/employees').then(r => setEmployees(r.data));
    fetchPayrolls();
  }, []);

  const fetchPayrolls = async () => {
    const res = await api.get('/payroll');
    setPayrolls(res.data);
  }

  const generate = async (employeeId) => {
    await api.post('/payroll/generate', { employeeId, year, month, workingDays });
    fetchPayrolls();
  }

  return (
    <div className="payroll-container">
      <h2>Payroll</h2>

      <div style={{ display:'flex', gap:8, justifyContent:'center', marginBottom: 20 }}>
        <input type="number" value={year} onChange={e=>setYear(Number(e.target.value))} placeholder="Year" />
        <input type="number" value={month} onChange={e=>setMonth(Number(e.target.value))} min={1} max={12} placeholder="Month" />
        <input type="number" value={workingDays} onChange={e=>setWorkingDays(Number(e.target.value))} placeholder="Working Days" />
      </div>

      <h3>Generate per employee</h3>
      <ul className="employee-list">
        {employees.map(emp => (
          <li key={emp._id}>
            <div>{emp.name} — ₹{emp.monthlySalary}</div>
            <button onClick={()=>generate(emp._id)}>Generate</button>
          </li>
        ))}
      </ul>

      <h3>Payroll Records</h3>
      <ul className="payroll-list">
        {payrolls.map(p => (
          <li key={p._id}>
            <div>{p.employee.name} — {p.year}/{p.month} — Present: {p.presentDays} — Net: ₹{p.netPay.toFixed(2)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
