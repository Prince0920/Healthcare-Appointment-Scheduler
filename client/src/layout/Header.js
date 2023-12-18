import React from 'react';
import Moment from 'react-moment';
import { Link, useNavigate } from 'react-router-dom';
const Header = () => {
  const user = JSON.parse(localStorage.getItem('current_user'));

  const navigate = useNavigate();

  const handelLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

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

                  {user && user.usertype == 'admin' && (
                    <Link
                      to='/admin/profile'
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
          <li className='nav-item'>
            <a
              className='nav-link'
              data-widget='fullscreen'
              href='#'
              role='button'>
              <i className='fas fa-expand-arrows-alt' />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
