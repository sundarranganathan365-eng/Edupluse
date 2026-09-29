import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { LayoutDashboard, Users, CalendarCheck, BookOpen, FileText, LogOut } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import StudentsModule from './pages/StudentsModule';
import AttendanceModule from './pages/AttendanceModule';
import MarksModule from './pages/MarksModule';
import ReportPreview from './pages/ReportPreview';
import LoginPage from './pages/LoginPage';

const Sidebar = ({ onLogout }) => {
  return (
    <div className="sidebar">
      <h2>Admin Portal</h2>
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={20} /> Dashboard
        </NavLink>
        <NavLink to="/students" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Users size={20} /> Students
        </NavLink>
        <NavLink to="/attendance" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <CalendarCheck size={20} /> Attendance
        </NavLink>
        <NavLink to="/marks" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <BookOpen size={20} /> Tests & Exams
        </NavLink>
        <NavLink to="/reports" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <FileText size={20} /> Report Preview
        </NavLink>
      </div>
      
      <div style={{ marginTop: 'auto' }}>
        <button 
          onClick={onLogout} 
          className="nav-link" 
          style={{ width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--danger)' }}
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </div>
  );
};

const Layout = ({ children, onLogout }) => {
  return (
    <div className="app-container">
      <Sidebar onLogout={onLogout} />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

function App() {
  // Simple mock auth state (persisted to localStorage)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('adminAuth') === 'true';
  });

  const handleLogin = () => {
    localStorage.setItem('adminAuth', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      {!isAuthenticated ? (
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        <Layout onLogout={handleLogout}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<StudentsModule />} />
            <Route path="/attendance" element={<AttendanceModule />} />
            <Route path="/marks" element={<MarksModule />} />
            <Route path="/reports" element={<ReportPreview />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      )}
    </BrowserRouter>
  );
}

export default App;
