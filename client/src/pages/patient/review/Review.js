import React, { useState } from 'react';
import Layouts from '../../../components/Layouts';
import ContentHeader from '../../../components/ContentHeader';
import { Card, Button, Modal, Rate } from 'antd';

const { Meta } = Card;

const DoctorList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [rating, setRating] = useState(0); // Initial rating
  const [feedback, setFeedback] = useState('');

  const doctors = [
    // Replace this with your actual list of doctors
    { id: 1, name: 'Dr. Smith' },
    { id: 2, name: 'Dr. Johnson' },
    { id: 3, name: 'Dr. Johnson' },
    { id: 4, name: 'Dr. Johnson' },
    { id: 5, name: 'Dr. Johnson' },
    // ... other doctors
  ];
  // Example doctor data
  const doctorData = [
    // Replace this with your actual list of doctors
    {
      id: 1,
      fullName: 'Dr. Smith',
      medicalSpecialty: 'Cardiology',
      profileImage:
        'https://res.cloudinary.com/du1dzesrs/image/upload/v1702544500/avatars/dubwrdnjfu5hwfsxpmke.jpg', // Replace with the actual image URL
      /* ... other properties */
    },
    {
      id: 2,
      fullName: 'Dr. Johnson',
      medicalSpecialty: 'Pediatrics',
      profileImage:
        'https://res.cloudinary.com/du1dzesrs/image/upload/v1702544500/avatars/dubwrdnjfu5hwfsxpmke.jpg', // Replace with the actual image URL
      /* ... other properties */
    },
    {
      id: 3,
      fullName: 'Dr. Williams',
      medicalSpecialty: 'Orthopedics',
      profileImage:
        'https://res.cloudinary.com/du1dzesrs/image/upload/v1702544500/avatars/dubwrdnjfu5hwfsxpmke.jpg', // Replace with the actual image URL
      /* ... other properties */
    },
    {
      id: 4,
      fullName: 'Dr. Davis',
      medicalSpecialty: 'Dermatology',
      profileImage:
        'https://res.cloudinary.com/du1dzesrs/image/upload/v1702544500/avatars/dubwrdnjfu5hwfsxpmke.jpg', // Replace with the actual image URL
      /* ... other properties */
    },
    {
      id: 5,
      fullName: 'Dr. Brown',
      medicalSpecialty: 'Neurology',
      profileImage:
        'https://res.cloudinary.com/du1dzesrs/image/upload/v1702544500/avatars/dubwrdnjfu5hwfsxpmke.jpg', // Replace with the actual image URL
      /* ... other properties */
    },
    // ... other doctors
  ];

  const showModal = doctor => {
    setSelectedDoctor(doctor);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Handle submission logic (e.g., send data to the server)
    console.log('Doctor:', selectedDoctor);
    console.log('Rating:', rating);
    console.log('Feedback:', feedback);
    // Add logic to send data to the server
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleRatingChange = value => {
    setRating(value);
  };

  const handleFeedbackChange = e => {
    setFeedback(e.target.value);
  };

  return (
    <Layouts>
      <div className='content-wrapper'>
        <ContentHeader
          heading='Doctor List'
          bredCumName='Doctor List'
        />
        <section className='content'>
          <div className='container-fluid'>
            <div className='row'>
              {doctorData.length ? (
                doctorData.map((provider, index) => (
                  <>
                    <div
                      key={index}
                      className='col-md-3 mb-3'>
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
                          <h5
                            className='card-title mb-2'
                            style={{ fontSize: '1.5rem' }}>
                            {provider.fullName}
                          </h5>
                          <p className='card-text'>
                            <strong>Specialization:</strong> {provider.medicalSpecialty}
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
                                  showModal(provider);
                                }}>
                                Leave a Review
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
          </div>
        </section>
      </div>

      {/* Review Modal */}
      <Modal
        title={`Leave a Review for ${selectedDoctor ? selectedDoctor.fullName : ''}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ marginBottom: '16px', textAlign: 'center' }}>
            <label style={{ fontSize: '18px', fontWeight: 'bold' }}>Rating:</label>
            <Rate
              allowHalf
              defaultValue={0}
              onChange={handleRatingChange}
            />
          </div>

          <div style={{ marginBottom: '16px', width: '100%' }}>
            <label style={{ fontSize: '18px', fontWeight: 'bold' }}>Feedback:</label>
            <textarea
              style={{ width: '100%', padding: '8px', borderRadius: '4px', marginTop: '8px' }}
              rows='3'
              value={feedback}
              onChange={handleFeedbackChange}
            />
          </div>
        </div>
      </Modal>
    </Layouts>
  );
};

export default DoctorList;
