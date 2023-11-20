import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { Link, useNavigate } from 'react-router-dom';
import { SERVER_BASE_URL } from '../config/config.local';
const Header = () => {
  const [user, setUser] = useState(null);
  const getUserInfo = async () => {
    const res = await axios.post(
      SERVER_BASE_URL + '/api/v1/user/getUserData',
      { token: localStorage.getItem('token') },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    setUser(res.data.data);
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  console.log(user);

  const navigate = useNavigate();

  const [isDoctor, setIsDoctor] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPatient, setIsPatient] = useState(false);
  const [isClinic, setIsClinic] = useState(false);
  const [isHospital, setIsHospital] = useState(false);

  const loadIntial = () => {
    if (user && user.usertype == 'doctor') {
      setIsDoctor(true);
    }
    if (user && user.usertype == 'clinic') {
      setIsClinic(true);
    }
    if (user && user.usertype == 'hospital') {
      setIsHospital(true);
    }
    if (user && user.usertype == 'patient') {
      setIsPatient(true);
    }
  };

  useEffect(() => {
    if (!user) {
      loadIntial();
    }
  }, [user]);

  const handelLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  console.log('userrrrrrr', user);
  return (
    <div>
      <div className='preloader flex-column justify-content-center align-items-center'>
        <img
          className='animation__shake'
          src='https://adminlte.io/themes/v3/dist/img/AdminLTELogo.png'
          alt='AdminLTELogo'
          height={60}
          width={60}
        />
      </div>
      <nav className='main-header navbar navbar-expand navbar-white navbar-light'>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <a
              className='nav-link'
              data-widget='pushmenu'
              href='#'
              role='button'>
              <i className='fas fa-bars' />
            </a>
          </li>
          <li className='nav-item d-none d-sm-inline-block'>
            <Link
              to='/'
              className='nav-link'>
              Home
            </Link>
          </li>
          <li className='nav-item d-none d-sm-inline-block'>
            <Link
              to='/about-us'
              className='nav-link'>
              About
            </Link>
          </li>
          <li className='nav-item d-none d-sm-inline-block'>
            <Link
              to='/contact'
              className='nav-link'>
              Contact Us
            </Link>
          </li>
        </ul>
        <ul className='navbar-nav ml-auto'>
          {/* <li className="nav-item">
            <a
              className="nav-link"
              data-widget="navbar-search"
              href="#"
              role="button"
            >
              <i className="fas fa-search" />
            </a>
            <div className="navbar-search-block">
              <form className="form-inline">
                <div className="input-group input-group-sm">
                  <input
                    className="form-control form-control-navbar"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-navbar" type="submit">
                      <i className="fas fa-search" />
                    </button>
                    <button
                      className="btn btn-navbar"
                      type="button"
                      data-widget="navbar-search"
                    >
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li> */}

          <li className='nav-item dropdown user user-menu'>
            <a
              href='#'
              className='nav-link dropdown-toggle'
              data-toggle='dropdown'>
              <img
                src='https://adminlte.io/themes/v3/dist/img/user2-160x160.jpg'
                className='user-image img-circle elevation-2'
                alt='user image'
              />
              <span className='hidden-xs'>
                {user && user.usertype == 'doctor' ? 'Hello, Dr.' : ''}
                {user && user.usertype == 'patient' ? 'Hi, ' : ''}
                {user && user.usertype == 'clinic' ? 'Welcome, ' : ''}
                {user && user.usertype == 'hospital' ? 'Welcome, ' : ''}
                {user ? user.fullname : ''}
              </span>
            </a>
            <ul className='dropdown-menu dropdown-menu-lg dropdown-menu-right'>
              {/* User image */}
              <li className='user-header bg-primary'>
                <img
                  src='https://adminlte.io/themes/v3/dist/img/user2-160x160.jpg'
                  className='img-circle elevation-2'
                  alt='User Image'
                />
                <p>
                  <b> {user ? user.fullname : ''}</b> - Registered as {user ? user.usertype : ''}
                  <small>
                    Member since{' '}
                    {user ? <Moment format='Do MMM, YYYY, h:mm: a'>{user.date}</Moment> : ''}
                  </small>
                </p>
              </li>
              {/* Menu Body */}
              {/* <li className="user-body">
                <div className="row">
                  <div className="col-4 text-center">
                    <a href="#">Followers</a>
                  </div>
                  <div className="col-4 text-center">
                    <a href="#">Sales</a>
                  </div>
                  <div className="col-4 text-center">
                    <a href="#">Friends</a>
                  </div>
                </div>
              </li> */}
              {/* Menu Footer*/}
              <li className='user-footer d-flex'>
                <div className='pull-left'>
                  {user && user.usertype == 'patient' && (
                    <Link
                      to='/patient/profile'
                      className='btn btn-default btn-flat'>
                      Profile
                    </Link>
                  )}

                  {user && user.usertype == 'hospital' && (
                    <Link
                      to='/hospital/profile'
                      className='btn btn-default btn-flat'>
                      Profile
                    </Link>
                  )}

                  {user && user.usertype == 'doctor' && (
                    <Link
                      to='/doctor/profile'
                      className='btn btn-default btn-flat'>
                      Profile
                    </Link>
                  )}
                </div>
                <div
                  className='pull-right'
                  onClick={handelLogout}>
                  <Link
                    to=''
                    className='btn btn-default btn-flat'>
                    Sign out
                  </Link>
                </div>
              </li>
            </ul>
          </li>

          {/* <li className="nav-item dropdown">
            <a className="nav-link" data-toggle="dropdown" href="#">
              <i className="far fa-comments" />
              <span className="badge badge-danger navbar-badge">3</span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <a href="#" className="dropdown-item">
                <div className="media">
                  <img
                    src="dist/img/user1-128x128.jpg"
                    alt="User Avatar"
                    className="img-size-50 mr-3 img-circle"
                  />
                  <div className="media-body">
                    <h3 className="dropdown-item-title">
                      Brad Diesel
                      <span className="float-right text-sm text-danger">
                        <i className="fas fa-star" />
                      </span>
                    </h3>
                    <p className="text-sm">Call me whenever you can...</p>
                    <p className="text-sm text-muted">
                      <i className="far fa-clock mr-1" /> 4 Hours Ago
                    </p>
                  </div>
                </div>
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                <div className="media">
                  <img
                    src="dist/img/user8-128x128.jpg"
                    alt="User Avatar"
                    className="img-size-50 img-circle mr-3"
                  />
                  <div className="media-body">
                    <h3 className="dropdown-item-title">
                      John Pierce
                      <span className="float-right text-sm text-muted">
                        <i className="fas fa-star" />
                      </span>
                    </h3>
                    <p className="text-sm">I got your message bro</p>
                    <p className="text-sm text-muted">
                      <i className="far fa-clock mr-1" /> 4 Hours Ago
                    </p>
                  </div>
                </div>
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                <div className="media">
                  <img
                    src="dist/img/user3-128x128.jpg"
                    alt="User Avatar"
                    className="img-size-50 img-circle mr-3"
                  />
                  <div className="media-body">
                    <h3 className="dropdown-item-title">
                      Nora Silvester
                      <span className="float-right text-sm text-warning">
                        <i className="fas fa-star" />
                      </span>
                    </h3>
                    <p className="text-sm">The subject goes here</p>
                    <p className="text-sm text-muted">
                      <i className="far fa-clock mr-1" /> 4 Hours Ago
                    </p>
                  </div>
                </div>
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item dropdown-footer">
                See All Messages
              </a>
            </div>
          </li> */}
          {/* <li className="nav-item dropdown">
            <a className="nav-link" data-toggle="dropdown" href="#">
              <i className="far fa-bell" />
              <span className="badge badge-warning navbar-badge">15</span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <span className="dropdown-item dropdown-header">
                15 Notifications
              </span>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                <i className="fas fa-envelope mr-2" /> 4 new messages
                <span className="float-right text-muted text-sm">3 mins</span>
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                <i className="fas fa-users mr-2" /> 8 friend requests
                <span className="float-right text-muted text-sm">12 hours</span>
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                <i className="fas fa-file mr-2" /> 3 new reports
                <span className="float-right text-muted text-sm">2 days</span>
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item dropdown-footer">
                See All Notifications
              </a>
            </div>
          </li> */}
          <li className='nav-item'>
            <a
              className='nav-link'
              data-widget='fullscreen'
              href='#'
              role='button'>
              <i className='fas fa-expand-arrows-alt' />
            </a>
          </li>
          {/* <li className="nav-item">
            <a
              className="nav-link"
              data-widget="control-sidebar"
              data-controlsidebar-slide="true"
              href="#"
              role="button"
            >
              <i className="fas fa-th-large" />
            </a>
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
