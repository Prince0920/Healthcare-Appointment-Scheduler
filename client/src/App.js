import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/css/style.css';
import ProtectedRoute from './components/ProtectedRoute';
import { SERVER_BASE_URL } from './config/config.local';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminProfile from './pages/admin/AdminProfile';
import AllUsers from './pages/admin/AllUsers';
import Speciality from './pages/admin/specialityViews/Speciality';
import SpecialityArea from './pages/admin/specialityViews/SpecialityArea';
import Chat from './pages/chat/Chat';
import Doctor from './pages/doctor/Doctor';
import DoctorAppointments from './pages/doctor/appointments/DoctorAppointments';
import MyReview from './pages/doctor/review/MyReview';
import HospitalProfile from './pages/hospital/HospitalProfile';
import { PatientProfile } from './pages/patient/PatientProfile';
import AppointmentBooking from './pages/patient/appointment/AppointmentBooking';
import BookingStripePayCancel from './pages/patient/booking-payment/BookingStripePayCancel';
import BookingStripePaySuccess from './pages/patient/booking-payment/BookingStripePaySuccess';
import MyBookings from './pages/patient/my-bookings/MyBookings';
import Review from './pages/patient/review/Review';


function App() {
  // const { loading } = useSelector(state => state.alerts);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute
                element={<Dashboard />}
                allowedRoles={['admin', 'patient', 'doctor', 'admin', 'hospital']}
              />
            }
          />
          <Route
            path='/chat'
            element={
              <ProtectedRoute
                element={<Chat />}
                allowedRoles={['admin', 'patient', 'doctor', 'admin', 'hospital']}
              />
            }
          />
          <Route
            path='/hospital/profile'
            element={
              <ProtectedRoute
                element={<HospitalProfile />}
                allowedRoles={['hospital']}
              />
            }
          />
          <Route
            path='/patient/profile'
            element={
              <ProtectedRoute
                element={<PatientProfile />}
                allowedRoles={['patient']}
              />
            }
          />
          <Route
            path='/patient/booking/payment-success'
            element={
              <ProtectedRoute
                element={<BookingStripePaySuccess />}
                allowedRoles={['patient']}
              />
            }
          />

          <Route
            path='/patient/booking/payment-cancel'
            element={
              <ProtectedRoute
                element={<BookingStripePayCancel />}
                allowedRoles={['patient']}
              />
            }
          />
          <Route
            path='/patient/review'
            element={
              <ProtectedRoute
                element={<Review />}
                allowedRoles={['patient']}
              />
            }
          />
          <Route
            path='/doctor/profile'
            element={
              <ProtectedRoute
                element={<Doctor />}
                allowedRoles={['doctor']}
              />
            }
          />
          <Route
            path='/appointment-booking'
            element={
              <ProtectedRoute
                element={<AppointmentBooking />}
                allowedRoles={['patient']}
              />
            }
          />
          <Route
            path='/bookings'
            element={
              <ProtectedRoute
                element={<MyBookings />}
                allowedRoles={['patient']}
              />
            }
          />
          <Route
            path='/login'
            element={<Login />}
          />
          <Route
            path='/register'
            element={<Register />}
          />
          <Route
            path='/about-us'
            element={<AboutUs />}
          />
          <Route
            path='/contact'
            element={<ContactUs />}
          />
          <Route
            path='/admin/profile'
            element={
              <ProtectedRoute
                element={<AdminProfile />}
                allowedRoles={['admin']}
              />
            }
          />
          <Route
            path='/admin/manage-speciality-area'
            element={
              <ProtectedRoute
                element={<SpecialityArea />}
                allowedRoles={['admin']}
              />
            }
          />

          <Route
            path='/admin/manage-speciality'
            element={
              <ProtectedRoute
                element={<Speciality />}
                allowedRoles={['admin']}
              />
            }
          />

          <Route
            path='/admin/all-users'
            element={
              <ProtectedRoute
                element={<AllUsers />}
                allowedRoles={['admin']}
              />
            }
          />
          <Route
            path='/doctor/appointments'
            element={
              <ProtectedRoute
                element={<DoctorAppointments />}
                allowedRoles={['doctor']}
              />
            }
          />

          <Route
            path='/doctor/review'
            element={
              <ProtectedRoute
                element={<MyReview />}
                allowedRoles={['doctor']}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
