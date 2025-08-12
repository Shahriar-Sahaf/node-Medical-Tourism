import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, Card, Button, Container } from 'react-bootstrap';
// 1. Import all the treatment icons
import {
  FaCheckCircle,
  FaTimesCircle,
  FaHeartbeat,
  FaTooth,
  FaEye,
  FaBone,
  FaBrain,
} from 'react-icons/fa';
import { packages, options } from './packages';

// 2. Create an object to hold details for each treatment
const treatmentDetails = {
  Cardiology: {
    description: 'Expert cardiac care including diagnostics, treatment, and preventative strategies to ensure your heart health.',
    Icon: FaHeartbeat,
    color: 'text-danger',
  },
  'Dental Care': {
    description: 'Comprehensive dental services from routine check-ups to advanced cosmetic and restorative procedures.',
    Icon: FaTooth,
    color: 'text-warning',
  },
  'Eye Surgery': {
    description: 'State-of-the-art ophthalmic services, including LASIK, cataract surgery, and treatments for eye diseases.',
    Icon: FaEye,
    color: 'text-info',
  },
  Orthopedics: {
    description: 'Specialized care for musculoskeletal issues, including joint replacement, sports injuries, and spine surgery.',
    Icon: FaBone,
    color: 'text-secondary',
  },
  Neurology: {
    description: 'Advanced diagnosis and treatment for disorders of the nervous system, brain, and spinal cord.',
    Icon: FaBrain,
    color: 'text-primary',
  },
  Unknown: {
    description: 'Please select a treatment to see available packages.',
    Icon: () => null, // No icon for the default case
    color: 'text-dark',
  },
};

const PackageSection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const treatment = location.state?.treatment || 'Unknown';
  // 3. Get the specific details for the selected treatment
  const details = treatmentDetails[treatment];
  const IconComponent = details.Icon;

  const handleChoose = (tier) => {
    navigate('/reservation', {
      state: {
        treatment,
        package: tier,
      },
    });
  };

  return (
    // Use a Container for better layout
    <Container className="mt-5 pt-5">
      {/* 4. Display the dynamic title, icon, and description */}
      <div className="text-center mb-5">
        <h2 className={`fw-bold d-inline-flex align-items-center ${details.color}`}>
          <IconComponent className="me-3" size={40} />
          {treatment}
        </h2>
        <p className="lead text-muted mt-2">{details.description}</p>
      </div>

      <section className="mb-5">
        <h3 className="text-success mb-4 text-center">Choose Your Package</h3>
        <Row>
          {Object.entries(packages).map(([tier, included]) => (
            <Col md={4} key={tier}>
              <Card className="shadow border-0 mb-4 h-100">
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold text-center">{tier} Package</Card.Title>
                  <ul className="list-unstyled mt-3 mb-4">
                    {options.map((item) => (
                      <li key={item} className="d-flex align-items-center mb-2">
                        {included.includes(item) ? (
                          <FaCheckCircle className="text-success me-2" />
                        ) : (
                          <FaTimesCircle className="text-muted me-2" />
                        )}
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="primary"
                    className="w-100 mt-auto" // Pushes button to the bottom
                    onClick={() => handleChoose(tier)}
                    disabled={treatment === 'Unknown'} // Disable button if no treatment is selected
                  >
                    Choose {tier}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  );
};

export default PackageSection;