import React, { useState, useContext } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../context/languageContext";
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("danger");

  const navigate = useNavigate();
  const redirectPath = "/home";
  const { language } = useContext(LanguageContext);

  const t = {
    en: {
      login: "Login",
      email: "Email",
      password: "Password",
      enterEmail: "Enter your email",
      enterPassword: "Enter your password",
      logIn: "Log In",
      forgotPassword: "Forgot Password?",
      noAccount: "Don't have an account?",
      signUp: "Sign Up",
      emailPasswordEmpty: "Email and password cannot be empty!",
      loginSuccessful: "Login Successful!",
      loginFailed: "Login failed",
      somethingWrong: "Something went wrong!",
    },
    fa: {
      login: "ورود",
      email: "ایمیل",
      password: "رمز عبور",
      enterEmail: "ایمیل خود را وارد کنید",
      enterPassword: "رمز عبور خود را وارد کنید",
      logIn: "ورود",
      forgotPassword: "رمز عبور را فراموش کرده‌اید؟",
      noAccount: "حساب کاربری ندارید؟",
      signUp: "ثبت نام",
      emailPasswordEmpty: "ایمیل و رمز عبور نمی‌توانند خالی باشند!",
      loginSuccessful: "ورود موفق!",
      loginFailed: "ورود ناموفق",
      somethingWrong: "مشکلی پیش آمده!",
    },
  }[language];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email || !password) {
      setMessage(t.emailPasswordEmpty);
      setMessageColor("danger");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        setMessage(t.loginSuccessful);
        setMessageColor("success");

        setTimeout(() => {
          setMessage("");
          navigate(redirectPath, { replace: true });
        }, 2000);
      } else {
        setMessage(data.message || t.loginFailed);
        setMessageColor("danger");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(t.somethingWrong);
      setMessageColor("danger");
    }
  };

  return (
    <Container className="login-container d-flex justify-content-center align-items-center">
      <div className="login-box shadow-lg p-4">
        <h2 className="text-center text-primary fw-bold">{t.login}</h2>
        {message && <Alert variant={messageColor}>{message}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label><FaUser className="me-2" /> {t.email}</Form.Label>
            <Form.Control
              type="email"
              placeholder={t.enterEmail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><FaLock className="me-2" /> {t.password}</Form.Label>
            <Form.Control
              type="password"
              placeholder={t.enterPassword}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            {t.logIn}
          </Button>

          <div className="text-center mt-3">
            <a href="#" className="text-primary">{t.forgotPassword}</a>
          </div>

          <div className="text-center mt-2">
            <span>{t.noAccount} </span>
            <a href="/signup" className="text-primary">{t.signUp}</a>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
