import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Form,
  DatePicker,
  TimePicker,
  message,
  Select,
  Button,
  Card,
  Typography,
  Spin,
} from "antd";
import dayjs from "dayjs";
import axios from "axios";
import { LanguageContext } from "../context/languageContext";

const { Option } = Select;
const { Title, Text } = Typography;

const Reservation = () => {
  // --- State and Hooks Setup ---
  const { language } = useContext(LanguageContext);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const t = {
    en: {
      confirmAppointment: "Confirm Your Appointment",
      patient: "Patient:",
      selectedTreatment: "Selected Treatment:",
      selectedPackage: "Selected Package:",
      selectDoctor: "Select Doctor",
      chooseSpecialist: "Choose a specialist",
      selectDate: "Select Date",
      selectTime: "Select Time",
      chooseTimeSlot: "Choose a time slot",
      bookNow: "Book Now",
      loginFirst: "Please log in and select a treatment first.",
      fetchDoctorsError: "Failed to fetch doctors.",
      reservationSuccess: "Reservation successful! You will be contacted shortly.",
      reservationFailed: "Reservation failed. Please try again.",
    },
    fa: {
      confirmAppointment: "تایید قرار ملاقات شما",
      patient: "بیمار:",
      selectedTreatment: "درمان انتخاب شده:",
      selectedPackage: "بسته انتخاب شده:",
      selectDoctor: "انتخاب دکتر",
      chooseSpecialist: "یک متخصص انتخاب کنید",
      selectDate: "انتخاب تاریخ",
      selectTime: "انتخاب زمان",
      chooseTimeSlot: "یک بازه زمانی انتخاب کنید",
      bookNow: "اکنون رزرو کنید",
      loginFirst: "لطفا ابتدا وارد شوید و درمان را انتخاب کنید.",
      fetchDoctorsError: "دریافت لیست پزشکان ناموفق بود.",
      reservationSuccess: "رزرو موفق! به زودی با شما تماس گرفته خواهد شد.",
      reservationFailed: "رزرو ناموفق. لطفا دوباره امتحان کنید.",
    },
  }[language];

  // Generate time slots from 8:00 to 20:00 with 30-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 20; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 20 && minute > 0) break; // Stop at 20:00
        const timeString = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // --- Retrieve Data from Previous Steps ---
  const { treatment, package: packageTier } = location.state || {};
  const user = JSON.parse(localStorage.getItem("user"));

  // --- Effects ---
 useEffect(() => {
  // اگر کاربر یا اطلاعات درمانی وجود نداشت، کاربر رو هدایت می‌کنیم
  if (!user || !treatment || !packageTier) {
    messageApi.error(t.loginFirst);
    navigate("/packages");
    return;
  }

  let isMounted = true; // برای جلوگیری از setState بعد از unmount

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/doctors");

      const treatmentToSpecialty = {
        Cardiology: "cardiology",
        "Dental Care": "Dentist",
        "Eye Surgery": "Ophthalmologist",
        Orthopedics: "Orthopedic Surgeon",
        Neurology: "Neurologist",
      };

      const specialty = treatmentToSpecialty[treatment];

      const filteredDoctors = specialty
        ? res.data.filter((doc) => doc.specialty === specialty)
        : res.data;

      if (isMounted) setDoctors(filteredDoctors);
    } catch (err) {
      if (isMounted) messageApi.error(t.fetchDoctorsError);
    } finally {
      if (isMounted) setPageLoading(false);
    }
  };

  fetchDoctors();

  return () => {
    isMounted = false;
  };


}, []);

  // --- Handlers ---
  const onFinish = async (values) => {
    setLoading(true);
    const selectedDoctor = doctors.find((doc) => doc.id === values.doctor);

    // This payload now contains all user and doctor details
    const payload = {
      userId: user.id,
      user_first_name: user.firstName,
      user_last_name: user.lastName,
      user_email: user.email,
      treatment: treatment,
      packageTier: packageTier,
      doctor_first_name: selectedDoctor.first_name,
      doctor_last_name: selectedDoctor.last_name,
      date: values.date.format("YYYY-MM-DD"),
      time: values.time,
    };

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3001/api/reservation", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      messageApi.success(t.reservationSuccess);
      form.resetFields();
      setTimeout(() => navigate("/profile"), 2000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        t.reservationFailed;
      messageApi.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: "50px", background: "#f0f2f5", minHeight: "100vh" }}>
      {contextHolder}
      <Card
        style={{ maxWidth: "600px", margin: "0 auto", borderRadius: "8px" }}
      >
        <Title level={2} style={{ textAlign: "center" }}>
          {t.confirmAppointment}
        </Title>
        <Card type="inner" style={{ marginBottom: 24 }}>
          <p>
            <Text strong>{t.patient}</Text> {user.firstName} {user.lastName} (
            {user.email})
          </p>
          <p>
            <Text strong>{t.selectedTreatment}</Text> {treatment}
          </p>
          <p>
            <Text strong>{t.selectedPackage}</Text> {packageTier}
          </p>
        </Card>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label={t.selectDoctor}
            name="doctor"
            rules={[{ required: true }]}
          >
            <Select placeholder={t.chooseSpecialist}>
              {doctors.map((doc) => (
                <Option key={doc.id} value={doc.id}>
                  {`${doc.first_name} ${doc.last_name} — ${doc.specialty}`}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label={t.selectDate}
            name="date"
            rules={[{ required: true }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              disabledDate={(current) => {
                // Disable dates before today and after 7 days from today
                const today = dayjs().startOf('day');
                const maxDate = dayjs().add(7, 'day').endOf('day');
                return current && (current < today || current > maxDate);
              }}
            />
          </Form.Item>
          <Form.Item
            label={t.selectTime}
            name="time"
            rules={[{ required: true }]}
          >
            <Select placeholder={t.chooseTimeSlot}>
              {timeSlots.map((slot) => (
                <Option key={slot} value={slot}>
                  {slot}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
            >
              {t.bookNow}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Reservation;
