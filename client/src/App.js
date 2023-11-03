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

function App() {
  const { loading } = useSelector(state => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path='/'
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path='/patient/profile'
              element={
                <ProtectedRoute>
                  <PatientProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path='/login'
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path='/register'
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path='/about-us'
              element={
                  <AboutUs />
              }
            />
            <Route
              path='/contact'
              element={
                  <ContactUs />
              }
            />
          </Routes>
        )}
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
