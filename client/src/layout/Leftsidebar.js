import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

export default class Sidebar extends Component {
  render() {
    return (
      <div>
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          <a href="index3.html" className="brand-link">
            <img
              src="https://adminlte.io/themes/v3/dist/img/AdminLTELogo.png"
              alt="AdminLTE Logo"
              className="brand-image img-circle elevation-3"
              style={{ opacity: '.8' }}
            />
            <span className="brand-text font-weight-light">HealthCare</span>
          </a>
          <div className="sidebar">
            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className="nav-item">
                  <NavLink to="/" className="nav-link">
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>Dashboard</p>
                  </NavLink>

                  <NavLink to="/appointment-booking" className="nav-link">
                    <i className="nav-icon fas fa-calendar-check" />
                    <p>Appointment Booking</p>
                  </NavLink>

                  <NavLink to="/admin/all-users" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>All Users</p>
                  </NavLink>

                  <NavLink to="/doctor/appointments" className="nav-link">
                    <i className="nav-icon fas fa-calendar-check" />
                    <p>Appointments</p>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    );
  }
}
