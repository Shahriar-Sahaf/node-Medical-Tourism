import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/admin.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalReservations: 0,
    todayReservations: 0,
    totalDoctors: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const adminData = localStorage.getItem('adminData');
    if (!adminData) {
      navigate('/admin/login');
      return;
    }

    fetchDashboardStats();
  }, [navigate]);

  const fetchDashboardStats = async () => {
    try {
      const adminData = localStorage.getItem('adminData');
      if (!adminData) {
        navigate('/admin/login');
        return;
      }
      const admin = JSON.parse(adminData);
      const response = await fetch('http://localhost:3001/api/admin/dashboard', {
        headers: {
          'x-admin-email': admin.email
        }
      });
      const data = await response.json();

      if (response.ok) {
        setStats(data);
      } else {
        setError('Failed to load dashboard data');
      }
    } catch (error) {
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    navigate('/admin/login');
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="stat-number">{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Total Reservations</h3>
          <p className="stat-number">{stats.totalReservations}</p>
        </div>
        <div className="stat-card">
          <h3>Today's Reservations</h3>
          <p className="stat-number">{stats.todayReservations}</p>
        </div>
        <div className="stat-card">
          <h3>Total Doctors</h3>
          <p className="stat-number">{stats.totalDoctors}</p>
        </div>
      </div>

      <div className="admin-actions">
          <button onClick={() => navigate('/admin/users')} className="admin-btn">
            Manage Users
          </button>
          <button onClick={() => navigate('/admin/doctors')} className="admin-btn">
            Manage Doctors
          </button>
          <button onClick={() => navigate('/admin/reservations')} className="admin-btn">
            Manage Reservations
          </button>
          <button onClick={() => navigate('/admin/add-admin')} className="admin-btn">
            Add New Admin
          </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
