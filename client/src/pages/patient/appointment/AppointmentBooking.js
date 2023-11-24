import React, { useState, useEffect } from 'react';
import Layouts from '../../../components/Layouts';
import ContentHeader from '../../../components/ContentHeader';
import Filter from './Filter';
import FilterResult from './FilterResult';
import { SERVER_BASE_URL } from '../../../config/config.local';
import axios from 'axios';
import { toast } from 'react-toastify';

const AppointmentBooking = () => {
  const [doctorData, setDoctorData] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const [hospitalData, setHospitalData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [bookedAppointment, setBookedAppointment] = useState(null);
  const [isBookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Define constants
  const API_URL = SERVER_BASE_URL;

  // Assume you have a function to fetch available providers based on search criteria
  const fetchProviders = async _searchCriteria => {
    // For now, use dummy data. Replace this with an actual API call.
    console.log('_searchCriteria_searchCriteria', _searchCriteria);
    await axios.put(API_URL + '/api/v1/doctor/search', _searchCriteria, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  };

  const getAllProviders = async () => {
    setIsloading(true);
    try {
      const doctorData = await axios.get(API_URL + '/api/v1/doctor', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // const hospitalData = await axios.get(API_URL + '/api/v1/hospital', {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem('token')}`,
      //   },
      // });
      setIsloading(false);
      setDoctorData(doctorData.data.data);
      // setHospitalData(hospitalData.data.data);
    } catch (error) {
      setIsloading(false);
      toast.error('Something went wrong!!');
      console.log('error: ', error);
    }
  };

  useEffect(() => {
    getAllProviders();
  }, []);

  const handleBookAppointment = async (provider, selectedDate) => {
    try {

      if(!selectedDate){
        toast.error("Please select appointment date.")
        return;
      }
      // Simulate API call for booking (replace with actual API call)

      const dataToSend = {
        doctorProfileId: provider.doctorProfileId,
        date: selectedDate,
      };

      const response = await axios.post(API_URL + '/api/v1/doctor/book-appointment', dataToSend, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        // Booking successful
        setBookingSuccess(true);
        // Set the booked appointment details
        setBookedAppointment({
          provider: provider,
          date: selectedDate,
        });
        toast.success(response.data.message);
      } else {
        // Booking failed
        toast.info(response.data.message);
      }
    } catch (error) {
      // Handle booking error
      toast.error('Booking failed. Please try again.');
      console.error('Booking failed:', error.message);
    } finally {
      // Hide loading animation
      setBookingLoading(false);
    }
  };

  return (
    <Layouts>
      <div className='content-wrapper'>
        <ContentHeader
          heading='Book an Appointment'
          bredCumName='Book an Appointment'
        />
        <section className='content'>
          <div className='container-fluid'>
            <div className='row p-3 border rounded bg-light'>
              {/* <div className='col-md-3'>
                <Filter fetchProviders={fetchProviders} />
              </div> */}

              {/* Search Results section  */}
              <div className='col-md-12'>
                <h3 className='mb-3'>Results</h3>
                {isLoading ? (
                  <p>Loading results...</p>
                ) : (
                  <FilterResult
                    searchResults={searchResults}
                    doctorData={doctorData}
                    hospitalData={hospitalData}
                    handleBookAppointment={handleBookAppointment}
                  />
                )}
              </div>

              {/* Booking Success Modal  */}
              {bookingSuccess && (
                <div
                  className={`modal show fade`}
                  tabIndex='-1'
                  role='dialog'
                  style={{
                    display: 'block',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  }}>
                  <div
                    className='modal-dialog modal-dialog-centered'
                    role='document'>
                    <div className='modal-content'>
                      <div className='modal-header'>
                        <h5 className='modal-title'>Appointment Booked Successfully</h5>
                        <button
                          type='button'
                          className='close'
                          data-dismiss='modal'
                          aria-label='Close'
                          onClick={() => {
                            setBookingSuccess(false);
                            setBookedAppointment(null); // Clear booked appointment details
                          }}>
                          <span aria-hidden='true'>&times;</span>
                        </button>
                      </div>
                      <div className='modal-body'>
                        <p>Your appointment has been booked successfully.</p>
                        {bookedAppointment && (
                          <>
                            <p>
                              <strong>Name:</strong> {bookedAppointment.provider.fullName}
                            </p>
                            <p>
                              <strong>Specialization:</strong>{' '}
                              {bookedAppointment.provider.medicalSpecialty}
                            </p>
                            <p>
                              <strong>Date:</strong> {bookedAppointment.date}
                            </p>
                            {/* Add more details as needed  */}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* {/ End Booking Success Modal /}  */}
            </div>
          </div>
        </section>
      </div>
    </Layouts>
  );
};

export default AppointmentBooking;
