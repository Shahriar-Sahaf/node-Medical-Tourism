import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaFacebook, FaInstagram, FaPhone, FaEnvelope } from "react-icons/fa";
import { LanguageContext } from "../context/languageContext";

const Footer = () => {
  const { language } = useContext(LanguageContext);

  const t = {
    en: {
      aboutUs: "About Us",
      aboutText: "We specialize in providing the best medical tourism services, connecting patients with world-class treatments.",
      quickLinks: "Quick Links",
      blogs: "Blogs",
      treatment: "Treatment",
      contactUs: "Contact Us",
      copyright: "© {year} Design By Shahriar Sahaf. All rights reserved.",
    },
    fa: {
      aboutUs: "درباره ما",
      aboutText: "ما متخصص ارائه بهترین خدمات گردشگری پزشکی هستیم و بیماران را به درمان‌های جهانی متصل می‌کنیم.",
      quickLinks: "پیوندهای سریع",
      blogs: "بلاگ‌ها",
      treatment: "درمان",
      contactUs: "تماس با ما",
      copyright: "© {year} طراحی توسط شهریار صحاف. تمامی حقوق محفوظ است.",
    },
  }[language];

  return (
    <footer className="bg-primary text-white py-4 mt-5">
      <Container>
        <Row className="gy-4">
          <Col md={4}>
            <h5 className="fw-bold">{t.aboutUs}</h5>
            <p className="small">
              {t.aboutText}
            </p>
          </Col>


          <Col md={4}>
            <h5 className="fw-bold">{t.quickLinks}</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/blogs" className="text-white text-decoration-none">{t.blogs}</Link>
              </li>
              <li>
                <Link to="/" className="text-white text-decoration-none">{t.treatment}</Link>
              </li>
              <li>
                <Link to="/about" className="text-white text-decoration-none">{t.aboutUs}</Link>
              </li>
            </ul>
          </Col>


          <Col md={4}>
            <h5 className="fw-bold">{t.contactUs}</h5>
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
          {t.copyright.replace("{year}", new Date().getFullYear())}
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
