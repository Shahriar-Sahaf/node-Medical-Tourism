import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaFacebook, FaInstagram, FaPhone, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-4 mt-5">
      <Container>
        <Row className="gy-4">
          <Col md={4}>
            <h5 className="fw-bold">About Us</h5>
            <p className="small">
              We specialize in providing the best medical tourism services, connecting patients with world-class treatments.
            </p>
          </Col>

        
          <Col md={4}>
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/blogs" className="text-white text-decoration-none">Blogs</Link>
              </li>
              <li>
                <Link to="/" className="text-white text-decoration-none">Treatment</Link>
              </li>
              <li>
                <Link to="/about" className="text-white text-decoration-none">About Us</Link>
              </li>
            </ul>
          </Col>

        
          <Col md={4}>
            <h5 className="fw-bold">Contact Us</h5>
            <p className="small">
              <FaPhone className="me-2" /> 09338313346
            </p>
            <p className="small">
              <FaEnvelope className="me-2" /> shahriarsahaf@gmail.com
            </p>

          
            <div className="d-flex mt-3">
              <a href="https://wa.me/123456789" target="_blank" className="text-white me-3 fs-5">
                <FaWhatsapp />
              </a>
              <a href="https://www.facebook.com" target="_blank" className="text-white me-3 fs-5">
                <FaFacebook />
              </a>
              <a href="https://www.instagram.com" target="_blank" className="text-white fs-5">
                <FaInstagram />
              </a>
            </div>
          </Col>
        </Row>

        <hr className="mt-4 border-light" />
        <p className="text-center small mb-0">
          © {new Date().getFullYear()} Design By Shahriar Sahaf. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
