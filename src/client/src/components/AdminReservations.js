import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Badge, Alert, Spinner } from 'react-bootstrap';
import './styles/admin.css';

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const adminData = localStorage.getItem('adminData');
    if (!adminData) {
      navigate('/admin/login');
      return;
    }

    fetchReservations();
  }, [navigate]);

  const fetchReservations = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/admin/reservations');
      const data = await response.json();
      
      if (response.ok) {
        setReservations(data);
      } else {
        setError('Failed to load reservations');
      }
    } catch (error) {
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'scheduled':
        return <Badge bg="primary">Scheduled</Badge>;
      case 'completed':
        return <Badge bg="success">Completed</Badge>;
      case 'cancelled':
        return <Badge bg="danger">Cancelled</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Reservation Management</h1>
        <button onClick={() => navigate('/admin/dashboard')} className="back-btn">
          Back to Dashboard
        </button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="table-container">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Email</th>
              <th>Treatment</th>
              <th>Package</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.id}</td>
                <td>{reservation.first_name} {reservation.last_name}</td>
                <td>{reservation.email}</td>
                <td>{reservation.treatment}</td>
                <td>
                  <Badge bg="info">{reservation.package_tier}</Badge>
                </td>
                <td>{reservation.doctor_first_name} {reservation.doctor_last_name}</td>
                <td>{formatDate(reservation.date)}</td>
                <td>{formatTime(reservation.time)}</td>
                <td>{getStatusBadge(reservation.status)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AdminReservations;
