import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import Attendance from './components/Attendance';
import Payroll from './components/Payroll';
import './App.css'; // Import CSS

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <h1>Employee Management</h1>

        {/* Navigation Menu */}
        <nav className="nav-menu">
          <Link to="/">Employees</Link>
          <Link to="/add">Add Employee</Link>
          <Link to="/attendance">Attendance</Link>
          <Link to="/payroll">Payroll</Link>
        </nav>

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/add" element={<EmployeeForm />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/payroll" element={<Payroll />} />
        </Routes>
      </div>
    </Router>
  );
}
