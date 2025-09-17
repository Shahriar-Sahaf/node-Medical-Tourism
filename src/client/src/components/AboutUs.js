import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaStethoscope, FaUsers, FaGlobe, FaAward } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <Container className="mt-5 pt-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-primary">About Us</h1>
        <p className="lead text-muted">
          Your trusted partner in medical tourism, connecting you with world-class healthcare services worldwide.
        </p>
      </div>

      <Row className="mb-5">
        <Col md={6}>
          <h2 className="fw-bold text-success mb-3">Our Mission</h2>
          <p className="text-muted">
            At Medical Tourism, our mission is to make high-quality healthcare accessible to everyone, regardless of location.
            We bridge the gap between patients and top-tier medical facilities, ensuring safe, affordable, and effective treatments.
            Through our comprehensive services, we empower individuals to take control of their health journey.
          </p>
        </Col>
        <Col md={6}>
          <h2 className="fw-bold text-info mb-3">Our Vision</h2>
          <p className="text-muted">
            We envision a world where geographical boundaries do not limit access to exceptional medical care.
            By leveraging global partnerships and cutting-edge technology, we strive to set new standards in medical tourism,
            fostering trust, innovation, and patient-centered excellence.
          </p>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={3} className="text-center mb-4">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <FaStethoscope size={50} className="text-primary mb-3" />
              <Card.Title className="fw-bold">Expert Care</Card.Title>
              <Card.Text className="text-muted">
                Access to board-certified specialists and state-of-the-art facilities.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="text-center mb-4">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <FaUsers size={50} className="text-success mb-3" />
              <Card.Title className="fw-bold">Personalized Service</Card.Title>
              <Card.Text className="text-muted">
                Tailored treatment plans and dedicated support throughout your journey.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="text-center mb-4">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <FaGlobe size={50} className="text-info mb-3" />
              <Card.Title className="fw-bold">Global Network</Card.Title>
              <Card.Text className="text-muted">
                Partnerships with leading hospitals and clinics across the world.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="text-center mb-4">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <FaAward size={50} className="text-warning mb-3" />
              <Card.Title className="fw-bold">Quality Assurance</Card.Title>
              <Card.Text className="text-muted">
                Commitment to the highest standards of safety and patient satisfaction.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="text-center">
        <h2 className="fw-bold text-secondary mb-4">Why Choose Us?</h2>
        <p className="text-muted mb-4">
          With years of experience in medical tourism, we have helped thousands of patients achieve their health goals.
          Our team of healthcare professionals and travel experts work tirelessly to ensure every aspect of your medical journey is seamless and stress-free.
        </p>
        <p className="text-muted">
          From initial consultation to post-treatment follow-up, we're with you every step of the way.
          Discover the difference that quality, compassion, and expertise can make in your healthcare experience.
        </p>
      </div>
    </Container>
  );
};

export default AboutUs;
