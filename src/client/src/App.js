import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

// --- Layout Components ---
import Header from "./components/Header";
import Footer from './components/Footer';

// --- Page Components ---
import Home from './components/Home';
import LoginPage from './components/Loginpage';
import Signup from './components/Signup';
import Blogs from './components/blogs';
import Profile from './components/profile';
import Reservation from './components/reservation';
import PackageSection from './components/packagesSection';
import TreatmentPage from './components/TreatmentPage';
import AboutUs from './components/AboutUs';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import AdminUsers from './components/AdminUsers';
import AdminDoctors from './components/AdminDoctors';
import AdminReservations from './components/AdminReservations';
import AddAdmin from './components/AddAdmin';

// --- Utility Component ---
import PrivateRoute from './components/privateRoute';
import  {LanguageProvider}  from "./context/languageContext"; // 👈 اضافه شده

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Header />}
      <main style={{ paddingBottom: isAdminRoute ? '0' : '80px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/doctors" element={<AdminDoctors />} />
          <Route path="/admin/reservations" element={<AdminReservations />} />
          <Route path="/admin/add-admin" element={<AddAdmin />} />
          <Route path="/treatments/:slug" element={<TreatmentPage />} />
          <Route
            path="/packages"
            element={
              <PrivateRoute>
                <PackageSection />
              </PrivateRoute>
            }
          />
          <Route
            path="/reservation"
            element={
              <PrivateRoute>
                <Reservation />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}

export default App;
