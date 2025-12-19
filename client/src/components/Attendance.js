import { useEffect, useState } from 'react';
import { api } from '../api';
import './Attendance.css';  

export default function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [msg, setMsg] = useState('');

  useEffect(()=>{ api.get('/employees').then(r=>setEmployees(r.data)); },[]);

  const mark = async (employeeId, status='present') =>{
    try{
      await api.post('/attendance/mark', { employeeId, date, status });
      setMsg('Marked');
    }catch(e){ setMsg(e.message); }
  }

  return (
    <div className="attendance-container">
      <h2>Attendance — {date}</h2>
      <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
      <ul className="attendance-list">
        {employees.map(emp=> (
          <li key={emp._id}>
            <div className="attendance-emp">{emp.name} ({emp.role})</div>
            <div className="attendance-actions">
              <button onClick={()=>mark(emp._id,'present')}>Present</button>
              <button onClick={()=>mark(emp._id,'absent')}>Absent</button>
              <button onClick={()=>mark(emp._id,'leave')}>Leave</button>
            </div>
          </li>
        ))}
      </ul>
      {msg && <p>{msg}</p>}
    </div>
  );
}
