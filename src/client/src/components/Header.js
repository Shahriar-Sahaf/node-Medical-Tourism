import React, { useContext } from "react";
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
import  {LanguageContext} from "../context/languageContext";

const Header = () => {
  const { language, toggleLanguage } = useContext(LanguageContext);

  const t = {
    en: {
      home: "Home",
      treatments: "Treatments",
      about: "About Us",
      blogs: "Blogs",
      profile: "Profile",
      cardiology: "Cardiology",
      dental: "Dental Care",
      eye: "Eye Surgery",
      ortho: "Orthopedics",
      neuro: "Neurology",
    },
    fa: {
      home: "خانه",
      treatments: "درمان‌ها",
      about: "درباره ما",
      blogs: "وبلاگ",
      profile: "پروفایل",
      cardiology: "قلب و عروق",
      dental: "دندان‌پزشکی",
      eye: "جراحی چشم",
      ortho: "ارتوپدی",
      neuro: "نورولوژی",
    },
  }[language];

  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top" className="shadow">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 text-white d-flex align-items-center">
          <FaStethoscope className="me-2" />
          Medical Tourism
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-between">
          <Nav className="d-flex flex-row w-100 justify-content-center align-items-center">
            <Nav.Link as={Link} to="/home" className="text-white fw-medium mx-3">
              {t.home}
            </Nav.Link>

            <Dropdown className="mx-3">
              <Dropdown.Toggle variant="outline-light" id="dropdown-treatment">
                {t.treatments}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/treatments/cardiology">
                  <FaHeartbeat className="me-2 text-danger" />
                  {t.cardiology}
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/treatments/dental-care">
                  <FaTooth className="me-2 text-warning" />
                  {t.dental}
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/treatments/eye-surgery">
                  <FaEye className="me-2 text-info" />
                  {t.eye}
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/treatments/orthopedics">
                  <FaBone className="me-2 text-secondary" />
                  {t.ortho}
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/treatments/neurology">
                  <FaBrain className="me-2 text-primary" />
                  {t.neuro}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Nav.Link as={Link} to="/about" className="text-white fw-medium mx-3">
              {t.about}
            </Nav.Link>

            <Nav.Link as={Link} to="/blogs" className="text-white fw-medium mx-3">
              {t.blogs}
            </Nav.Link>
          </Nav>

          <Nav className="d-flex flex-row align-items-center">
            <Nav.Link href="https://wa.me/09338313346" target="_blank" className="text-white mx-2">
              <FaWhatsapp />
            </Nav.Link>
            <Nav.Link href="https://t.me/iam-shahriar" target="_blank" className="text-white mx-2">
              <FaTelegram />
            </Nav.Link>
            <Nav.Link href="https://www.instagram.com/iam_shahriar" target="_blank" className="text-white mx-2">
              <FaInstagram />
            </Nav.Link>

            <Button as={Link} to="/profile" variant="light" className="ms-3 d-flex align-items-center">
              <FaUserCircle className="me-2" size={20} />
              {t.profile}
            </Button>

            {/* 👇 دکمه تغییر زبان */}
            <Button
              variant="outline-light"
              className="ms-3"
              onClick={toggleLanguage}
            >
              {language === "en" ? "FA" : "EN"}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
