import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Card, Table, Badge, Modal, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../context/languageContext";

const Profile = () => {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const storedUser = localStorage.getItem("user");
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [reservationToCancel, setReservationToCancel] = useState(null);
  const [cancelling, setCancelling] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const t = {
    en: {
      pleaseLogin: "Please log in first",
      logIn: "Log In",
      signUp: "Sign Up",
      userProfile: "User Profile",
      logout: "Logout",
      yourReservations: "Your Reservations",
      loading: "Loading...",
      noReservations: "No reservations found.",
      doctor: "Doctor",
      treatment: "Treatment",
      package: "Package",
      date: "Date",
      time: "Time",
      status: "Status",
      actions: "Actions",
      scheduled: "Scheduled",
      cancel: "Cancel",
      cancelReservation: "Cancel Reservation",
      confirmCancel: "Are you sure you want to cancel this reservation?",
      doctorLabel: "Doctor:",
      treatmentLabel: "Treatment:",
      dateLabel: "Date:",
      timeLabel: "Time:",
      cannotUndo: "This action cannot be undone.",
      close: "Close",
      cancelling: "Cancelling...",
      cancelReservationBtn: "Cancel Reservation",
      reservationCancelled: "Reservation cancelled successfully.",
      failedCancel: "Failed to cancel reservation.",
      serverError: "Server error. Please try again.",
    },
    fa: {
      pleaseLogin: "لطفا ابتدا وارد شوید",
      logIn: "ورود",
      signUp: "ثبت نام",
      userProfile: "پروفایل کاربر",
      logout: "خروج",
      yourReservations: "رزروهای شما",
      loading: "در حال بارگذاری...",
      noReservations: "هیچ رزروی یافت نشد.",
      doctor: "دکتر",
      treatment: "درمان",
      package: "بسته",
      date: "تاریخ",
      time: "زمان",
      status: "وضعیت",
      actions: "اقدامات",
      scheduled: "برنامه ریزی شده",
      cancel: "لغو",
      cancelReservation: "لغو رزرو",
      confirmCancel: "آیا مطمئن هستید که می‌خواهید این رزرو را لغو کنید؟",
      doctorLabel: "دکتر:",
      treatmentLabel: "درمان:",
      dateLabel: "تاریخ:",
      timeLabel: "زمان:",
      cannotUndo: "این عمل قابل بازگشت نیست.",
      close: "بستن",
      cancelling: "در حال لغو...",
      cancelReservationBtn: "لغو رزرو",
      reservationCancelled: "رزرو با موفقیت لغو شد.",
      failedCancel: "لغو رزرو ناموفق بود.",
      serverError: "خطای سرور. لطفا دوباره امتحان کنید.",
    },
  }[language];

  let user = null;
  try {
    if (storedUser && storedUser !== "undefined") {
      user = JSON.parse(storedUser);
    }
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
  }

  useEffect(() => {
    if (user && user.id) {
      fetchUserReservations();
    }
  }, [user]);

  const fetchUserReservations = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/api/reservation/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setReservations(data);
      }
    } catch (error) {
      console.error("Error fetching reservations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const handleCancelReservation = async () => {
    if (!reservationToCancel) return;
    setCancelling(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/api/reservation/${reservationToCancel.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId: user.id }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(t.reservationCancelled);
        setMessageType("success");
        setReservations(reservations.filter(r => r.id !== reservationToCancel.id));
        setShowCancelModal(false);
        setReservationToCancel(null);
      } else {
        setMessage(data.message || t.failedCancel);
        setMessageType("danger");
      }
    } catch (error) {
      console.error("Error cancelling reservation:", error);
      setMessage(t.serverError);
      setMessageType("danger");
    } finally {
      setCancelling(false);
    }
  };

  if (!user) {
    return (
      <Container className="mt-5 text-center">
        <h2>{t.pleaseLogin}</h2>
        <Button href="/login" variant="primary" className="me-2">{t.logIn}</Button>
        <Button href="/signup" variant="secondary">{t.signUp}</Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4 fw-bold text-success">{t.userProfile}</h2>

      <Card className="text-center shadow-lg border-0 rounded-4 mx-auto p-3 mb-4" style={{ maxWidth: "400px" }}>
        <Card.Body>
          <Card.Title className="fw-bold text-dark">
            {user.firstName} {user.lastName}
          </Card.Title>
          <Card.Text className="text-muted">
            {user.email}
          </Card.Text>
          <Button variant="danger" className="mt-3" onClick={handleLogout}>
            {t.logout}
          </Button>
        </Card.Body>
      </Card>

      <h3 className="text-center mb-4 text-primary">{t.yourReservations}</h3>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">{t.loading}</span>
          </div>
        </div>
      ) : reservations.length === 0 ? (
        <Card className="text-center shadow-sm">
          <Card.Body>
            <Card.Text className="text-muted">{t.noReservations}</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover className="shadow">
            <thead className="table-primary">
              <tr>
                <th>{t.doctor}</th>
                <th>{t.treatment}</th>
                <th>{t.package}</th>
                <th>{t.date}</th>
                <th>{t.time}</th>
                <th>{t.status}</th>
                <th>{t.actions}</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td>
                    Dr. {reservation.doctor_first_name} {reservation.doctor_last_name}
                  </td>
                  <td>{reservation.treatment}</td>
                  <td>
                    <Badge bg="info">{reservation.package_tier}</Badge>
                  </td>
                  <td>{formatDate(reservation.date)}</td>
                  <td>{formatTime(reservation.time)}</td>
                  <td>
                    <Badge bg="success">{t.scheduled}</Badge>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        setReservationToCancel(reservation);
                        setShowCancelModal(true);
                      }}
                    >
                      {t.cancel}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t.cancelReservation}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {reservationToCancel && (
            <div>
              <p>{t.confirmCancel}</p>
              <div className="border p-3 rounded">
                <p><strong>{t.doctorLabel}</strong> Dr. {reservationToCancel.doctor_first_name} {reservationToCancel.doctor_last_name}</p>
                <p><strong>{t.treatmentLabel}</strong> {reservationToCancel.treatment}</p>
                <p><strong>{t.dateLabel}</strong> {formatDate(reservationToCancel.date)}</p>
                <p><strong>{t.timeLabel}</strong> {formatTime(reservationToCancel.time)}</p>
              </div>
              <p className="text-danger mt-3">{t.cannotUndo}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            {t.close}
          </Button>
          <Button
            variant="danger"
            onClick={handleCancelReservation}
            disabled={cancelling}
          >
            {cancelling ? t.cancelling : t.cancelReservationBtn}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Alert Message */}
      {message && (
        <Alert
          variant={messageType}
          className="mt-3"
          dismissible
          onClose={() => setMessage("")}
        >
          {message}
        </Alert>
      )}
    </Container>
  );
};

export default Profile;
