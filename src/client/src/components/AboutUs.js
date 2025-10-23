import React, { useContext } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaStethoscope, FaUsers, FaGlobe, FaAward } from 'react-icons/fa';
import { LanguageContext } from '../context/languageContext';

const AboutUs = () => {
  const { language } = useContext(LanguageContext);

  const t = {
    en: {
      title: "About Us",
      subtitle: "Your trusted partner in medical tourism, connecting you with world-class healthcare services worldwide.",
      missionTitle: "Our Mission",
      missionText: "At Medical Tourism, our mission is to make high-quality healthcare accessible to everyone, regardless of location. We bridge the gap between patients and top-tier medical facilities, ensuring safe, affordable, and effective treatments. Through our comprehensive services, we empower individuals to take control of their health journey.",
      visionTitle: "Our Vision",
      visionText: "We envision a world where geographical boundaries do not limit access to exceptional medical care. By leveraging global partnerships and cutting-edge technology, we strive to set new standards in medical tourism, fostering trust, innovation, and patient-centered excellence.",
      expertCare: "Expert Care",
      expertCareDesc: "Access to board-certified specialists and state-of-the-art facilities.",
      personalizedService: "Personalized Service",
      personalizedServiceDesc: "Tailored treatment plans and dedicated support throughout your journey.",
      globalNetwork: "Global Network",
      globalNetworkDesc: "Partnerships with leading hospitals and clinics across the world.",
      qualityAssurance: "Quality Assurance",
      qualityAssuranceDesc: "Commitment to the highest standards of safety and patient satisfaction.",
      whyChooseUs: "Why Choose Us?",
      whyChooseUsText1: "With years of experience in medical tourism, we have helped thousands of patients achieve their health goals. Our team of healthcare professionals and travel experts work tirelessly to ensure every aspect of your medical journey is seamless and stress-free.",
      whyChooseUsText2: "From initial consultation to post-treatment follow-up, we're with you every step of the way. Discover the difference that quality, compassion, and expertise can make in your healthcare experience."
    },
    fa: {
      title: "درباره ما",
      subtitle: "شریک قابل اعتماد شما در گردشگری پزشکی، که شما را به خدمات بهداشتی درجه یک جهانی متصل می‌کند.",
      missionTitle: "مأموریت ما",
      missionText: "در گردشگری پزشکی، مأموریت ما این است که مراقبت‌های بهداشتی با کیفیت بالا را برای همه، بدون توجه به مکان، قابل دسترسی کنیم. ما شکاف بین بیماران و امکانات پزشکی برتر را پر می‌کنیم و درمان‌های ایمن، مقرون به صرفه و مؤثر را تضمین می‌کنیم. از طریق خدمات جامع خود، افراد را توانمند می‌کنیم تا کنترل سفر سلامت خود را به دست گیرند.",
      visionTitle: "چشم‌انداز ما",
      visionText: "ما جهانی را تصور می‌کنیم که مرزهای جغرافیایی دسترسی به مراقبت پزشکی استثنایی را محدود نمی‌کنند. با استفاده از مشارکت‌های جهانی و فناوری پیشرفته، تلاش می‌کنیم تا استانداردهای جدیدی در گردشگری پزشکی ایجاد کنیم و اعتماد، نوآوری و برتری متمرکز بر بیمار را پرورش دهیم.",
      expertCare: "مراقبت تخصصی",
      expertCareDesc: "دسترسی به متخصصان دارای گواهینامه هیئت مدیره و امکانات پیشرفته.",
      personalizedService: "خدمات شخصی‌سازی شده",
      personalizedServiceDesc: "برنامه‌های درمانی سفارشی و پشتیبانی اختصاصی در طول سفر شما.",
      globalNetwork: "شبکه جهانی",
      globalNetworkDesc: "شریک‌سازی با بیمارستان‌ها و کلینیک‌های پیشرو در سراسر جهان.",
      qualityAssurance: "تضمین کیفیت",
      qualityAssuranceDesc: "تعهد به بالاترین استانداردهای ایمنی و رضایت بیمار.",
      whyChooseUs: "چرا ما را انتخاب کنید؟",
      whyChooseUsText1: "با سال‌ها تجربه در گردشگری پزشکی، به هزاران بیمار کمک کرده‌ایم تا اهداف سلامت خود را محقق کنند. تیم ما از متخصصان بهداشتی و کارشناسان سفر بی‌وقفه کار می‌کنند تا اطمینان حاصل کنند که هر جنبه از سفر پزشکی شما بی‌نقص و بدون استرس است.",
      whyChooseUsText2: "از مشاوره اولیه تا پیگیری پس از درمان، در هر مرحله همراه شما هستیم. تفاوت کیفیت، همدلی و تخصص را در تجربه مراقبت بهداشتی خود کشف کنید."
    }
  }[language];

  return (
    <Container className="mt-5 pt-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-primary">{t.title}</h1>
        <p className="lead text-muted">
          {t.subtitle}
        </p>
      </div>

      <Row className="mb-5">
        <Col md={6}>
          <h2 className="fw-bold text-success mb-3">{t.missionTitle}</h2>
          <p className="text-muted">
            {t.missionText}
          </p>
        </Col>
        <Col md={6}>
          <h2 className="fw-bold text-info mb-3">{t.visionTitle}</h2>
          <p className="text-muted">
            {t.visionText}
          </p>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={3} className="text-center mb-4">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <FaStethoscope size={50} className="text-primary mb-3" />
              <Card.Title className="fw-bold">{t.expertCare}</Card.Title>
              <Card.Text className="text-muted">
                {t.expertCareDesc}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="text-center mb-4">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <FaUsers size={50} className="text-success mb-3" />
              <Card.Title className="fw-bold">{t.personalizedService}</Card.Title>
              <Card.Text className="text-muted">
                {t.personalizedServiceDesc}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="text-center mb-4">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <FaGlobe size={50} className="text-info mb-3" />
              <Card.Title className="fw-bold">{t.globalNetwork}</Card.Title>
              <Card.Text className="text-muted">
                {t.globalNetworkDesc}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="text-center mb-4">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <FaAward size={50} className="text-warning mb-3" />
              <Card.Title className="fw-bold">{t.qualityAssurance}</Card.Title>
              <Card.Text className="text-muted">
                {t.qualityAssuranceDesc}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="text-center">
        <h2 className="fw-bold text-secondary mb-4">{t.whyChooseUs}</h2>
        <p className="text-muted mb-4">
          {t.whyChooseUsText1}
        </p>
        <p className="text-muted">
          {t.whyChooseUsText2}
        </p>
      </div>
    </Container>
  );
};

export default AboutUs;
