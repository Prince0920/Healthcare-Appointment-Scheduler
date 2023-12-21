import React from 'react';
import SingleImageUpload from '../../components/forms/SingleImageUpload';
import { SERVER_BASE_URL } from '../../config/config.local';
import axios from 'axios';
import { toast } from 'react-toastify';

const BasicDetail = ({ doctorData, handleInputChange, basicDataErrors }) => {
  const handleUploadButtonClick = async data => {
    try {
      const formData = new FormData();
      formData.append('avatar', data);

      // Make the API call
      const response = await axios.post(
        SERVER_BASE_URL + '/api/v1/doctor/profile-pitcher',
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
    <div>
      <div className='form-group row text-center'>
        <div className='col-12'>
          <SingleImageUpload
            handleUploadButtonClick={handleUploadButtonClick}
            imageUrl={doctorData?.profileImage}
          />
        </div>
      </div>
      <div className='form-group row'>
        <div className='col-md-6'>
          <label>Fullname</label>
          <input
            type='text'
            name='fullName'
            value={doctorData.fullName}
            onChange={handleInputChange}
            placeholder='Enter Full Name'
            className='form-control'
          />
          {basicDataErrors.fullname && (
            <span className='error-text'>{basicDataErrors.fullname}</span>
          )}
        </div>
        <div className='col-md-6'>
          <label>Gender</label>
          <select
            name='gender'
            value={doctorData.gender}
            onChange={handleInputChange}
            className='form-control'>
            <option value=''>Select Gender</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
            <option value='Other'>Other</option>
          </select>
          {basicDataErrors.gender && <span className='error-text'>{basicDataErrors.gender}</span>}
        </div>
      </div>

      <div className='form-group row'>
        <div className='col-md-6'>
          <label>Date of Birth</label>
          <input
            type='date'
            name='dateOfBirth'
            value={doctorData.dateOfBirth}
            onChange={handleInputChange}
            placeholder='YYYY-MM-DD'
            className='form-control'
          />
          {basicDataErrors.dateOfBirth && (
            <span className='error-text'>{basicDataErrors.dateOfBirth}</span>
          )}
        </div>
        <div className='col-md-6'>
          <label>Phone</label>
          <input
            type='text'
            name='phone'
            value={doctorData.phone}
            onChange={handleInputChange}
            placeholder='Enter Phone Number'
            className='form-control'
          />
          {basicDataErrors.phone && <span className='error-text'>{basicDataErrors.phone}</span>}
        </div>
      </div>
    </div>
  );
};

export default BasicDetail;
