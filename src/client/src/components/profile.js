import React, { useState, useEffect } from "react";
import { Container, Button, Card, Table, Badge, Modal, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [reservationToCancel, setReservationToCancel] = useState(null);
  const [cancelling, setCancelling] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  let user = null;
  try {
    if (storedUser && storedUser !== "undefined") {
      user = JSON.parse(storedUser);
    }
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
  }

  useEffect(() => {
    if (user && user.id) {
      fetchUserReservations();
    }
  }, [user]);

  const fetchUserReservations = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/reservation/${user.id}`);
      if (response.ok) {
        const data = await response.json();
        setReservations(data);
      }
    } catch (error) {
      console.error("Error fetching reservations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
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

  const handleCancelReservation = async () => {
    if (!reservationToCancel) return;
    setCancelling(true);
    setMessage("");

    try {
      const response = await fetch(`http://localhost:3001/api/reservation/${reservationToCancel.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Reservation cancelled successfully.");
        setMessageType("success");
        setReservations(reservations.filter(r => r.id !== reservationToCancel.id));
        setShowCancelModal(false);
        setReservationToCancel(null);
      } else {
        setMessage(data.message || "Failed to cancel reservation.");
        setMessageType("danger");
      }
    } catch (error) {
      console.error("Error cancelling reservation:", error);
      setMessage("Server error. Please try again.");
      setMessageType("danger");
    } finally {
      setCancelling(false);
    }
  };

  if (!user) {
    return (
      <Container className="mt-5 text-center">
        <h2>Please log in first</h2>
        <Button href="/login" variant="primary" className="me-2">Log In</Button>
        <Button href="/signup" variant="secondary">Sign Up</Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4 fw-bold text-success">User Profile</h2>
      
      <Card className="text-center shadow-lg border-0 rounded-4 mx-auto p-3 mb-4" style={{ maxWidth: "400px" }}>
        <Card.Body>
          <Card.Title className="fw-bold text-dark">
            {user.firstName} {user.lastName}
          </Card.Title>
          <Card.Text className="text-muted">
            {user.email}
          </Card.Text>
          <Button variant="danger" className="mt-3" onClick={handleLogout}>
            Logout
          </Button>
        </Card.Body>
      </Card>

      <h3 className="text-center mb-4 text-primary">Your Reservations</h3>
      
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : reservations.length === 0 ? (
        <Card className="text-center shadow-sm">
          <Card.Body>
            <Card.Text className="text-muted">No reservations found.</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover className="shadow">
            <thead className="table-primary">
              <tr>
                <th>Doctor</th>
                <th>Treatment</th>
                <th>Package</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td>
                    Dr. {reservation.doctor_first_name} {reservation.doctor_last_name}
                  </td>
                  <td>{reservation.treatment}</td>
                  <td>
                    <Badge bg="info">{reservation.package_tier}</Badge>
                  </td>
                  <td>{formatDate(reservation.date)}</td>
                  <td>{formatTime(reservation.time)}</td>
                  <td>
                    <Badge bg="success">Scheduled</Badge>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        setReservationToCancel(reservation);
                        setShowCancelModal(true);
                      }}
                    >
                      Cancel
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Reservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {reservationToCancel && (
            <div>
              <p>Are you sure you want to cancel this reservation?</p>
              <div className="border p-3 rounded">
                <p><strong>Doctor:</strong> Dr. {reservationToCancel.doctor_first_name} {reservationToCancel.doctor_last_name}</p>
                <p><strong>Treatment:</strong> {reservationToCancel.treatment}</p>
                <p><strong>Date:</strong> {formatDate(reservationToCancel.date)}</p>
                <p><strong>Time:</strong> {formatTime(reservationToCancel.time)}</p>
              </div>
              <p className="text-danger mt-3">This action cannot be undone.</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={handleCancelReservation}
            disabled={cancelling}
          >
            {cancelling ? "Cancelling..." : "Cancel Reservation"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Alert Message */}
      {message && (
        <Alert
          variant={messageType}
          className="mt-3"
          dismissible
          onClose={() => setMessage("")}
        >
          {message}
        </Alert>
      )}
    </Container>
  );
};

export default Profile;
