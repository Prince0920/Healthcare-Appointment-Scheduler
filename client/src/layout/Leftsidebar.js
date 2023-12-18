import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';

const Leftsidebar = () => {
  const user = JSON.parse(localStorage.getItem('current_user'));

  const sidebarLinks = useMemo(() => {
    if (!user) {
      return null;
    }

    return (
      <ul
        className='nav nav-pills nav-sidebar flex-column'
        data-widget='treeview'
        role='menu'
        data-accordion='false'>
        <li className='nav-item'>
          <NavLink
            to='/'
            className='nav-link'>
            <i className='nav-icon fas fa-tachometer-alt' />
            <p>Dashboard</p>
          </NavLink>

          {user.usertype === 'patient' && (
            <>
              <NavLink
                to='/appointment-booking'
                className='nav-link'>
                <i className='nav-icon fas fa-calendar-check' />
                <p>Appointment Booking</p>
              </NavLink>

              <NavLink
                to='/bookings'
                className='nav-link'>
                <i className='nav-icon fas fa-calendar-alt' />
                <p>My Bookings</p>
              </NavLink>
            </>
          )}

          {user && user.usertype == 'admin' && (
            <>
              <NavLink
                to='/admin/all-users'
                className='nav-link'>
                <i className='far fa-circle nav-icon' />
                <p>All Users</p>
              </NavLink>

              <li className='nav-item menu-open'>
                <NavLink
                  to='#'
                  className='nav-link'>
                  <i class='nav-icon fas fa-columns'></i>
                  <p>
                    Specialists
                    <i className='right fas fa-angle-left' />
                  </p>
                </NavLink>
                <ul className='nav nav-treeview'>
                  <li className='nav-item menu-open'>
                    <NavLink
                      to='/admin/manage-speciality-area'
                      className='nav-link'>
                      <i className='far fa-circle nav-icon' />
                      <p>Speciality Area</p>
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink
                      to='/admin/manage-speciality'
                      className='nav-link'>
                      <i className='far fa-circle nav-icon' />
                      <p>Speciality</p>
                    </NavLink>
                  </li>
                </ul>
              </li>
            </>
          )}

          {user.usertype === 'doctor' && (
            <NavLink
              to='/doctor/appointments'
              className='nav-link'>
              <i className='nav-icon fas fa-calendar-check' />
              <p>Appointments</p>
            </NavLink>
          )}
        </li>
      </ul>
    );
  }, [user]);

  return (
    <div>
      <aside className='main-sidebar sidebar-dark-primary elevation-4'>
        <a
          href='index3.html'
          className='brand-link'>
          <img
            src='https://adminlte.io/themes/v3/dist/img/AdminLTELogo.png'
            alt='AdminLTE Logo'
            className='brand-image img-circle elevation-3'
            style={{ opacity: '.8' }}
          />
          <span className='brand-text font-weight-light'>HealthCare</span>
        </a>
        <div className='sidebar'>
          <nav className='mt-2'>{sidebarLinks}</nav>
        </div>
      </aside>
    </div>
  );
};

export default Leftsidebar;
