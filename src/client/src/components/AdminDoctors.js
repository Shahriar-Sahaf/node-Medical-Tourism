import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Alert, Spinner, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './styles/admin.css';

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    firstName: '',
    lastName: '',
    specialty: ''
  });
  const [adding, setAdding] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const adminData = localStorage.getItem('adminData');
    if (!adminData) {
      navigate('/admin/login');
      return;
    }
    fetchDoctors();
  }, [navigate]);

  const fetchDoctors = async () => {
    try {
      const adminData = localStorage.getItem('adminData');
      if (!adminData) {
        navigate('/admin/login');
        return;
      }
      const admin = JSON.parse(adminData);
      const response = await fetch('http://localhost:3001/api/admin/doctors', {
        headers: {
          'x-admin-email': admin.email,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (response.ok) {
        setDoctors(data);
      } else {
        setError('Failed to load doctors');
      }
    } catch (error) {
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (doctor) => {
    setDoctorToDelete(doctor);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!doctorToDelete) return;
    setDeleting(true);
    try {
      const adminData = localStorage.getItem('adminData');
      if (!adminData) {
        navigate('/admin/login');
        return;
      }
      const admin = JSON.parse(adminData);
      const response = await fetch(`http://localhost:3001/api/admin/doctors/${doctorToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-email': admin.email
        },
      });
      if (response.ok) {
        setDoctors(doctors.filter(doc => doc.id !== doctorToDelete.id));
        setShowDeleteModal(false);
        setDoctorToDelete(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to delete doctor');
      }
    } catch (error) {
      setError('Server error. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    setAdding(true);
    setError('');
    try {
      const adminData = localStorage.getItem('adminData');
      if (!adminData) {
        navigate('/admin/login');
        return;
      }
      const admin = JSON.parse(adminData);
      const response = await fetch('http://localhost:3001/api/admin/doctors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-email': admin.email
        },
        body: JSON.stringify(newDoctor),
      });
      const data = await response.json();
      if (response.ok) {
        setDoctors([...doctors, data.doctor]);
        setNewDoctor({ firstName: '', lastName: '', specialty: '' });
        setError('');
      } else {
        setError(data.message || 'Failed to add doctor');
      }
    } catch (error) {
      setError('Server error. Please try again.');
    } finally {
      setAdding(false);
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
        <h1>Doctor Management</h1>
        <button onClick={() => navigate('/admin/dashboard')} className="back-btn">
          Back to Dashboard
        </button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="add-doctor-form">
        <h3>Add New Doctor</h3>
        <Form onSubmit={handleAddDoctor}>
          <Form.Group controlId="firstName" className="mb-2">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              value={newDoctor.firstName}
              onChange={(e) => setNewDoctor({ ...newDoctor, firstName: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group controlId="lastName" className="mb-2">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={newDoctor.lastName}
              onChange={(e) => setNewDoctor({ ...newDoctor, lastName: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group controlId="specialty" className="mb-2">
            <Form.Label>Specialty</Form.Label>
            <Form.Select
              value={newDoctor.specialty}
              onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
              required
            >
              <option value="">Select Specialty</option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Dentist">Dentist</option>
              <option value="Ophthalmologist">Ophthalmologist</option>
              <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
              <option value="Neurologist">Neurologist</option>
            </Form.Select>
          </Form.Group>
          <Button type="submit" variant="primary" className="mb-3" disabled={adding}>
            {adding ? 'Adding...' : 'Add Doctor'}
          </Button>
        </Form>
      </div>

      <div className="table-container">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Specialty</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td>{doctor.id}</td>
                <td>{doctor.first_name}</td>
                <td>{doctor.last_name}</td>
                <td>{doctor.specialty}</td>
                <td>{new Date(doctor.created_at).toLocaleDateString()}</td>
                <td>
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => confirmDelete(doctor)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete doctor {doctorToDelete?.first_name} {doctorToDelete?.last_name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={deleting}>
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminDoctors;
