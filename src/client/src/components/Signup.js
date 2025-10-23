import React, { useState, useContext } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap"; // استفاده از bootstrap
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa"; // استفاده از آیکون‌ها
import { LanguageContext } from "../context/languageContext";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passport: ""
  });
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("danger");
  const { language } = useContext(LanguageContext);

  const t = {
    en: {
      signUp: "Sign Up",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      password: "Password",
      enterFirstName: "Enter your first name",
      enterLastName: "Enter your last name",
      enterEmail: "Enter your email",
      enterPassword: "Enter your password",
      enterPassport: "Enter your passport",
      signUpBtn: "Sign Up",
      alreadyHaveAccount: "Already have an account? Log in",
      allFieldsRequired: "All fields are required!",
      somethingWrong: "Something went wrong!",
    },
    fa: {
      signUp: "ثبت نام",
      firstName: "نام",
      lastName: "نام خانوادگی",
      email: "ایمیل",
      password: "رمز عبور",
      enterFirstName: "نام خود را وارد کنید",
      enterLastName: "نام خانوادگی خود را وارد کنید",
      enterEmail: "ایمیل خود را وارد کنید",
      enterPassword: "رمز عبور خود را وارد کنید",
      enterPassport: "شماره پاسپورت خود را اضافه کنید ",
      signUpBtn: "ثبت نام",
      alreadyHaveAccount: "قبلاً حساب کاربری دارید؟ وارد شوید",
      allFieldsRequired: "تمام فیلدها الزامی هستند!",
      somethingWrong: "مشکلی پیش آمده!",
    },
  }[language];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const { firstName, lastName, email, password , passport} = formData;

    if (!firstName || !lastName || !email || !password || !passport) {
      setMessage(t.allFieldsRequired);
      setMessageColor("danger");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setMessageColor("success");
        setFormData({ firstName: "", lastName: "", email: "", password: "" , passport: "" });
        localStorage.setItem("token", data.token);
        setTimeout(() => {
          setMessage("");
          window.location.href = "/home"; // Change this to your actual dashboard route
        }, 2000);
      } else {
        setMessage(data.message);
        setMessageColor("danger");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(t.somethingWrong);
      setMessageColor("danger");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "calc(100vh - 80px)", marginTop: "80px" }}>
      <div className="p-4 shadow rounded bg-white w-100" style={{ maxWidth: "450px" }}>
        <h2 className="text-center text-primary fw-bold mb-4">{t.signUp}</h2>

        {message && (
          <Alert variant={messageColor} className="text-center">
            {message}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label><FaUser className="me-2" />{t.firstName}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t.enterFirstName}
              value={formData.firstName}
              name="firstName"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><FaUser className="me-2" />{t.lastName}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t.enterLastName}
              value={formData.lastName}
              name="lastName"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><FaEnvelope className="me-2" />{t.email}</Form.Label>
            <Form.Control
              type="email"
              placeholder={t.enterEmail}
              value={formData.email}
              name="email"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label><FaLock className="me-2" />{t.password}</Form.Label>
            <Form.Control
              type="password"
              placeholder={t.enterPassword}
              value={formData.password}
              name="password"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label><FaLock className="me-2" />{t.passport}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t.enterPassport}
              value={formData.passport}
              name="passport"
              onChange={handleChange}
            />
          </Form.Group>


          <Button type="submit" className="w-100" variant="primary">
            {t.signUpBtn}
          </Button>
        </Form>

        <div className="text-center mt-3">
          <a href="/login" className="text-primary text-decoration-none">
            {t.alreadyHaveAccount}
          </a>
        </div>
      </div>
    </Container>
  );
};

export default Signup;
