import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// --- Layout Components ---
import Header from "./components/Header";
import Footer from './components/Footer';

// --- Page Components ---
import Home from './components/Home';
import LoginPage from './components/Loginpage'; // Renamed for consistency
import Signup from './components/Signup';
import Blogs from './components/blogs';
import Profile from './components/profile';
import Reservation from './components/reservation';
import PackageSection from './components/packagesSection';
import TreatmentPage from './components/TreatmentPage'; // The new reusable treatment page

// --- Utility Component ---
import PrivateRoute from './components/privateRoute';

function App() {
  return (
    <Router>
      <Header />
      <main style={{ paddingBottom: '80px'  }}> {/* Adds padding to prevent content from hiding under header/footer */}
        <Routes>
          {/* --- Public Routes --- */}
          {/* These pages can be viewed by anyone */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blogs" element={<Blogs />} />

          {/* --- Dynamic Treatment Detail Route --- */}
          {/* This single route handles all treatment pages like /treatments/cardiology, /treatments/dental-care, etc. */}
          <Route path="/treatments/:slug" element={<TreatmentPage />} />

          {/* --- Private Routes --- */}
          {/* These pages require the user to be logged in */}
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
      <Footer />
    </Router>
  );
}

export default App;