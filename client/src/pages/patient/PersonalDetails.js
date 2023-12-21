import React from 'react';
import InputText from '../../components/forms/InputText';
import SingleImageUpload from '../../components/forms/SingleImageUpload';
import { toast } from 'react-toastify';
import axios from 'axios';
import { SERVER_BASE_URL } from '../../config/config.local';

const PersonalDetails = ({ formData, errors, handleFormChange }) => {
  const handleUploadButtonClick = async data => {
    try {
      const formData = new FormData();
      formData.append('avatar', data);

      // Make the API call
      const response = await axios.post(
        SERVER_BASE_URL + '/api/v1/patient/profile-pitcher',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        toast.success('Profile Image saved success!!');
      } else {
        toast.success('Please try again..');
      }
      // Handle the API response as needed
    } catch (error) {
      console.error('API Error:', error);
      // Handle API error
    }
  };

  return (
    <>
      <div className='form-group row text-center'>
        <div className='col-12'>
          <SingleImageUpload
            handleUploadButtonClick={handleUploadButtonClick}
            imageUrl={formData?.profileImage}
          />
        </div>
      </div>
      <div className='form-group'>
        <div className='row'>
          <div className='col'>
            <InputText
              label='Full Name'
              value={formData.fullName}
              handleInputChange={handleFormChange}
              name={'fullName'}
            />
            {errors.fullName && <span className='error-text'>{errors.fullName}</span>}
          </div>
          <div className='col'>
            <InputText
              label='Contact Number'
              value={formData.contactNumber}
              handleInputChange={handleFormChange}
              name={'contactNumber'}
            />
            {errors.contactNumber && <span className='error-text'>{errors.contactNumber}</span>}
          </div>
        </div>
      </div>
      <div className='form-group'>
        <div className='row'>
          <div className='col'>
            <label htmlFor='dateOfBirth'>Date of Birth</label>
            <input
              type='date'
              className='form-control'
              id='dateOfBirth'
              name='dateOfBirth'
              value={formData.dateOfBirth}
              onChange={handleFormChange}
              placeholder='Date of Birth'
            />
            {errors.dateOfBirth && <span className='error-text'>{errors.dateOfBirth}</span>}
          </div>
          <div className='col'>
            <label htmlFor='gender'>Gender</label>
            <select
              className='form-control'
              id='gender'
              name='gender'
              value={formData.gender}
              onChange={handleFormChange}
              placeholder='Gender'>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              <option value='Other'>Other</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalDetails;
