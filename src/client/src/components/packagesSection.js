import React, { useContext } from 'react';
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
import { LanguageContext } from '../context/languageContext';

// 2. Create an object to hold details for each treatment
const treatmentDetails = {
  Cardiology: {
    description: {
      en: 'Expert cardiac care including diagnostics, treatment, and preventative strategies to ensure your heart health.',
      fa: 'مراقبت تخصصی قلب شامل تشخیص، درمان و استراتژی‌های پیشگیری برای اطمینان از سلامت قلب شما.',
    },
    Icon: FaHeartbeat,
    color: 'text-danger',
  },
  'Dental Care': {
    description: {
      en: 'Comprehensive dental services from routine check-ups to advanced cosmetic and restorative procedures.',
      fa: 'خدمات دندان‌پزشکی جامع از معاینات روتین تا روش‌های پیشرفته زیبایی و ترمیمی.',
    },
    Icon: FaTooth,
    color: 'text-warning',
  },
  'Eye Surgery': {
    description: {
      en: 'State-of-the-art ophthalmic services, including LASIK, cataract surgery, and treatments for eye diseases.',
      fa: 'خدمات چشم‌پزشکی پیشرفته، شامل جراحی لیزیک، آب مروارید و درمان بیماری‌های چشم.',
    },
    Icon: FaEye,
    color: 'text-info',
  },
  Orthopedics: {
    description: {
      en: 'Specialized care for musculoskeletal issues, including joint replacement, sports injuries, and spine surgery.',
      fa: 'مراقبت تخصصی برای مشکلات اسکلتی-عضلانی، شامل تعویض مفصل، آسیب‌های ورزشی و جراحی ستون فقرات.',
    },
    Icon: FaBone,
    color: 'text-secondary',
  },
  Neurology: {
    description: {
      en: 'Advanced diagnosis and treatment for disorders of the nervous system, brain, and spinal cord.',
      fa: 'تشخیص و درمان پیشرفته برای اختلالات سیستم عصبی، مغز و نخاع.',
    },
    Icon: FaBrain,
    color: 'text-primary',
  },
  Unknown: {
    description: {
      en: 'Please select a treatment to see available packages.',
      fa: 'لطفا درمانی را انتخاب کنید تا بسته‌های موجود را ببینید.',
    },
    Icon: () => null, // No icon for the default case
    color: 'text-dark',
  },
};

const PackageSection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useContext(LanguageContext);

  const treatment = location.state?.treatment || 'Unknown';
  // 3. Get the specific details for the selected treatment
  const details = treatmentDetails[treatment] || treatmentDetails['Unknown'];
  const IconComponent = details.Icon;

  const t = {
    en: {
      choosePackage: "Choose Your Package",
      choose: "Choose",
    },
    fa: {
      choosePackage: "بسته خود را انتخاب کنید",
      choose: "انتخاب کنید",
    },
  }[language];

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
        <p className="lead text-muted mt-2">{details.description[language]}</p>
      </div>

      <section className="mb-5">
        <h3 className="text-success mb-4 text-center">{t.choosePackage}</h3>
        <Row>
          {Object.entries(packages).map(([tier, included]) => (
            <Col md={4} key={tier}>
              <Card className="shadow border-0 mb-4 h-100">
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold text-center">{tier} Package</Card.Title>
                  <ul className="list-unstyled mt-3 mb-4">
                    {Object.entries(options[language]).map(([key, item]) => (
                      <li key={key} className="d-flex align-items-center mb-2">
                        {included.includes(key) ? (
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
                    {t.choose} {tier}
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