import React from 'react';
import InputText from '../../components/forms/InputText';

const PersonalDetails = ({ formData, errors, handleFormChange }) => {
  return (
    <>
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
