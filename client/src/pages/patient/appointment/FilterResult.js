import React, { useState } from 'react';

const FilterResult = ({ searchResults, handleBookAppointment }) => {
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = e => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);
  };

  const handleViewDetails = provider => {
    setSelectedProvider(provider);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
  };

  return (
    <>
      <div className='row'>
        {searchResults.map(provider => (
          <div
            key={provider.id}
            className='col-md-4 mb-3'>
            <div
              className='card cursor-pointer'
              style={{
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                transition: 'box-shadow 0.3s',
              }}
              onMouseOver={e => (e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)')}
              onMouseOut={e => (e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)')}>
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
                  {provider.name}
                </h5>
                <p className='card-text'>
                  <strong>Specialization:</strong> {provider.specialization}
                </p>
                <p className='card-text'>
                  <strong>Location:</strong> {provider.location}
                </p>
                {/* Add View Button  */}
                <div className='row mb-3'>
                  <div className='col-6'>
                    <input
                      type='date'
                      onChange={handleDateChange}
                      className='form-control'
                    />
                  </div>
                  <div className='col-6'>
                    {/* Book Appointment Button  */}
                    <button
                      className='btn btn-success btn-block'
                      style={{ background: '#4CAF50', color: 'white' }}
                      onClick={() => {
                        handleBookAppointment(provider, selectedDate);
                      }}>
                      Book Now
                    </button>
                  </div>
                </div>
                {/* Additional details or actions can be added here  */}
              </div>
            </div>
          </div>
        ))}
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
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>{selectedProvider?.name}'s Details</h5>
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
                <strong>Name:</strong> {selectedProvider?.name}
              </p>
              <p>
                <strong>Specialization:</strong> {selectedProvider?.specialization}
              </p>
              <p>
                <strong>Location:</strong> {selectedProvider?.location}
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
        </div>
      </div>
      {/* End Details Modal  */}
    </>
  );
};

export default FilterResult;
