import { useEffect, useState } from 'react';
import { api } from '../api';
import './EmployeeList.css'; // import CSS

export default function EmployeeList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/employees').then(r => setItems(r.data));
  }, []);

  return (
    <div className="employee-list-container">
      <h2>Employees</h2>
      <ul>
        {items.map(e => (
          <li key={e._id}>
            <span>{e.name}</span>
            <span>{e.email}</span>
            <span>{e.role}</span>
            <span>₹{e.monthlySalary}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
