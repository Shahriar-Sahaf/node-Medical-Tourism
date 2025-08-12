import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap"; // استفاده از bootstrap
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa"; // استفاده از آیکون‌ها

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("danger");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const { firstName, lastName, email, password } = formData;

    if (!firstName || !lastName || !email || !password) {
      setMessage("All fields are required!");
      setMessageColor("danger");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setMessageColor("success");
        setFormData({ firstName: "", lastName: "", email: "", password: "" });
        setTimeout(() => {
          setMessage("");
          window.location.href = "/home"; // Change this to your actual dashboard route
        }, 2000);
      } else {
        setMessage(data.message);
        setMessageColor("danger");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong!");
      setMessageColor("danger");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "calc(100vh - 80px)", marginTop: "80px" }}>
      <div className="p-4 shadow rounded bg-white w-100" style={{ maxWidth: "450px" }}>
        <h2 className="text-center text-primary fw-bold mb-4">Sign Up</h2>

        {message && (
          <Alert variant={messageColor} className="text-center">
            {message}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label><FaUser className="me-2" />First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your first name"
              value={formData.firstName}
              name="firstName"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><FaUser className="me-2" />Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your last name"
              value={formData.lastName}
              name="lastName"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><FaEnvelope className="me-2" />Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              name="email"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label><FaLock className="me-2" />Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              name="password"
              onChange={handleChange}
            />
          </Form.Group>

          <Button type="submit" className="w-100" variant="primary">
            Sign Up
          </Button>
        </Form>

        <div className="text-center mt-3">
          <a href="/login" className="text-primary text-decoration-none">
            Already have an account? Log in
          </a>
        </div>
      </div>
    </Container>
  );
};

export default Signup;
