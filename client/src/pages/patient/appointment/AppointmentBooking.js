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
  const [searchCriteria, setSearchCriteria] = useState({
    medicalSpecialty: '',
  });
  const [medicalSpec, setMedicalSpecility] = useState([]);

  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showBookAppointmentModel, setShowBookAppointmentModel] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    patientName: '',
    age: '',
    gender: '',
    appointmentDate: '',
    reason: '',
  });

  const [hospitalData, setHospitalData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [bookedAppointment, setBookedAppointment] = useState(null);
  const [isBookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleViewBookAppointmentModel = provider => {
    setShowBookAppointmentModel(true);
  };

  const handleCloseBookAppointmentModel = () => {
    setShowBookAppointmentModel(false);
  };

  const handleAppointmentDataChange = (field, value) => {
    setAppointmentData({ ...appointmentData, [field]: value });
  };
  // Define constants
  const API_URL = SERVER_BASE_URL;

  // Assume you have a function to fetch available providers based on search criteria
  const fetchProviders = async _searchCriteria => {
    setIsloading(true);
    try {
      const res = await axios.put(API_URL + '/api/v1/doctor/search', _searchCriteria, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setIsloading(false);
      setDoctorData(res.data.data);
      // setHospitalData(hospitalData.data.data);
    } catch (error) {
      setIsloading(false);
      toast.error('Something went wrong!!');
      console.log('error: ', error);
    }
  };

  useEffect(() => {
    fetchProviders(searchCriteria);
  }, [searchCriteria]);

  const getAllMedicalSpec = async () => {
    const url = SERVER_BASE_URL + '/api/v1/medical-speciality';
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    setMedicalSpecility(res.data.data);
  };

  useEffect(() => {
    getAllMedicalSpec();
  }, []);

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

  const handleBookAppointment = async (provider, appointmentData) => {
    // console.log('appointmentDataappointmentDataappointmentData', appointmentData);
    // setShowBookAppointmentModel(false);
    try {
      const response = await axios.post(API_URL + '/api/v1/patient/add', appointmentData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    } catch (error) {
      toast.error('Booking failed. Please try again.');
      console.error('Booking failed:', error.message);
    } finally {
      // Hide loading animation
      setBookingLoading(false);
    }
  };

  const handleSearchChange = e => {
    const { name, value } = e.target;
    setSearchCriteria(prevSearchCriteria => ({
      ...prevSearchCriteria,
      [name]: value,
    }));
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
                <div className='d-flex justify-content-between align-items-center mb-3'>
                  <h3 className='mb-0'>Results</h3>
                  <div className='col-3'>
                    {/* <label>Medical Specialty</label> */}
                    <select
                      name='medicalSpecialty'
                      value={searchCriteria.medicalSpecialty}
                      onChange={handleSearchChange}
                      className='form-control'>
                      <option
                        value=''
                        disabled>
                        Select Medical Specialty
                      </option>
                      {medicalSpec.map(spec => (
                        <option
                          key={spec._id}
                          value={spec.name}>
                          {spec.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {isLoading ? (
                  <p>Loading results...</p>
                ) : (
                  <FilterResult
                    searchResults={searchResults}
                    doctorData={doctorData}
                    hospitalData={hospitalData}
                    handleBookAppointment={handleBookAppointment}
                    selectedProvider={selectedProvider}
                    setSelectedProvider={setSelectedProvider}
                    handleViewBookAppointmentModel={handleViewBookAppointmentModel}
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

            {/* Book Appointment Modal  */}
            <div
              className={`modal ${showBookAppointmentModel ? 'show fade' : ''}`}
              tabIndex='-1'
              role='dialog'
              style={{
                display: showBookAppointmentModel ? 'block' : 'none',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}>
              <div
                className='modal-dialog modal-dialog-centered'
                role='document'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h5 className='modal-title'>Appointment with {selectedProvider?.fullName}</h5>
                    <button
                      type='button'
                      className='close'
                      data-dismiss='modal'
                      aria-label='Close'
                      onClick={handleCloseBookAppointmentModel}>
                      <span aria-hidden='true'>&times;</span>
                    </button>
                  </div>
                  <div className='modal-body'>
                    {/* Patient name input box */}
                    <div className='form-group'>
                      <label htmlFor='patientName'>Patient Name</label>
                      <input
                        type='text'
                        id='patientName'
                        className='form-control'
                        placeholder='Enter Patient Name'
                        value={appointmentData.patientName}
                        onChange={e => handleAppointmentDataChange('patientName', e.target.value)}
                      />
                    </div>

                    {/* Age input box */}
                    <div className='form-group'>
                      <label htmlFor='age'>Age</label>
                      <input
                        type='number'
                        id='age'
                        className='form-control'
                        placeholder='Enter Age'
                        value={appointmentData.age}
                        onChange={e => handleAppointmentDataChange('age', e.target.value)}
                      />
                    </div>

                    {/* Gender input box */}
                    <div className='form-group'>
                      <label htmlFor='gender'>Gender</label>
                      <select
                        id='gender'
                        className='form-control'
                        value={appointmentData.gender}
                        onChange={e => handleAppointmentDataChange('gender', e.target.value)}>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                        {/* Add more gender options if needed */}
                      </select>
                    </div>

                    {/* Appointment Date input box */}
                    <div className='form-group'>
                      <label htmlFor='appointmentDate'>Appointment Date</label>
                      <input
                        type='date'
                        id='appointmentDate'
                        className='form-control'
                        value={appointmentData.appointmentDate}
                        onChange={e =>
                          handleAppointmentDataChange('appointmentDate', e.target.value)
                        }
                      />
                    </div>

                    {/* Reason input box */}
                    <div className='form-group'>
                      <label htmlFor='reason'>Reason</label>
                      <textarea
                        id='reason'
                        className='form-control'
                        value={appointmentData.reason}
                        onChange={e => handleAppointmentDataChange('reason', e.target.value)}
                        rows={4} // Set the number of visible rows as needed
                      />
                    </div>

                    {/* Add more details as needed  */}
                  </div>
                  <div className='modal-footer'>
                    <button
                      type='button'
                      className='btn btn-secondary'
                      data-dismiss='modal'
                      onClick={handleCloseBookAppointmentModel}>
                      Close
                    </button>
                    <button
                      className='btn btn-success'
                      style={{ background: '#4CAF50', color: 'white' }}
                      onClick={() => {
                        handleBookAppointment(selectedProvider, appointmentData);
                        
                      }}>
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Book Appointment Modal  */}
          </div>
        </section>
      </div>
    </Layouts>
  );
};

export default AppointmentBooking;