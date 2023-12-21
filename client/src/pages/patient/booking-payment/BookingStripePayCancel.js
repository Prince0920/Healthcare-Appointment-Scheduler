import React from 'react';
import Layouts from '../../../components/Layouts';
import { Link } from 'react-router-dom';

const BookingStripePayCancel = () => {
  return (
    <Layouts>
      <div className="content-wrapper">
        <section className="content-header_">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6">
                <h1>Appointment Payment</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Booking</a>
                  </li>
                  <li className="breadcrumb-item active">Payment</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <div className="vh-100 d-flex justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="border border-3 border-danger" />
            <div className="card  bg-white shadow p-5">
              <div className="mb-4 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={75}
                  height={75}
                  fill="currentColor"
                  className="text-danger"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
              </div>
              <div className="text-center">
                <h1>Payment Cancelled !</h1>
                <p>Your appointment not booked,please try again. </p>
                <Link to="/bookings" className="btn btn-outline-success">
                  Back Appointments
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default BookingStripePayCancel;
