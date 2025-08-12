import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import {
  FaWhatsapp,
  FaInstagram,
  FaStethoscope,
  FaUserCircle,
  FaTelegram,
  FaHeartbeat,
  FaTooth,
  FaEye,
  FaBone,
  FaBrain
} from "react-icons/fa";

const Header = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg"  sticky="top" className="shadow">
      <Container>
        {/* Logo / Brand */}
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 text-white d-flex align-items-center">
          <FaStethoscope className="me-2" />
          Medical Tourism
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-between">
          <Nav className="d-flex flex-row w-100 justify-content-center align-items-center">
            <Nav.Link as={Link} to="/home" className="text-white fw-medium mx-3">
              Home
            </Nav.Link>

            {/* Treatment Dropdown Linking to Detail Pages */}
            <Dropdown className="mx-3">
              <Dropdown.Toggle variant="outline-light" id="dropdown-treatment">
                Treatments
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/treatments/cardiology">
                  <FaHeartbeat className="me-2 text-danger" />
                  Cardiology
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/treatments/dental-care">
                  <FaTooth className="me-2 text-warning" />
                  Dental Care
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/treatments/eye-surgery">
                  <FaEye className="me-2 text-info" />
                  Eye Surgery
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/treatments/orthopedics">
                  <FaBone className="me-2 text-secondary" />
                  Orthopedics
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/treatments/neurology">
                  <FaBrain className="me-2 text-primary" />
                  Neurology
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Nav.Link as={Link} to="/reservation" className="text-white fw-medium mx-3">
              Reservation
            </Nav.Link>

            <Nav.Link as={Link} to="/blogs" className="text-white fw-medium mx-3">
              Blogs
            </Nav.Link>
          </Nav>

          {/* Social Media & Profile */}
          <Nav className="d-flex flex-row align-items-center">
            <Nav.Link href="https://wa.me/YOUR_WHATSAPP_NUMBER" target="_blank" className="text-white mx-2">
              <FaWhatsapp />
            </Nav.Link>
            <Nav.Link href="https://t.me/YOUR_TELEGRAM_USERNAME" target="_blank" className="text-white mx-2">
              <FaTelegram />
            </Nav.Link>
            <Nav.Link href="https://www.instagram.com/YOUR_INSTAGRAM_USERNAME" target="_blank" className="text-white mx-2">
              <FaInstagram />
            </Nav.Link>

            <Button as={Link} to="/profile" variant="light" className="ms-3 d-flex align-items-center">
              <FaUserCircle className="me-2" size={20} />
              Profile
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;