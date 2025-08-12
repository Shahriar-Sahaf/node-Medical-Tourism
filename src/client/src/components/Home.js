import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaHeartbeat, FaTooth, FaEye, FaBone, FaBrain, FaStethoscope, FaUserMd, FaPlaneDeparture, FaPlusCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Home.css'; // We will create this new CSS file

const Home = () => {
  const navigate = useNavigate();

  const medicalServices = [
    { name: "Cardiology", slug: "cardiology", icon: <FaHeartbeat size={40} />, description: "Expert heart care and surgery." },
    { name: "Dental Care", slug: "dental-care", icon: <FaTooth size={40} />, description: "Advanced cosmetic and restorative dentistry." },
    { name: "Eye Surgery", slug: "eye-surgery", icon: <FaEye size={40} />, description: "LASIK, cataract, and vision correction." },
    { name: "Orthopedics", slug: "orthopedics", icon: <FaBone size={40} />, description: "Joint replacement and bone health." },
    { name: "Neurology", slug: "neurology", icon: <FaBrain size={40} />, description: "Nervous system and brain treatments." },
    { name: "General Surgery", slug: "general-surgery", icon: <FaStethoscope size={40} />, description: "A wide range of surgical procedures." },
  ];

  const doctors = [
    { id: 1, name: "Dr. John Smith", specialty: "Cardiologist", image: "https://via.placeholder.com/300x300.png?text=Dr.+Smith" },
    { id: 2, name: "Dr. Emily Johnson", specialty: "Neurologist", image: "https://via.placeholder.com/300x300.png?text=Dr.+Johnson" },
    { id: 3, name: "Dr. Michael Brown", specialty: "Orthopedic Surgeon", image: "https://via.placeholder.com/300x300.png?text=Dr.+Brown" },
  ];

  const testimonials = [
    { id: 1, name: "Sarah Williams, USA", feedback: "The quality of care I received was beyond my expectations. From the consultation to my recovery, everything was handled with utmost professionalism. I couldn't be happier with the results." },
    { id: 2, name: "James Anderson, UK", feedback: "Traveling for a medical procedure felt daunting, but this team made it seamless. The doctors are true experts, and the support staff handled all my travel and accommodation needs perfectly." },
    { id: 3, name: "Sophia Martinez, Canada", feedback: "An amazing experience! I received world-class treatment at a fraction of the cost back home. I highly recommend their services to anyone considering medical tourism." },
  ];

  return (
    <>
      {/* --- Hero Section --- */}
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <Container className="hero-content text-center text-white">
          <h1 className="display-4 fw-bold">World-Class Healthcare, Within Your Reach</h1>
          <p className="lead my-4">
            Access top-tier medical treatments from globally recognized specialists without the long wait times or high costs. Your journey to better health starts here.
          </p>
          <Button variant="primary" size="lg" onClick={() => navigate('/treatments/cardiology')}>
            Explore Treatments
          </Button>
        </Container>
      </div>
      

      {/* --- How It Works Section --- */}
      <Container className="py-5 text-center">
        <h2 className="fw-bold mb-2">Your Journey in 3 Simple Steps</h2>
        <p className="text-muted mb-5">We handle every detail so you can focus on your health.</p>
        <Row>
          <Col md={4} className="mb-4">
            <FaPlusCircle size={50} className="text-primary mb-3" />
            <h4 className="fw-bold">1. Free Consultation</h4>
            <p>Share your medical records with us for a no-cost evaluation and treatment plan from our top specialists.</p>
          </Col>
          <Col md={4} className="mb-4">
            <FaPlaneDeparture size={50} className="text-primary mb-3" />
            <h4 className="fw-bold">2. Plan Your Trip</h4>
            <p>We assist with all travel logistics, including visas, flights, and accommodation, ensuring a stress-free journey.</p>
          </Col>
          <Col md={4} className="mb-4">
            <FaUserMd size={50} className="text-primary mb-3" />
            <h4 className="fw-bold">3. Treatment & Recovery</h4>
            <p>Receive world-class medical care in our state-of-the-art facilities, followed by a comfortable recovery.</p>
          </Col>
        </Row>
      </Container>

      {/* --- Medical Services Section --- */}
      <Container fluid className="bg-light py-5">
        <Container>
          <h2 className="text-center mb-5 fw-bold text-primary">Our Medical Services</h2>
          <Row>
            {medicalServices.map((service) => (
              <Col key={service.name} md={4} sm={6} className="mb-4">
                <Card className="h-100 text-center shadow-sm border-0 service-card" onClick={() => navigate(`/treatments/${service.slug}`)}>
                  <Card.Body className="p-4">
                    <div className="mb-3 text-primary">{service.icon}</div>
                    <Card.Title className="fw-bold">{service.name}</Card.Title>
                    <Card.Text className="text-muted">{service.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
      
      {/* --- Meet The Team Section --- */}
      <Container className="py-5">
        <h2 className="text-center mb-5 fw-bold text-success">Our Expert Medical Team</h2>
        <Row>
          {doctors.map((doctor) => (
            <Col key={doctor.id} md={4} sm={6} className="mb-4">
              <Card className="text-center shadow-sm border-0 h-100">
                <Card.Img variant="top" src={doctor.image} className="doctor-img" />
                <Card.Body>
                  <Card.Title className="fw-bold">{doctor.name}</Card.Title>
                  <Card.Text className="text-muted">{doctor.specialty}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* --- Testimonials Section --- */}
      <Container fluid className="bg-light py-5">
        <Container>
          <h2 className="text-center mb-5 fw-bold text-info">What Our Patients Say</h2>
          <Row>
            {testimonials.map((testimonial) => (
              <Col md={4} key={testimonial.id} className="mb-4">
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="p-4">
                    <blockquote className="blockquote mb-0">
                      <p className="text-muted">"{testimonial.feedback}"</p>
                      <footer className="blockquote-footer mt-2 fw-bold">{testimonial.name}</footer>
                    </blockquote>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Home;