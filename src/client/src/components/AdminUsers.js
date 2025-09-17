import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Modal, Alert, Spinner, Form } from 'react-bootstrap';
import './styles/admin.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isAdmin: false
  });
  const [adding, setAdding] = useState(false);
  const navigate = useNavigate();
  

  useEffect(() => {
    const adminData = localStorage.getItem('adminData');
    if (!adminData) {
      navigate('/admin/login');
      return;
    }

    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const adminData = localStorage.getItem('adminData');
      if (!adminData) {
        navigate('/admin/login');
        return;
      }

      const admin = JSON.parse(adminData);
      const response = await fetch('http://localhost:3001/api/admin/users', {
        headers: {
          'x-admin-email': admin.email
        }
      });
      const data = await response.json();

      if (response.ok) {
        setUsers(data);
      } else {
        setError('Failed to load users');
      }
    } catch (error) {
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!userToDelete) return;

    setDeleting(true);
    try {
      const adminData = localStorage.getItem('adminData');
      if (!adminData) {
        navigate('/admin/login');
        return;
      }

      const admin = JSON.parse(adminData);
      const response = await fetch(`http://localhost:3001/api/admin/users/${userToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-email': admin.email
        },
      });

      if (response.ok) {
        setUsers(users.filter(user => user.id !== userToDelete.id));
        setShowDeleteModal(false);
        setUserToDelete(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to delete user');
      }
    } catch (error) {
      setError('Server error. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  const confirmDelete = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleAddUser = async (e) => {
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
      const response = await fetch('http://localhost:3001/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-email': admin.email
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (response.ok) {
        setUsers([...users, data.user]);
        setNewUser({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          isAdmin: false
        });
        setError('');
      } else {
        setError(data.message || 'Failed to add user');
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
        <h1>User Management</h1>
        <button onClick={() => navigate('/admin/dashboard')} className="back-btn">
          Back to Dashboard
        </button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="add-user-form">
        <h3>Add New User</h3>
        <Form onSubmit={handleAddUser}>
          <Form.Group controlId="firstName" className="mb-2">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              value={newUser.firstName}
              onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group controlId="lastName" className="mb-2">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={newUser.lastName}
              onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group controlId="email" className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group controlId="password" className="mb-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group controlId="isAdmin" className="mb-3">
            <Form.Check
              type="checkbox"
              label="Make this user an admin"
              checked={newUser.isAdmin}
              onChange={(e) => setNewUser({ ...newUser, isAdmin: e.target.checked })}
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="mb-3" disabled={adding}>
            {adding ? 'Adding...' : 'Add User'}
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
              <th>Email</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{new Date(user.created_at).toLocaleDateString()}</td>
                <td>
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => confirmDelete(user)}
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
          Are you sure you want to delete user {userToDelete?.first_name} {userToDelete?.last_name}?
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

export default AdminUsers;
