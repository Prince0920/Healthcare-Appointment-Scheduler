import React, { useState } from 'react';

const FilterResult = ({
  doctorData,
  hospitalData,
  handleBookAppointment,
  selectedProvider,
  setSelectedProvider,
  handleViewBookAppointmentModel,
}) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleViewDetails = provider => {
    setSelectedProvider(provider);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
  };

  console.log('Doctor Data', doctorData);
  return (
    <>
      <div className='row'>
        {doctorData.length ? (
          doctorData.map((provider, index) => (
            <>
              <div
                key={index}
                className='col-md-4 mb-3'>
                <div
                  className='card cursor-pointer'
                  style={{
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    transition: 'box-shadow 0.3s',
                    display: 'flex', // Use flexbox
                    flexDirection: 'column', // Arrange child elements vertically
                    alignItems: 'center', // Center child elements horizontally
                  }}
                  onMouseOver={e =>
                    (e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)')
                  }
                  onMouseOut={e =>
                    (e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)')
                  }>
                  <img
                    src={provider.profileImage} // Add the property representing the image URL
                    alt={'Photo'} // Add alt text for accessibility
                    style={{
                      height: '200px',
                      width: '250px',
                    }}
                  />
                  <div className='card-body'>
                    {/* Eye icon in the top right corner  */}
                    <i
                      className='fas fa-eye'
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        cursor: 'pointer',
                      }}
                      onClick={e => {
                        e.stopPropagation(); // Prevent card click when clicking the icon
                        handleViewDetails(provider);
                      }}
                    />

                    <h5
                      className='card-title mb-2'
                      style={{ fontSize: '1.5rem' }}>
                      {provider.fullName}
                    </h5>
                    <p className='card-text'>
                      <strong>Specialization:</strong> {provider.medicalSpecialty}
                    </p>
                    <p className='card-text'>
                      <strong>Location:</strong>{' '}
                      {provider.address.landmark +
                        ', ' +
                        provider.address.street +
                        ', ' +
                        provider.address.city +
                        ', ' +
                        provider.address.state}
                    </p>
                    {/* Add View Button  */}
                    <div className='row mb-3'>
                      {/* <div className='col-6'>
                      <input
                        type='date'
                        onChange={handleDateChange}
                        className='form-control'
                      />
                    </div> */}
                      <div className='col-12'>
                        {/* Book Appointment Button  */}
                        <button
                          className='btn btn-success btn-block'
                          style={{ background: '#4CAF50', color: 'white' }}
                          onClick={() => {
                            setSelectedProvider(provider);
                            handleViewBookAppointmentModel();
                          }}>
                          Schedule Appointment
                        </button>
                      </div>
                    </div>
                    {/* Additional details or actions can be added here  */}
                  </div>
                </div>
              </div>
            </>
          ))
        ) : (
          <div>No data found..</div>
        )}
      </div>

      {/* Details Modal  */}
      <div
        className={`modal ${showDetailsModal ? 'show fade' : ''}`}
        tabIndex='-1'
        role='dialog'
        style={{
          display: showDetailsModal ? 'block' : 'none',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        <div
          className='modal-dialog modal-dialog-centered'
          role='document'>
          {selectedProvider && (
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>{selectedProvider?.fullName}'s Details</h5>
                <button
                  type='button'
                  className='close'
                  data-dismiss='modal'
                  aria-label='Close'
                  onClick={handleCloseDetailsModal}>
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                <p>
                  <strong>Name:</strong> {selectedProvider?.fullName}
                </p>
                <p>
                  <strong>Specialization:</strong> {selectedProvider?.medicalSpecialty}
                </p>
                <p>
                  <strong>Education:</strong> {selectedProvider?.education}
                </p>
                <p>
                  <strong>Experience:</strong> {selectedProvider?.experience}
                </p>
                <p>
                  <strong>Contact No:</strong> {selectedProvider?.phone}
                </p>
                <p>
                  <strong>Location:</strong>{' '}
                  {selectedProvider?.address?.landmark +
                    ', ' +
                    selectedProvider?.address?.street +
                    ', ' +
                    selectedProvider?.address?.city +
                    ', ' +
                    selectedProvider?.address?.state}
                </p>
                <p>
                  <strong>About:</strong> {selectedProvider?.about}
                </p>
                {/* Add more details as needed  */}
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'
                  onClick={handleCloseDetailsModal}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* End Details Modal  */}
    </>
  );
};

export default FilterResult;
