import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("danger");

  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = new URLSearchParams(location.search).get("redirect") || "/home";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email || !password) {
      setMessage("Email and password cannot be empty!");
      setMessageColor("danger");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setMessage("Login Successful!");
        setMessageColor("success");

        setTimeout(() => {
          setMessage("");
          navigate(redirectPath, { replace: true });
        }, 2000);
      } else {
        setMessage(data.message || "Login failed");
        setMessageColor("danger");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong!");
      setMessageColor("danger");
    }
  };

  return (
    <Container className="login-container d-flex justify-content-center align-items-center">
      <div className="login-box shadow-lg p-4">
        <h2 className="text-center text-primary fw-bold">Login</h2>
        {message && <Alert variant={messageColor}>{message}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label><FaUser className="me-2" /> Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><FaLock className="me-2" /> Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Log In
          </Button>

          <div className="text-center mt-3">
            <a href="#" className="text-primary">Forgot Password?</a>
          </div>

          <div className="text-center mt-2">
            <span>Don't have an account? </span>
            <a href="/signup" className="text-primary">Sign Up</a>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
