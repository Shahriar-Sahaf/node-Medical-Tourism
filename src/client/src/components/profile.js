import React from "react";
import { Container, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");

  let user = null;
  try {
    if (storedUser && storedUser !== "undefined") {
      user = JSON.parse(storedUser);
    }
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
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
      <Card className="text-center shadow-lg border-0 rounded-4 mx-auto p-3" style={{ maxWidth: "400px" }}>
        <Card.Body>
          <Card.Title className="fw-bold text-dark">
            {user.firstName} {user.lastName} {user.email.someProperty}
          </Card.Title>
          <Button variant="danger" className="mt-3" onClick={handleLogout}>
            Logout
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
