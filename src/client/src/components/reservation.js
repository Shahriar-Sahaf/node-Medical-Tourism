import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, DatePicker, TimePicker, message, Select, Button, Card, Typography, Spin } from "antd";
import axios from "axios";

const { Option } = Select;
const { Title, Text } = Typography;

const Reservation = () => {
    // --- State and Hooks Setup ---
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const location = useLocation();
    const navigate = useNavigate();

    // --- Retrieve Data from Previous Steps ---
    const { treatment, package: packageTier } = location.state || {};
    const user = JSON.parse(localStorage.getItem("user"));

    // --- Effects ---
    useEffect(() => {
        // Redirect if essential data is missing
        if (!user || !treatment || !packageTier) {
            messageApi.error("Please log in and select a treatment first.");
            navigate("/packages"); // Redirect to the package selection page
            return;
        }

        const fetchDoctors = async () => {
            try {
                const res = await axios.get("http://localhost:3001/api/doctors");
                // Filter doctors based on treatment
                const treatmentToSpecialty = {
                    "Cardiology": "Cardiologist",
                    "Dental Care": "Dentist",
                    "Eye Surgery": "Ophthalmologist",
                    "Orthopedics": "Orthopedic Surgeon",
                    "Neurology": "Neurologist",
                };
                const specialty = treatmentToSpecialty[treatment];
                const filteredDoctors = specialty ? res.data.filter(doc => doc.specialty === specialty) : res.data;
                setDoctors(filteredDoctors);
            } catch (err) {
                messageApi.error("Failed to fetch doctors.");
            } finally {
                setPageLoading(false);
            }
        };

        fetchDoctors();
    }, [user, treatment, packageTier, navigate, messageApi]);

    // --- Handlers ---
    const onFinish = async (values) => {
        setLoading(true);
        const selectedDoctor = doctors.find(doc => doc.id === values.doctor);

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
            time: values.time.format("HH:mm"),
        };

        try {
            await axios.post("http://localhost:3001/api/reservation", payload);
            messageApi.success("Reservation successful! You will be contacted shortly.");
            form.resetFields();
            setTimeout(() => navigate('/profile'), 2000);
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Reservation failed. Please try again.";
            messageApi.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (pageLoading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><Spin size="large" /></div>;
    }

    return (
        <div style={{ padding: "50px", background: "#f0f2f5", minHeight: "100vh" }}>
            {contextHolder}
            <Card style={{ maxWidth: "600px", margin: "0 auto", borderRadius: "8px" }}>
                <Title level={2} style={{ textAlign: "center" }}>Confirm Your Appointment</Title>
                <Card type="inner" style={{ marginBottom: 24 }}>
                    <p><Text strong>Patient:</Text> {user.firstName} {user.lastName} ({user.email})</p>
                    <p><Text strong>Selected Treatment:</Text> {treatment}</p>
                    <p><Text strong>Selected Package:</Text> {packageTier}</p>
                </Card>

                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Select Doctor" name="doctor" rules={[{ required: true }]}>
                        <Select placeholder="Choose a specialist">
                            {doctors.map((doc) => (
                                <Option key={doc.id} value={doc.id}>
                                    {`${doc.first_name} ${doc.last_name} — ${doc.specialty}`}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Select Date" name="date" rules={[{ required: true }]}>
                        <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item label="Select Time" name="time" rules={[{ required: true }]}>
                        <TimePicker format="HH:mm" style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block size="large">
                            Book Now
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Reservation;