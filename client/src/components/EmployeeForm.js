import { useState } from 'react';
import { api } from '../api';
import './EmployeeForm.css';

export default function EmployeeForm() {
  const [form, setForm] = useState({ name:'', email:'', role:'', monthlySalary:0 });
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/employees', form);
      setMsg('Employee created');
      setForm({ name:'', email:'', role:'', monthlySalary:0 });
    } catch(err) {
      setMsg(err?.response?.data?.message || err.message);
    }
  }

  return (
    <form onSubmit={submit} className="employee-form-container">
      <h2>Add Employee</h2>
      <input name="name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name" required />
      <input name="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" required />
      <input name="role" value={form.role} onChange={e=>setForm({...form,role:e.target.value})} placeholder="Role" />
      <input name="monthlySalary" type="number" value={form.monthlySalary} onChange={e=>setForm({...form,monthlySalary:Number(e.target.value)})} placeholder="Monthly Salary" required />
      <button type="submit">Create</button>
      {msg && <p>{msg}</p>}
    </form>
  );
}
