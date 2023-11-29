import logo from './logo.svg';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Leftsidebar from './layout/Leftsidebar';
import DashboardUser from './user/DashboardUser';
import Login from './pages/Login';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './assets/css/style.css';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import Spinner from './components/Spinner';
import { PatientProfile } from './pages/patient/PatientProfile';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import HospitalProfile from './pages/hospital/HospitalProfile';
import Doctor from './pages/doctor/Doctor';
import AppointmentBooking from './pages/patient/appointment/AppointmentBooking';
import AdminProfile from './pages/admin/AdminProfile';
import AllUsers from './pages/admin/AllUsers';
import DoctorAppointments from './pages/doctor/appointments/DoctorAppointments';
import MyBookings from './pages/patient/my-bookings/MyBookings';

function App() {
  // const { loading } = useSelector(state => state.alerts);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/hospital/profile"
            element={
              <ProtectedRoute>
                <HospitalProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/profile"
            element={
              <ProtectedRoute>
                <PatientProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/doctor/profile"
            element={
              <ProtectedRoute>
                <Doctor />
              </ProtectedRoute>
            }
          />

          <Route
            path="/appointment-booking"
            element={
              <ProtectedRoute>
                <AppointmentBooking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route
            path="/admin/profile"
            element={
              <ProtectedRoute>
                <AdminProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/all-users"
            element={
              <ProtectedRoute>
                <AllUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/appointments"
            element={
              <ProtectedRoute>
                <DoctorAppointments />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
    // <div className="wrapper">
    //   <Header />
    //   <Leftsidebar />
    //   <DashboardUser />
    //   <Footer />
    // </div>
  );
}

export default App;
