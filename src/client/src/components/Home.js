import React, { useContext } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaHeartbeat, FaTooth, FaEye, FaBone, FaBrain, FaStethoscope, FaUserMd, FaPlaneDeparture, FaPlusCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Home.css';
import { LanguageContext } from '../context/languageContext';
import doctor1 from '../images/bruno-rodrigues-279xIHymPYY-unsplash.jpg'
import doctor2 from '../images/humberto-chavez-FVh_yqLR9eA-unsplash.jpg'
import doctor3 from '../images/usman-yousaf-pTrhfmj2jDA-unsplash.jpg'

const Home = () => {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);

  const t = {
    en: {
      heroTitle: "World-Class Healthcare, Within Your Reach",
      heroSubtitle: "Access top-tier medical treatments from globally recognized specialists without the long wait times or high costs. Your journey to better health starts here.",
      exploreButton: "Explore Treatments",
      journeyTitle: "Your Journey in 3 Simple Steps",
      journeySubtitle: "We handle every detail so you can focus on your health.",
      step1Title: "1. Free Consultation",
      step1Desc: "Share your medical records with us for a no-cost evaluation and treatment plan from our top specialists.",
      step2Title: "2. Plan Your Trip",
      step2Desc: "We assist with all travel logistics, including visas, flights, and accommodation, ensuring a stress-free journey.",
      step3Title: "3. Treatment & Recovery",
      step3Desc: "Receive world-class medical care in our state-of-the-art facilities, followed by a comfortable recovery.",
      servicesTitle: "Our Medical Services",
      teamTitle: "Our Expert Medical Team",
      testimonialsTitle: "What Our Patients Say",
      cardiology: "Cardiology",
      dental: "Dental Care",
      eye: "Eye Surgery",
      ortho: "Orthopedics",
      neuro: "Neurology",
      general: "General Surgery",
      cardiologyDesc: "Expert heart care and surgery.",
      dentalDesc: "Advanced cosmetic and restorative dentistry.",
      eyeDesc: "LASIK, cataract, and vision correction.",
      orthoDesc: "Joint replacement and bone health.",
      neuroDesc: "Nervous system and brain treatments.",
      generalDesc: "A wide range of surgical procedures.",
      cardiologist: "Cardiologist",
      neurologist: "Neurologist",
      orthopedic: "Orthopedic Surgeon",
      testimonial1: "The quality of care I received was beyond my expectations. From the consultation to my recovery, everything was handled with utmost professionalism. I couldn't be happier with the results.",
      testimonial2: "Traveling for a medical procedure felt daunting, but this team made it seamless. The doctors are true experts, and the support staff handled all my travel and accommodation needs perfectly.",
      testimonial3: "An amazing experience! I received world-class treatment at a fraction of the cost back home. I highly recommend their services to anyone considering medical tourism.",
    },
    fa: {
      heroTitle: "مراقبت‌های بهداشتی درجه یک، در دسترس شما",
      heroSubtitle: "دسترسی به درمان‌های پزشکی برتر از متخصصان شناخته شده جهانی بدون زمان انتظار طولانی یا هزینه‌های بالا. سفر شما به سوی سلامتی بهتر از اینجا شروع می‌شود.",
      exploreButton: "کاوش درمان‌ها",
      journeyTitle: "سفر شما در ۳ مرحله ساده",
      journeySubtitle: "ما هر جزئیاتی را مدیریت می‌کنیم تا شما روی سلامتی خود تمرکز کنید.",
      step1Title: "۱. مشاوره رایگان",
      step1Desc: "سوابق پزشکی خود را با ما به اشتراک بگذارید برای ارزیابی بدون هزینه و برنامه درمانی از متخصصان برتر ما.",
      step2Title: "۲. برنامه‌ریزی سفر",
      step2Desc: "ما در تمام امور مسافرتی کمک می‌کنیم، از جمله ویزا، پروازها و اقامت، برای اطمینان از سفری بدون استرس.",
      step3Title: "۳. درمان و بهبودی",
      step3Desc: "مراقبت پزشکی درجه یک را در امکانات پیشرفته ما دریافت کنید، به دنبال بهبودی راحت.",
      servicesTitle: "خدمات پزشکی ما",
      teamTitle: "تیم پزشکی متخصص ما",
      testimonialsTitle: "بیماران ما چه می‌گویند",
      cardiology: "قلب و عروق",
      dental: "دندان‌پزشکی",
      eye: "جراحی چشم",
      ortho: "ارتوپدی",
      neuro: "نورولوژی",
      general: "جراحی عمومی",
      cardiologyDesc: "مراقبت و جراحی قلب تخصصی.",
      dentalDesc: "دندان‌پزشکی زیبایی و ترمیمی پیشرفته.",
      eyeDesc: "جراحی لیزیک، آب مروارید و تصحیح بینایی.",
      orthoDesc: "تعویض مفصل و سلامت استخوان.",
      neuroDesc: "درمان‌های سیستم عصبی و مغز.",
      generalDesc: "طیف وسیعی از روش‌های جراحی.",
      cardiologist: "متخصص قلب",
      neurologist: "متخصص مغز و اعصاب",
      orthopedic: "جراح ارتوپدی",
      testimonial1: "کیفیت مراقبتی که دریافت کردم فراتر از انتظاراتم بود. از مشاوره تا بهبودی، همه چیز با حرفه‌ای‌ترین روش مدیریت شد. نمی‌توانم از نتایج خوشحال‌تر باشم.",
      testimonial2: "سفر برای یک روش پزشکی احساس ترسناکی داشت، اما این تیم آن را بی‌نقص کرد. پزشکان کارشناسان واقعی هستند، و کارکنان پشتیبانی تمام نیازهای مسافرتی و اقامتی من را به طور کامل مدیریت کردند.",
      testimonial3: "تجربه شگفت‌انگیزی! درمان درجه یک جهانی را با بخشی از هزینه در خانه دریافت کردم. خدمات آنها را به هر کسی که گردشگری پزشکی را در نظر دارد، بسیار توصیه می‌کنم.",
    },
  }[language];

  const medicalServices = [
    { name: t.cardiology, slug: "cardiology", icon: <FaHeartbeat size={40} />, description: t.cardiologyDesc },
    { name: t.dental, slug: "dental-care", icon: <FaTooth size={40} />, description: t.dentalDesc },
    { name: t.eye, slug: "eye-surgery", icon: <FaEye size={40} />, description: t.eyeDesc },
    { name: t.ortho, slug: "orthopedics", icon: <FaBone size={40} />, description: t.orthoDesc },
    { name: t.neuro, slug: "neurology", icon: <FaBrain size={40} />, description: t.neuroDesc },
    { name: t.general, slug: "general-surgery", icon: <FaStethoscope size={40} />, description: t.generalDesc },
  ];

  const doctors = [
    { id: 1, name: "Dr. John Smith", specialty: t.cardiologist, image: doctor1 },
    { id: 2, name: "Dr. Emily Johnson", specialty: t.neurologist, image: doctor2 },
    { id: 3, name: "Dr. Michael Brown", specialty: t.orthopedic, image: doctor3 }]

  const testimonials = [
    { id: 1, name: "Sarah Williams, USA", feedback: t.testimonial1 },
    { id: 2, name: "James Anderson, UK", feedback: t.testimonial2 },
    { id: 3, name: "Sophia Martinez, Canada", feedback: t.testimonial3 },
  ];

  return (
    <>
      {/* --- Hero Section --- */}
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <Container className="hero-content text-center text-white">
          <h1 className="display-4 fw-bold">{t.heroTitle}</h1>
          <p className="lead my-4">
            {t.heroSubtitle}
          </p>
          <Button variant="primary" size="lg" onClick={() => navigate('/treatments/cardiology')}>
            {t.exploreButton}
          </Button>
        </Container>
      </div>


      {/* --- How It Works Section --- */}
      <Container className="py-5 text-center">
        <h2 className="fw-bold mb-2">{t.journeyTitle}</h2>
        <p className="text-muted mb-5">{t.journeySubtitle}</p>
        <Row>
          <Col md={4} className="mb-4">
            <FaPlusCircle size={50} className="text-primary mb-3" />
            <h4 className="fw-bold">{t.step1Title}</h4>
            <p>{t.step1Desc}</p>
          </Col>
          <Col md={4} className="mb-4">
            <FaPlaneDeparture size={50} className="text-primary mb-3" />
            <h4 className="fw-bold">{t.step2Title}</h4>
            <p>{t.step2Desc}</p>
          </Col>
          <Col md={4} className="mb-4">
            <FaUserMd size={50} className="text-primary mb-3" />
            <h4 className="fw-bold">{t.step3Title}</h4>
            <p>{t.step3Desc}</p>
          </Col>
        </Row>
      </Container>

      {/* --- Medical Services Section --- */}
      <Container fluid className="bg-light py-5">
        <Container>
          <h2 className="text-center mb-5 fw-bold text-primary">{t.servicesTitle}</h2>
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
        <h2 className="text-center mb-5 fw-bold text-success">{t.teamTitle}</h2>
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
          <h2 className="text-center mb-5 fw-bold text-info">{t.testimonialsTitle}</h2>
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