// src/pages/TreatmentPage.js

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Card } from 'react-bootstrap';
import { FaHeartbeat, FaTooth, FaEye, FaBone, FaBrain } from 'react-icons/fa';

// The "database" of your treatment content - now complete
const treatmentsData = {
  cardiology: {
    name: 'Cardiology',
    Icon: FaHeartbeat,
    color: 'text-danger',
    description: 'Our world-class cardiology department offers comprehensive care for heart-related conditions. We utilize the latest technology for diagnosis and treatment, ensuring the best possible outcomes for our patients.',
    procedures: ['Angioplasty', 'Bypass Surgery', 'Echocardiogram', 'Heart Valve Repair'],
  },
  'dental-care': {
    name: 'Dental Care',
    Icon: FaTooth,
    color: 'text-warning',
    description: 'Achieve a perfect smile with our extensive dental services. From cosmetic dentistry to complex implants and root canals, our specialists are here to help.',
    gallery: [
      'https://via.placeholder.com/600x400.png?text=Bright+Dental+Office',
      'https://via.placeholder.com/600x400.png?text=Advanced+X-Ray+Machine',
      'https://via.placeholder.com/600x400.png?text=Comfortable+Patient+Chair',
    ],
    procedures: ['Dental Implants', 'Veneers & Crowns', 'Teeth Whitening', 'Root Canal Therapy'],
  },
  // ✅ ADDED: The missing entry for Eye Surgery
  'eye-surgery': {
    name: 'Eye Surgery',
    Icon: FaEye,
    color: 'text-info',
    description: 'State-of-the-art ophthalmic services, including LASIK, cataract surgery, and treatments for various eye diseases to restore and preserve your vision.',
    gallery: [
      'https://via.placeholder.com/600x400.png?text=Ophthalmology+Center',
      'https://via.placeholder.com/600x400.png?text=Laser+Vision+Correction',
      'https://via.placeholder.com/600x400.png?text=Patient+Consultation',
    ],
    procedures: ['LASIK & PRK', 'Cataract Removal', 'Glaucoma Treatment', 'Retinal Surgery'],
  },
  // ✅ ADDED: The missing entry for Orthopedics
  orthopedics: {
    name: 'Orthopedics',
    Icon: FaBone,
    color: 'text-secondary',
    description: 'Specialized care for musculoskeletal issues, including joint replacement, sports injuries, and spine surgery to improve mobility and quality of life.',
    gallery: [
      'https://via.placeholder.com/600x400.png?text=Orthopedic+Ward',
      'https://via.placeholder.com/600x400.png?text=Physical+Therapy+Gym',
      'https://via.placeholder.com/600x400.png?text=Surgical+Theater',
    ],
    procedures: ['Knee & Hip Replacement', 'Arthroscopic Surgery', 'Spinal Fusion', 'Fracture Care'],
  },
  // ✅ ADDED: The missing entry for Neurology
  neurology: {
    name: 'Neurology',
    Icon: FaBrain,
    color: 'text-primary',
    description: 'Advanced diagnosis and treatment for disorders of the nervous system, brain, and spinal cord by our team of expert neurologists and neurosurgeons.',
    gallery: [
      'https://via.placeholder.com/600x400.png?text=Neurology+Department',
      'https://via.placeholder.com/600x400.png?text=MRI+Scanner',
      'https://via.placeholder.com/600x400.png?text=Research+Lab',
    ],
    procedures: ['Epilepsy Treatment', 'Stroke Care', 'Brain Tumor Surgery', 'Movement Disorder Therapy'],
  },
};

const TreatmentPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const treatment = treatmentsData[slug];

  const handleSelectTreatment = () => {
    navigate('/packages', {
      state: {
        treatment: treatment.name,
      },
    });
  };

  if (!treatment) {
    return (
      <Container className="text-center mt-5 pt-5">
        <h2>Treatment Not Found</h2>
        <p>The treatment you are looking for does not exist.</p>
        <Button onClick={() => navigate('/home')}>Go to Homepage</Button>
      </Container>
    );
  }

  const IconComponent = treatment.Icon;

  return (
    <Container className="mt-5 pt-5">
      <Row className="align-items-center text-center text-md-start">
        <Col md={8}>
          <h1 className={`fw-bold d-inline-flex align-items-center ${treatment.color}`}>
            <IconComponent className="me-3" size={50} />
            {treatment.name}
          </h1>
          <p className="lead text-muted">{treatment.description}</p>
        </Col>
        <Col md={4} className="text-center">
          <Button size="lg" variant="primary" onClick={handleSelectTreatment}>
            Select Treatment & View Packages
          </Button>
        </Col>
      </Row>

      <hr className="my-5" />

      <h3 className="text-center mb-4">Gallery</h3>
      <Row>
        
      </Row>

      <hr className="my-5" />

      <h3 className="text-center mb-4">Common Procedures</h3>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <ul className="list-unstyled">
                {treatment.procedures.map((proc, index) => (
                  <li key={index} className="mb-2 fs-5">✓ {proc}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TreatmentPage;